import { NextResponse } from 'next/server';
import { getSessionUser } from '@/core/lib/db/auth-helper';

export async function GET() {
  try {
    const user = await getSessionUser();
    
    // Retorna a estrutura similar ao Supabase: { data: { session: { user } } } ou { data: { session: null } }
    // Isso torna as mudanças no frontend ainda mais simples!
    if (!user) {
      return NextResponse.json({ data: { session: null } });
    }

    return NextResponse.json({
      data: {
        session: {
          user: {
            id: user.id,
            email: user.email,
          },
        },
      },
    });
  } catch (error) {
    console.error('Erro ao verificar sessão:', error);
    return NextResponse.json(
      { error: 'Erro interno ao validar sessão.' },
      { status: 500 }
    );
  }
}
