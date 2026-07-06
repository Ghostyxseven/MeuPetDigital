'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { supabase } from '@/core/lib/supabase/client';
import type { Pet, CreatePetInput, UpdatePetInput } from '../types';

export function usePets() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = useCallback(async () => {
    if (!user) {
      setPets([]);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: supaError } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false });

      if (supaError) throw supaError;
      
      setPets((data as Pet[]) || []);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao carregar os pets.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const getPetById = useCallback(async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: supaError } = await supabase
        .from('pets')
        .select('*')
        .eq('id', id)
        .single();

      if (supaError) throw supaError;
      return data as Pet;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao buscar detalhes do pet.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createPet = async (input: CreatePetInput) => {
    if (!user) throw new Error('Usuário não autenticado.');
    try {
      setIsLoading(true);
      setError(null);
      
      const newPet = {
        ...input,
        user_id: user.id
      };

      const { data, error: supaError } = await supabase
        .from('pets')
        .insert(newPet)
        .select()
        .single();

      if (supaError) throw supaError;
      
      await fetchPets();
      return data as Pet;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao cadastrar o pet.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePet = async (id: string, input: UpdatePetInput) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error: supaError } = await supabase
        .from('pets')
        .update(input)
        .eq('id', id)
        .select()
        .single();

      if (supaError) throw supaError;
      
      await fetchPets();
      return data as Pet;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao atualizar o pet.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePet = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error: supaError } = await supabase
        .from('pets')
        .delete()
        .eq('id', id);

      if (supaError) throw supaError;
      
      await fetchPets();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao excluir o pet.';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, [fetchPets]);

  return {
    pets,
    isLoading,
    error,
    fetchPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
  };
}
