import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/core/lib/db/sqlite';
import { getSessionUser } from '@/core/lib/db/auth-helper';

// GET /api/registros - Listar históricos de vacinação
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const petId = searchParams.get('pet_id');

    let rows;
    if (petId) {
      rows = db.prepare(`
        SELECT 
          r.*,
          p.nome AS pet_nome,
          v.nome AS vacina_nome,
          v.intervalo_dias AS vacina_intervalo_dias
        FROM registros r
        JOIN pets p ON r.pet_id = p.id
        JOIN vacinas v ON r.vacina_id = v.id
        WHERE p.user_id = ? AND r.pet_id = ?
        ORDER BY r.data_aplicacao DESC
      `).all(user.id, petId);
    } else {
      rows = db.prepare(`
        SELECT 
          r.*,
          p.nome AS pet_nome,
          v.nome AS vacina_nome,
          v.intervalo_dias AS vacina_intervalo_dias
        FROM registros r
        JOIN pets p ON r.pet_id = p.id
        JOIN vacinas v ON r.vacina_id = v.id
        WHERE p.user_id = ?
        ORDER BY r.data_aplicacao DESC
      `).all(user.id);
    }

    // Mapeia para a estrutura aninhada esperada pelo frontend
    const mapped = rows.map((row: any) => ({
      id: row.id,
      pet_id: row.pet_id,
      vacina_id: row.vacina_id,
      data_aplicacao: row.data_aplicacao,
      proxima_dose: row.proxima_dose,
      observacoes: row.observacoes,
      created_at: row.created_at,
      pets: {
        id: row.pet_id,
        nome: row.pet_nome,
      },
      vacinas: {
        id: row.vacina_id,
        nome: row.vacina_nome,
        intervalo_dias: row.vacina_intervalo_dias,
      },
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error('Erro ao buscar registros vacinais:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar registros vacinais.' },
      { status: 500 }
    );
  }
}

// POST /api/registros - Criar registro vacinal com cálculo automático da próxima dose
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const body = await req.json();
    const { pet_id, vacina_id, data_aplicacao, observacoes } = body;

    if (!pet_id || !vacina_id || !data_aplicacao) {
      return NextResponse.json(
        { error: 'Pet, vacina e data de aplicação são obrigatórios.' },
        { status: 400 }
      );
    }

    // Verifica se o pet pertence ao usuário logado
    const pet = db
      .prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
      .get(pet_id, user.id);

    if (!pet) {
      return NextResponse.json(
        { error: 'Pet não encontrado ou não pertence a este usuário.' },
        { status: 404 }
      );
    }

    // Busca intervalo da vacina para calcular próxima dose
    const vacina = db
      .prepare('SELECT intervalo_dias FROM vacinas WHERE id = ?')
      .get(vacina_id) as { intervalo_dias: number } | undefined;

    if (!vacina) {
      return NextResponse.json(
        { error: 'Vacina não encontrada.' },
        { status: 404 }
      );
    }

    // Calcula próxima dose se aplicável
    let proxima_dose = null;
    if (vacina.intervalo_dias) {
      const [year, month, day] = data_aplicacao.split('-').map(Number);
      const dateObj = new Date(year, month - 1, day);
      dateObj.setDate(dateObj.getDate() + vacina.intervalo_dias);
      
      const nextYear = dateObj.getFullYear();
      const nextMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
      const nextDay = String(dateObj.getDate()).padStart(2, '0');
      proxima_dose = `${nextYear}-${nextMonth}-${nextDay}`;
    }

    const registroId = crypto.randomUUID();

    db.prepare(`
      INSERT INTO registros (id, pet_id, vacina_id, data_aplicacao, proxima_dose, observacoes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      registroId,
      pet_id,
      vacina_id,
      data_aplicacao,
      proxima_dose,
      observacoes || null
    );

    const newRegistro = db.prepare('SELECT * FROM registros WHERE id = ?').get(registroId);

    return NextResponse.json(newRegistro);
  } catch (error) {
    console.error('Erro ao registrar vacina:', error);
    return NextResponse.json(
      { error: 'Erro ao registrar vacina.' },
      { status: 500 }
    );
  }
}
