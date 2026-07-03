import { NextResponse } from 'next/server';
import db from '@/core/lib/db/sqlite';
import { getSessionUser } from '@/core/lib/db/auth-helper';

// GET /api/vacinas - Catálogo de vacinas
export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const vacinas = db
      .prepare('SELECT * FROM vacinas ORDER BY nome ASC')
      .all();

    return NextResponse.json(vacinas);
  } catch (error) {
    console.error('Erro ao buscar vacinas:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar catálogo de vacinas.' },
      { status: 500 }
    );
  }
}
