import React from 'react';

type MetricTone = 'slate' | 'emerald' | 'amber' | 'red';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone?: MetricTone;
}

const toneStyles: Record<MetricTone, string> = {
  slate: 'text-slate-600 bg-slate-50',
  emerald: 'text-emerald-600 bg-emerald-50',
  amber: 'text-amber-600 bg-amber-50',
  red: 'text-red-600 bg-red-50',
};

/**
 * Card de métrica para o dashboard (Total, Em dia, Próximas, Atrasadas).
 */
export function MetricCard({ icon, label, value, tone = 'slate' }: MetricCardProps) {
  return (
    <div className="animate-fade-in rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
          {label}
        </span>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneStyles[tone]}`}
        >
          {icon}
        </div>
      </div>
      <span className="mt-4 block text-3xl font-black text-slate-950">
        {value}
      </span>
    </div>
  );
}
