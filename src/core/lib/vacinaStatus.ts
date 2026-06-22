export type VacinaStatus = 'em_dia' | 'proxima' | 'atrasada';

/**
 * Calcula o status da vacina baseado na data da próxima dose.
 * - 'atrasada': Se a data da próxima dose já passou.
 * - 'proxima': Se a data da próxima dose está dentro dos próximos 30 dias.
 * - 'em_dia': Se faltam mais de 30 dias para a próxima dose ou se não há próxima dose definida.
 */
export function getVacinaStatus(proximaDoseStr: string | null | undefined): VacinaStatus {
  if (!proximaDoseStr) return 'em_dia';
  
  const today = new Date();
  // Zera o horário para comparar apenas datas
  today.setHours(0, 0, 0, 0);
  
  const proximaDose = new Date(proximaDoseStr);
  proximaDose.setHours(0, 0, 0, 0);
  
  // Diferença em milissegundos
  const diffTime = proximaDose.getTime() - today.getTime();
  // Converte para dias
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'atrasada';
  } else if (diffDays <= 30) {
    return 'proxima';
  } else {
    return 'em_dia';
  }
}

/**
 * Retorna as informações visuais (classe Tailwind, label) para um determinado status.
 */
export function getStatusUI(status: VacinaStatus) {
  switch (status) {
    case 'atrasada':
      return {
        label: 'Atrasada',
        bgClass: 'bg-red-50 text-red-700 border-red-200',
        dotClass: 'bg-red-500',
        textClass: 'text-red-600',
      };
    case 'proxima':
      return {
        label: 'Próxima Dose',
        bgClass: 'bg-amber-50 text-amber-700 border-amber-200',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-600',
      };
    case 'em_dia':
    default:
      return {
        label: 'Em Dia',
        bgClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-600',
      };
  }
}
