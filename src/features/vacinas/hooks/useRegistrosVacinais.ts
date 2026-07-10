"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { supabase } from "@/core/lib/supabase/client";
import type {
  RegistroVacinalDetailed,
  UpdateRegistroVacinalInput,
} from "../types";

function notifyRegistroChange() {
  if (typeof window === "undefined") return;
  localStorage.setItem("meupetdigital:registros-updated", Date.now().toString());
}

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
        .from("registros")
        .select(
          `
 *,
 vacinas ( id, nome, intervalo_dias ),
 pets ( id, nome )
 `,
        )
        .order("data_aplicacao", { ascending: false });

      if (petId) {
        query = query.eq("pet_id", petId);
      }

      const { data, error: supaError } = await query;

      if (supaError) throw supaError;

      setRegistros((data as RegistroVacinalDetailed[]) || []);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Erro ao buscar registros vacinais.";
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
    if (!user) throw new Error("Usuário não autenticado.");
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supaError } = await supabase
        .from("registros")
        .insert(input)
        .select()
        .single();

      if (supaError) throw supaError;

      await fetchRegistros();
      notifyRegistroChange();
      return data;
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Erro ao registrar vacina.";
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateRegistro = async (
    id: string,
    input: UpdateRegistroVacinalInput,
  ) => {
    if (!user) throw new Error("Usuário não autenticado.");
    setError(null);

    const { data, error: supaError } = await supabase
      .from("registros")
      .update(input)
      .eq("id", id)
      .select(
        `
          *,
          vacinas ( id, nome, intervalo_dias ),
          pets ( id, nome )
        `,
      )
      .single();

    if (supaError) {
      const message = supaError.message || "Erro ao atualizar a vacina.";
      setError(message);
      throw new Error(message);
    }

    const updated = data as RegistroVacinalDetailed;
    setRegistros((current) =>
      current.map((registro) => (registro.id === id ? updated : registro)),
    );
    notifyRegistroChange();
    return updated;
  };

  const deleteRegistro = async (id: string) => {
    if (!user) throw new Error("Usuário não autenticado.");
    setError(null);

    const { error: supaError } = await supabase
      .from("registros")
      .delete()
      .eq("id", id);

    if (supaError) {
      const message = supaError.message || "Erro ao excluir a vacina.";
      setError(message);
      throw new Error(message);
    }

    setRegistros((current) =>
      current.filter((registro) => registro.id !== id),
    );
    notifyRegistroChange();
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
    updateRegistro,
    deleteRegistro,
  };
}
