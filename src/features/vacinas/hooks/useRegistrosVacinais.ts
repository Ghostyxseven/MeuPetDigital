'use client';

import { useState, useEffect, useCallback } from 'react';
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

      const url = petId ? `/api/registros?pet_id=${petId}` : '/api/registros';
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao buscar registros vacinais.');

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
    observacoes?: string | null;
  }) => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch('/api/registros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao registrar vacina.');
      
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
