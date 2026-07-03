import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

export interface AuthUser {
  id: string;
  email: string;
}

// Criptografa a senha de forma síncrona
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

// Compara a senha informada com o hash salvo
export function comparePassword(password: string, hash: string): boolean {
  try {
    return bcrypt.compareSync(password, hash);
  } catch (e) {
    return false;
  }
}

// Recupera o usuário da sessão a partir dos cookies
export async function getSessionUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('auth_session');
    
    if (!sessionCookie || !sessionCookie.value) {
      return null;
    }

    // Decodifica a sessão de Base64
    const decoded = Buffer.from(sessionCookie.value, 'base64').toString('utf-8');
    const user = JSON.parse(decoded) as AuthUser;

    if (!user || !user.id || !user.email) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Erro ao ler a sessão:', error);
    return null;
  }
}

// Define a sessão do usuário no cookie
export async function setSessionUser(user: AuthUser): Promise<void> {
  const cookieStore = await cookies();
  
  // Serializa e codifica o usuário em Base64
  const sessionData = JSON.stringify({ id: user.id, email: user.email });
  const encoded = Buffer.from(sessionData).toString('base64');

  cookieStore.set('auth_session', encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    path: '/',
  });
}

// Limpa o cookie de sessão (SignOut)
export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('auth_session');
}
