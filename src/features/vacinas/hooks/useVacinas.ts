import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/core/lib/supabase/client";
import type { Vacina } from "../types";

export function useVacinas() {
  const [vacinas, setVacinas] = useState<Vacina[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVacinas = useCallback(async () => {
      try {
        setIsLoading(true);
        const { data, error: supaError } = await supabase
          .from("vacinas")
          .select("*")
          .order("nome");

        if (supaError) {
          throw supaError;
        }

        setVacinas((data as Vacina[]) || []);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Erro ao carregar vacinas";
        setError(msg);
      } finally {
        setIsLoading(false);
      }
  }, []);

  useEffect(() => {
    fetchVacinas();
  }, [fetchVacinas]);

  const createVacina = async (input: {
    nome: string;
    descricao?: string | null;
    intervalo_dias: number;
  }) => {
    const normalizedName = input.nome.trim();
    const existing = vacinas.find(
      (vacina) => vacina.nome.toLocaleLowerCase("pt-BR") === normalizedName.toLocaleLowerCase("pt-BR"),
    );

    if (existing) return existing;

    const { data, error: supaError } = await supabase
      .from("vacinas")
      .insert({ ...input, nome: normalizedName })
      .select()
      .single();

    if (supaError) throw supaError;

    const created = data as Vacina;
    setVacinas((current) => [...current, created].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR")));
    return created;
  };

  return { vacinas, isLoading, error, fetchVacinas, createVacina };
}
