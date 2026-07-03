import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import db from '@/core/lib/db/sqlite';
import { hashPassword, setSessionUser } from '@/core/lib/db/auth-helper';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'A senha deve ter pelo menos 6 caracteres.' },
        { status: 400 }
      );
    }

    // Verifica se o usuário já existe
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        { error: 'Este e-mail já está sendo utilizado.' },
        { status: 400 }
      );
    }

    // Cria o novo usuário
    const userId = crypto.randomUUID();
    const passwordHash = hashPassword(password);

    db.prepare('INSERT INTO users (id, email, password_hash) VALUES (?, ?, ?)').run(
      userId,
      email.toLowerCase(),
      passwordHash
    );

    const user = { id: userId, email: email.toLowerCase() };

    // Inicia a sessão automaticamente no login/cadastro
    await setSessionUser(user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Erro no cadastro de usuário:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao cadastrar o usuário.' },
      { status: 500 }
    );
  }
}
