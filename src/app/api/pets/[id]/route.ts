import { NextRequest, NextResponse } from 'next/server';
import db from '@/core/lib/db/sqlite';
import { getSessionUser } from '@/core/lib/db/auth-helper';

interface RouteContext {
  params: Promise<{ id: string }>;
}

// GET /api/pets/[id] - Detalhes do pet específico
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const { id } = await params;

    // Busca o pet garantindo que pertence ao usuário
    const pet = db
      .prepare('SELECT * FROM pets WHERE id = ? AND user_id = ?')
      .get(id, user.id);

    if (!pet) {
      return NextResponse.json({ error: 'Pet não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(pet);
  } catch (error) {
    console.error('Erro ao buscar pet:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar detalhes do pet.' },
      { status: 500 }
    );
  }
}

// PUT /api/pets/[id] - Atualiza dados do pet
export async function PUT(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { nome, raca, data_nascimento, peso, foto_url, rg_sinpatinhas } = body;

    // Verifica propriedade do pet
    const existingPet = db
      .prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
      .get(id, user.id);

    if (!existingPet) {
      return NextResponse.json({ error: 'Pet não encontrado.' }, { status: 404 });
    }

    if (!nome) {
      return NextResponse.json(
        { error: 'O nome do pet é obrigatório.' },
        { status: 400 }
      );
    }

    db.prepare(`
      UPDATE pets
      SET nome = ?, raca = ?, data_nascimento = ?, peso = ?, foto_url = ?, rg_sinpatinhas = ?
      WHERE id = ? AND user_id = ?
    `).run(
      nome,
      raca || null,
      data_nascimento || null,
      peso !== undefined && peso !== '' ? Number(peso) : null,
      foto_url || null,
      rg_sinpatinhas || null,
      id,
      user.id
    );

    const updatedPet = db.prepare('SELECT * FROM pets WHERE id = ?').get(id);

    return NextResponse.json(updatedPet);
  } catch (error) {
    console.error('Erro ao atualizar pet:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar dados do pet.' },
      { status: 500 }
    );
  }
}

// DELETE /api/pets/[id] - Exclui o pet
export async function DELETE(req: NextRequest, { params }: RouteContext) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const { id } = await params;

    // Verifica propriedade do pet
    const existingPet = db
      .prepare('SELECT id FROM pets WHERE id = ? AND user_id = ?')
      .get(id, user.id);

    if (!existingPet) {
      return NextResponse.json({ error: 'Pet não encontrado.' }, { status: 404 });
    }

    db.prepare('DELETE FROM pets WHERE id = ? AND user_id = ?').run(id, user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar pet:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir o pet.' },
      { status: 500 }
    );
  }
}
