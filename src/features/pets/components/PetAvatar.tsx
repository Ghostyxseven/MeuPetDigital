"use client";

import React, { useState } from "react";
import { getSpeciesIcon } from "@/features/pets/utils/speciesIcon";

interface PetAvatarProps {
  fotoUrl?: string | null;
  especie?: string | null;
  nome?: string;
  /** Tailwind size classes for the container, e.g. "h-12 w-12" */
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { container: "h-9 w-9", icon: "h-4 w-4", rounded: "rounded-lg" },
  md: { container: "h-12 w-12", icon: "h-6 w-6", rounded: "rounded-xl" },
  lg: { container: "h-14 w-14", icon: "h-7 w-7", rounded: "rounded-xl" },
  xl: { container: "h-20 w-20", icon: "h-10 w-10", rounded: "rounded-2xl" },
};

/**
 * Exibe a foto do pet ou um fallback com o ícone da espécie.
 * Suporta imagens via URL direta (foto_url).
 */
export function PetAvatar({
  fotoUrl,
  especie,
  nome,
  size = "md",
  className = "",
}: PetAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const s = sizeMap[size];

  const showImage = fotoUrl && !imgError;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden ${s.container} ${s.rounded} ${
        showImage
          ? "bg-slate-100"
          : "bg-slate-100 text-slate-500"
      } ${className}`}
    >
      {showImage ? (
        <img
          src={fotoUrl}
          alt={nome ? `Foto de ${nome}` : "Foto do pet"}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        getSpeciesIcon(especie, s.icon)
      )}
    </div>
  );
}
