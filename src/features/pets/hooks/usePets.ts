'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
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
      const res = await fetch('/api/pets');
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Erro ao carregar os pets.');
      setPets(data || []);
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
      const res = await fetch(`/api/pets/${id}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao buscar detalhes do pet.');
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
      const res = await fetch('/api/pets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao cadastrar o pet.');
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
      const res = await fetch(`/api/pets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar o pet.');
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
      const res = await fetch(`/api/pets/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erro ao excluir o pet.');
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
