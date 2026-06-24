'use client';

import React from 'react';
import Link from 'next/link';
import { Dog, LogOut, User as UserIcon } from 'lucide-react';
import { Button } from './Button';

interface HeaderProps {
  /** Usuário logado (se houver) */
  user?: { email?: string } | null;
  /** Callback de logout */
  onLogout?: () => void;
  /** Exibir botões de Entrar/Acessar Painel (quando não logado) */
  showAuthButtons?: boolean;
}

/**
 * Header/Navbar unificado do MeuPetDigital.
 * Usado tanto na home (showAuthButtons) quanto nas páginas internas (user + onLogout).
 */
export function Header({ user, onLogout, showAuthButtons = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-200">
            <Dog className="h-6 w-6" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              MeuPetDigital
            </span>
            <p className="text-[10px] font-medium text-slate-400">
              Saúde Preventiva Canina
            </p>
          </div>
        </Link>

        {/* Ações */}
        <div className="flex items-center gap-4">
          {/* Modo logado */}
          {user && (
            <>
              <div className="hidden items-center gap-2 sm:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                  <UserIcon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-600">
                  {user.email}
                </span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={<LogOut className="h-3.5 w-3.5" />}
                onClick={onLogout}
                className="hover:text-red-600"
              >
                Sair
              </Button>
            </>
          )}

          {/* Modo visitante */}
          {showAuthButtons && !user && (
            <>
              <Link
                href="/login"
                className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Entrar
              </Link>
              <Link href="/dashboard">
                <Button size="sm">Acessar Painel</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
