import { useState, useEffect } from 'react';
import { supabase } from '@/core/lib/supabase/client';
import { Vacina } from '../types';

export function useVacinas() {
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVacinas() {
      try {
        setIsLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('vacinas')
          .select('*')
          .order('nome', { ascending: true });

        if (supabaseError) {
          throw supabaseError;
        }

        setVacinas(data as Vacina[]);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar vacinas');
      } finally {
        setIsLoading(false);
      }
    }

    fetchVacinas();
  }, []);

  return { vacinas, isLoading, error };
}
