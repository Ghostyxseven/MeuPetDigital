import { NextRequest, NextResponse } from 'next/server';
import db from '@/core/lib/db/sqlite';
import { comparePassword, setSessionUser } from '@/core/lib/db/auth-helper';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    // Busca o usuário pelo e-mail
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase()) as {
      id: string;
      email: string;
      password_hash: string;
    } | undefined;

    if (!user) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 400 }
      );
    }

    // Valida a senha
    const isValid = comparePassword(password, user.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Credenciais inválidas.' },
        { status: 400 }
      );
    }

    const sessionUser = { id: user.id, email: user.email };

    // Inicia a sessão
    await setSessionUser(sessionUser);

    return NextResponse.json({ user: sessionUser });
  } catch (error) {
    console.error('Erro no login de usuário:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao tentar fazer login.' },
      { status: 500 }
    );
  }
}
