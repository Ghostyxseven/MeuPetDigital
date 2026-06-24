'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Activity, Calendar, ArrowRight } from 'lucide-react';
import { Header, Button } from '@/core/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between font-sans">
      
      {/* Header */}
      <Header showAuthButtons />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center animate-slide-up">
          
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 mb-6 border border-emerald-100">
            <Shield className="h-3.5 w-3.5" />
            <span>Controle Vacinal Inteligente</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
            A saúde do seu pet em <br />
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              dia, simples e digital.
            </span>
          </h1>

          <p className="mt-6 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Nunca mais perca o prazo de uma vacina. MeuPetDigital ajuda você a gerenciar a saúde preventiva do seu cão, calcular próximas doses e manter o histórico vacinal sempre à mão.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/dashboard">
              <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Acessar Dashboard
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Fazer Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mx-auto max-w-5xl mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          
          <div className="animate-fade-in bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Dashboard Geral</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Visualize de forma rápida e intuitiva a saúde de todos os seus cães através de indicadores de vacinas em dia, próximas e atrasadas.
            </p>
          </div>

          <div className="animate-fade-in bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1" style={{ animationDelay: '100ms' }}>
            <div className="h-10 w-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Cálculo de Próximas Doses</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              O sistema calcula automaticamente a data sugerida para a próxima dose de reforço anual de cada vacina aplicada.
            </p>
          </div>

          <div className="animate-fade-in bg-white rounded-2xl p-6 border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1" style={{ animationDelay: '200ms' }}>
            <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Segurança Supabase RLS</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Privacidade em primeiro lugar. Suas informações de pets e registros vacinais estão totalmente isoladas e seguras por tutor.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} MeuPetDigital. Desenvolvido para a disciplina de Programação para Internet I.
        </div>
      </footer>

    </div>
  );
}
