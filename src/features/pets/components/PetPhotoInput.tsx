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
  onProcessingChange?: (isProcessing: boolean) => void;
}

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.2,
  maxWidthOrHeight: 800,
};

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }
      reject(new Error("A foto não pôde ser lida."));
    };
    reader.onerror = () => reject(reader.error ?? new Error("A foto não pôde ser lida."));
    reader.readAsDataURL(file);
  });
}

/**
 * Input para foto do pet fazendo upload e convertendo para Base64.
 * Reduz a imagem antes de converter para não pesar no banco de dados.
 */
export function PetPhotoInput({
  value,
  especie,
  onChange,
  onProcessingChange,
}: PetPhotoInputProps) {
  const [isCompressing, setIsCompressing] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasValidImage = value && !imgError;

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      onProcessingChange?.(true);
      setImgError(false);
      setProcessingError(null);

      // Alguns navegadores móveis, especialmente WebViews e versões do Safari,
      // não conseguem iniciar o Web Worker usado pela biblioteca. Nesses casos,
      // repete a compressão na thread principal antes de considerar a foto inválida.
      let compressedFile: File;
      try {
        compressedFile = await imageCompression(file, {
          ...COMPRESSION_OPTIONS,
          useWebWorker: true,
        });
      } catch {
        compressedFile = await imageCompression(file, {
          ...COMPRESSION_OPTIONS,
          useWebWorker: false,
        });
      }

      const base64data = await readAsDataUrl(compressedFile);
      onChange(base64data);
    } catch (error) {
      console.error("Erro na compressão:", error);
      setImgError(true);
      setProcessingError(
        "Não foi possível preparar esta foto. Tente tirar outra ou escolher uma imagem da galeria.",
      );
      onChange(null);
    } finally {
      setIsCompressing(false);
      onProcessingChange?.(false);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setImgError(false);
    setProcessingError(null);
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
        onClick={() => {
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
            fileInputRef.current.click();
          }
        }}
        disabled={isCompressing}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50 transition-colors disabled:opacity-50"
      >
        <Upload className="h-3.5 w-3.5" />
        {isCompressing ? "Preparando foto..." : hasValidImage ? "Trocar foto" : "Adicionar foto"}
      </button>

      <p className="min-h-4 max-w-64 text-center text-[11px] font-semibold" aria-live="polite">
        {processingError ? (
          <span className="text-red-600">{processingError}</span>
        ) : isCompressing ? (
          <span className="text-emerald-700">Aguarde a foto aparecer antes de salvar.</span>
        ) : hasValidImage ? (
          <span className="text-emerald-700">Foto pronta para salvar.</span>
        ) : null}
      </p>
    </div>
  );
}
