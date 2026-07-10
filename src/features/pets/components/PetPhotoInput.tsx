/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState } from "react";
import { Camera, Upload, X, ImageOff } from "lucide-react";
import { getSpeciesIcon } from "@/features/pets/utils/speciesIcon";
import imageCompression from "browser-image-compression";

interface PetPhotoInputProps {
  value?: string | null;
  especie?: string | null;
  onChange: (base64: string | null) => void;
}

/**
 * Input para foto do pet fazendo upload e convertendo para Base64.
 * Reduz a imagem antes de converter para não pesar no banco de dados.
 */
export function PetPhotoInput({ value, especie, onChange }: PetPhotoInputProps) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasValidImage = value && !imgError;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setImgError(false);

      // Opções de compressão: limite de 200kb, máximo de 800px
      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);

      // Converter para Base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        const base64data = reader.result as string;
        onChange(base64data); // Passa o Base64 para o formulário
        setIsCompressing(false);
      };
      reader.onerror = () => {
        console.error("Erro ao ler o arquivo");
        setIsCompressing(false);
        setImgError(true);
      };
    } catch (error) {
      console.error("Erro na compressão:", error);
      setIsCompressing(false);
      setImgError(true);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setImgError(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Limpa o input file
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Avatar preview */}
      <div className="relative group">
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-colors group-hover:border-emerald-300">
          {isCompressing ? (
            <div className="flex flex-col items-center gap-1 text-emerald-500">
              <span className="text-[10px] font-bold animate-pulse">Carregando...</span>
            </div>
          ) : hasValidImage ? (
            <img
              src={value}
              alt="Foto do pet"
              className="h-full w-full object-cover rounded-2xl"
              onError={() => setImgError(true)}
            />
          ) : imgError ? (
            <div className="flex flex-col items-center gap-1 text-red-400">
              <ImageOff className="h-6 w-6" />
              <span className="text-[9px] font-bold">Erro na foto</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5 text-slate-400">
              {especie ? (
                getSpeciesIcon(especie, "h-8 w-8")
              ) : (
                <Camera className="h-8 w-8" />
              )}
              <span className="text-[9px] font-bold uppercase tracking-wider">
                Foto
              </span>
            </div>
          )}
        </div>

        {/* Remove button */}
        {hasValidImage && !isCompressing && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:bg-red-600"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* File input (hidden) */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Upload button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isCompressing}
        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors disabled:opacity-50"
      >
        <Upload className="h-3.5 w-3.5" />
        {hasValidImage ? "Trocar foto" : "Adicionar foto"}
      </button>
    </div>
  );
}
