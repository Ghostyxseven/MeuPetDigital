import { NextRequest, NextResponse } from 'next/server';
import db from '@/core/lib/db/sqlite';
import { hashPassword, getSessionUser } from '@/core/lib/db/auth-helper';

// POST /api/auth/update-password - Atualiza a senha do usuário autenticado
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
    }

    const { password } = await req.json();

    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres.' },
        { status: 400 }
      );
    }

    const passwordHash = hashPassword(password);

    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(
      passwordHash,
      user.id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    return NextResponse.json(
      { error: 'Erro ao redefinir senha.' },
      { status: 500 }
    );
  }
}
