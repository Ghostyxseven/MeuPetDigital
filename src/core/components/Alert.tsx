import React from 'react';
import { CheckCircle, Info, TriangleAlert } from 'lucide-react';

type AlertTone = 'error' | 'success' | 'info';

interface AlertProps {
  tone?: AlertTone;
  children: React.ReactNode;
}

const toneStyles: Record<AlertTone, string> = {
  error: 'border-red-100 bg-red-50 text-red-700',
  success: 'border-emerald-100 bg-emerald-50 text-emerald-700',
  info: 'border-slate-200 bg-slate-50 text-slate-700',
};

const iconStyles: Record<AlertTone, React.ReactNode> = {
  error: <TriangleAlert className="h-4 w-4" />,
  success: <CheckCircle className="h-4 w-4" />,
  info: <Info className="h-4 w-4" />,
};

export function Alert({ tone = 'info', children }: AlertProps) {
  return (
    <p className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm font-medium ${toneStyles[tone]}`}>
      <span className="mt-0.5 flex-shrink-0">{iconStyles[tone]}</span>
      <span>{children}</span>
    </p>
  );
}
