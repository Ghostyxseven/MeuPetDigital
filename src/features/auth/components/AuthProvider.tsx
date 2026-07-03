'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '../types';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Função para carregar a sessão atual da nossa API local
  const checkSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const json = await res.json();
      
      if (json.data && json.data.session) {
        setSession(json.data.session);
        setUser(json.data.session.user);
      } else {
        setSession(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Erro ao verificar sessão:', err);
      setSession(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const signOut = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signout', { method: 'POST' });
      if (res.ok) {
        setSession(null);
        setUser(null);
      }
    } catch (err) {
      console.error('Erro ao fazer logout:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext deve ser utilizado dentro de um AuthProvider');
  }
  return context;
}
