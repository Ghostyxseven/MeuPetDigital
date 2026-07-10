"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/core/lib/supabase/client";
import type { PetShareLink } from "../types";

const SHARE_DURATION_DAYS = 7;

export function usePetShare(petId: string) {
  const [shareLink, setShareLink] = useState<PetShareLink | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActiveLink = useCallback(async () => {
    if (!petId) return;

    setIsLoading(true);
    setError(null);

    const { data, error: queryError } = await supabase
      .from("pet_share_links")
      .select("*")
      .eq("pet_id", petId)
      .is("revoked_at", null)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (queryError) {
      setError(
        "O compartilhamento ainda não está disponível. Aplique a migration do QR Code no Supabase.",
      );
      setShareLink(null);
    } else {
      setShareLink(data as PetShareLink | null);
    }

    setIsLoading(false);
  }, [petId]);

  useEffect(() => {
    void fetchActiveLink();
  }, [fetchActiveLink]);

  const createShareLink = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        throw new Error("Entre novamente para compartilhar a carteirinha.");
      }

      await supabase
        .from("pet_share_links")
        .update({ revoked_at: new Date().toISOString() })
        .eq("pet_id", petId)
        .is("revoked_at", null);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + SHARE_DURATION_DAYS);

      const { data, error: insertError } = await supabase
        .from("pet_share_links")
        .insert({
          pet_id: petId,
          user_id: authData.user.id,
          token: crypto.randomUUID(),
          expires_at: expiresAt.toISOString(),
        })
        .select("*")
        .single();

      if (insertError) throw insertError;
      const created = data as PetShareLink;
      setShareLink(created);
      return created;
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível gerar o compartilhamento.";
      setError(message);
      throw caughtError;
    } finally {
      setIsSaving(false);
    }
  };

  const revokeShareLink = async () => {
    if (!shareLink) return;
    setIsSaving(true);
    setError(null);

    const { error: updateError } = await supabase
      .from("pet_share_links")
      .update({ revoked_at: new Date().toISOString() })
      .eq("id", shareLink.id);

    if (updateError) {
      setError("Não foi possível revogar o link.");
      setIsSaving(false);
      throw updateError;
    }

    setShareLink(null);
    setIsSaving(false);
  };

  const publicUrl = useMemo(() => {
    if (!shareLink || typeof window === "undefined") return null;
    return `${window.location.origin}/carteirinha/${shareLink.token}`;
  }, [shareLink]);

  return {
    shareLink,
    publicUrl,
    isLoading,
    isSaving,
    error,
    createShareLink,
    revokeShareLink,
  };
}
