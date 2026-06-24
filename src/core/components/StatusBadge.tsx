import { getStatusUI, type VacinaStatus } from '@/core/lib/vacinaStatus';

interface StatusBadgeProps {
  status: VacinaStatus;
  className?: string;
}

/**
 * Badge visual que exibe o status vacinal de um pet.
 * Calcula automaticamente cores e label via getStatusUI().
 */
export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const ui = getStatusUI(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${ui.bgClass} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full animate-pulse-dot ${ui.dotClass}`} />
      {ui.label}
    </span>
  );
}
