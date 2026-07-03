import { useState, useEffect } from 'react';
import { Vacina } from '../types';

export function useVacinas() {
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVacinas() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/vacinas');
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Erro ao carregar catálogo de vacinas.');
        }

        setVacinas(data as Vacina[]);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Erro ao carregar vacinas';
        setError(msg);
      } finally {
        setIsLoading(false);
      }
    }

    fetchVacinas();
  }, []);

  return { vacinas, isLoading, error };
}
