import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/core/lib/db/sqlite';
import { getSessionUser } from '@/core/lib/db/auth-helper';

// GET /api/pets - Lista todos os pets do usuário logado
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const pets = db
      .prepare('SELECT * FROM pets WHERE user_id = ? ORDER BY nome ASC')
      .all(user.id);

    return NextResponse.json(pets);
  } catch (error) {
    console.error('Erro ao buscar pets:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar lista de pets.' },
      { status: 500 }
    );
  }
}

// POST /api/pets - Cadastra um novo pet para o usuário logado
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const body = await req.json();
    const { nome, raca, data_nascimento, peso, foto_url, rg_sinpatinhas } = body;

    if (!nome) {
      return NextResponse.json(
        { error: 'O nome do pet é obrigatório.' },
        { status: 400 }
      );
    }

    const petId = crypto.randomUUID();

    db.prepare(`
      INSERT INTO pets (id, user_id, nome, raca, data_nascimento, peso, foto_url, rg_sinpatinhas)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      petId,
      user.id,
      nome,
      raca || null,
      data_nascimento || null,
      peso !== undefined && peso !== '' ? Number(peso) : null,
      foto_url || null,
      rg_sinpatinhas || null
    );

    const newPet = db.prepare('SELECT * FROM pets WHERE id = ?').get(petId);

    return NextResponse.json(newPet);
  } catch (error) {
    console.error('Erro ao cadastrar pet:', error);
    return NextResponse.json(
      { error: 'Erro ao cadastrar pet.' },
      { status: 500 }
    );
  }
}
