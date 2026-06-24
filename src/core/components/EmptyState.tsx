import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * Componente para exibir estados vazios (sem dados).
 * Aceita ícone, título, descrição opcional e ação (botão).
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="animate-fade-in rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center">
      <div className="mx-auto flex justify-center text-slate-300">{icon}</div>
      <p className="mt-4 text-sm font-bold text-slate-600">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
