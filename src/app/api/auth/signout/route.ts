import { NextResponse } from 'next/server';
import { clearSession } from '@/core/lib/db/auth-helper';

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao encerrar sessão:', error);
    return NextResponse.json(
      { error: 'Ocorreu um erro ao sair.' },
      { status: 500 }
    );
  }
}
