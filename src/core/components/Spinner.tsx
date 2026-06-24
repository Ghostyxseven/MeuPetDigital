import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface SpinnerProps {
  size?: SpinnerSize;
  label?: string;
  fullscreen?: boolean;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'h-6 w-6 border-2',
  md: 'h-10 w-10 border-[3px]',
  lg: 'h-12 w-12 border-4',
};

/**
 * Componente de loading spinner reutilizável.
 * Pode ser usado inline ou fullscreen (cobrindo a tela toda).
 */
export function Spinner({ size = 'md', label, fullscreen = false }: SpinnerProps) {
  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`animate-spin rounded-full border-emerald-500 border-t-transparent ${sizeStyles[size]}`}
      />
      {label && (
        <p className="text-sm font-semibold text-slate-500">{label}</p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
