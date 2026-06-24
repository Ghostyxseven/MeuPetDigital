'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/core/lib/supabase/client';
import { useAuth } from '@/features/auth/hooks/useAuth';
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
        .select('*, pets (id, nome), vacinas (id, nome, intervalo_dias)');

      if (petId) {
        query = query.eq('pet_id', petId);
      }

      const { data, error: supabaseError } = await query.order('data_aplicacao', { ascending: false });

      if (supabaseError) throw supabaseError;

      setRegistros((data as unknown as RegistroVacinalDetailed[]) || []);
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
    observacoes?: string | null;
  }) => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      setIsLoading(true);
      setError(null);

      // Fetch vacina interval to calculate next dose
      const { data: vacinaData, error: vacinaError } = await supabase
        .from('vacinas')
        .select('intervalo_dias')
        .eq('id', input.vacina_id)
        .single();

      if (vacinaError) throw vacinaError;

      let proxima_dose = null;
      if (vacinaData && vacinaData.intervalo_dias) {
        const [year, month, day] = input.data_aplicacao.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        dateObj.setDate(dateObj.getDate() + vacinaData.intervalo_dias);
        
        const nextYear = dateObj.getFullYear();
        const nextMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
        const nextDay = String(dateObj.getDate()).padStart(2, '0');
        proxima_dose = `${nextYear}-${nextMonth}-${nextDay}`;
      }

      const { data, error: insertError } = await supabase
        .from('registros')
        .insert({
          pet_id: input.pet_id,
          vacina_id: input.vacina_id,
          data_aplicacao: input.data_aplicacao,
          proxima_dose,
          observacoes: input.observacoes || null,
        })
        .select()
        .single();

      if (insertError) throw insertError;
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
