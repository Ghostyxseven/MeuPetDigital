'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { supabase } from '@/core/lib/supabase/client';
import type { RegistroVacinalDetailed } from '../types';

export function useRegistrosVacinais(petId?: string) {
  const { user } = useAuth();
  const [registros, setRegistros] = useState<RegistroVacinalDetailed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRegistros = useCallback(async () => {
    if (!user) {
      setRegistros([]);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);

      let query = supabase
        .from('registros')
        .select(`
          *,
          vacinas ( id, nome, intervalo_dias ),
          pets ( id, nome )
        `)
        .order('data_aplicacao', { ascending: false });

      if (petId) {
        query = query.eq('pet_id', petId);
      }

      const { data, error: supaError } = await query;

      if (supaError) throw supaError;

      setRegistros((data as RegistroVacinalDetailed[]) || []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao buscar registros vacinais.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [user, petId]);

  const createRegistro = async (input: {
    pet_id: string;
    vacina_id: string;
    data_aplicacao: string;
    proxima_dose?: string | null;
    observacoes?: string | null;
  }) => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supaError } = await supabase
        .from('registros')
        .insert(input)
        .select()
        .single();

      if (supaError) throw supaError;
      
      await fetchRegistros();
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao registrar vacina.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, [fetchRegistros]);

  return {
    registros,
    isLoading,
    error,
    fetchRegistros,
    createRegistro,
  };
}
