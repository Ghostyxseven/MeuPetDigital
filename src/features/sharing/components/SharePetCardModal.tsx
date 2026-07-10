"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  Check,
  Copy,
  Download,
  ExternalLink,
  QrCode,
  Share2,
  Trash2,
  X,
} from "lucide-react";
import { Alert, Button, Spinner } from "@/core/components";
import { usePetShare } from "../hooks/usePetShare";

interface SharePetCardModalProps {
  petId: string;
  petName: string;
  onClose: () => void;
}

export function SharePetCardModal({
  petId,
  petName,
  onClose,
}: SharePetCardModalProps) {
  const {
    shareLink,
    publicUrl,
    isLoading,
    isSaving,
    error,
    createShareLink,
    revokeShareLink,
  } = usePetShare(petId);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [durationDays, setDurationDays] = useState(9999);

  useEffect(() => {
    if (!publicUrl) {
      setQrDataUrl(null);
      return;
    }

    QRCode.toDataURL(publicUrl, {
      width: 320,
      margin: 2,
      color: { dark: "#422006", light: "#ffffff" },
      errorCorrectionLevel: "H",
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [publicUrl]);

  const handleCopy = async () => {
    if (!publicUrl) return;
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (!publicUrl || !navigator.share) return;
    await navigator.share({
      title: `Carteirinha de ${petName}`,
      text: `Consulte a carteirinha de vacinação de ${petName}.`,
      url: publicUrl,
    });
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const anchor = document.createElement("a");
    anchor.href = qrDataUrl;
    anchor.download = `qr-code-carteirinha-${petName.toLowerCase().replace(/\s+/g, "-")}.png`;
    anchor.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-pet-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <QrCode className="h-6 w-6" />
            </span>
            <div>
              <h2 id="share-pet-title" className="text-lg font-extrabold text-slate-950">
                Compartilhar carteirinha
              </h2>
              <p className="text-xs text-slate-500">Acesso temporário e somente leitura.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Fechar compartilhamento"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="mt-5" aria-live="polite">
          {isLoading ? (
            <div className="flex min-h-64 items-center justify-center">
              <Spinner label="Verificando compartilhamento..." />
            </div>
          ) : error && !shareLink ? (
            <div className="space-y-4">
              <Alert tone="error">{error}</Alert>
              <Button variant="secondary" className="w-full" onClick={onClose}>
                Fechar
              </Button>
            </div>
          ) : !shareLink ? (
            <div className="space-y-5 text-center">
              <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50 p-7">
                <QrCode className="mx-auto h-16 w-16 text-emerald-700" />
                <p className="mt-4 text-sm font-bold text-slate-900">
                  Gere um QR Code para {petName}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-600">
                  O link ficará ativo pelo tempo que você escolher e poderá ser revogado a qualquer momento.
                </p>
                <div className="mt-4 text-left">
                  <label className="block text-xs font-bold text-emerald-900 mb-1">Validade do link</label>
                  <select
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full rounded-xl border border-emerald-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  >
                    <option value={7}>7 dias (Recomendado para Viagens/Hotelzinho)</option>
                    <option value={30}>30 dias</option>
                    <option value={180}>6 meses</option>
                    <option value={9999}>Para sempre (Recomendado para Coleira/Tags)</option>
                  </select>
                </div>
              </div>
              <Button
                className="w-full"
                loading={isSaving}
                icon={<QrCode className="h-4 w-4" />}
                onClick={() => void createShareLink(durationDays)}
              >
                Gerar QR Code
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center rounded-2xl border border-slate-200 bg-white p-4">
                {qrDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrDataUrl}
                    alt={`QR Code da carteirinha de ${petName}`}
                    className="h-64 w-64 max-w-full"
                  />
                ) : (
                  <div className="flex h-64 w-64 items-center justify-center">
                    <Spinner label="Gerando QR Code..." />
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-semibold text-slate-500">Válido até</p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {new Date(shareLink.expires_at).toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="secondary"
                  icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  onClick={() => void handleCopy()}
                >
                  {copied ? "Copiado" : "Copiar link"}
                </Button>
                <Button
                  variant="secondary"
                  icon={<Download className="h-4 w-4" />}
                  onClick={handleDownload}
                  disabled={!qrDataUrl}
                >
                  Baixar QR
                </Button>
                {typeof navigator !== "undefined" && "share" in navigator ? (
                  <Button
                    variant="secondary"
                    icon={<Share2 className="h-4 w-4" />}
                    onClick={() => void handleNativeShare()}
                  >
                    Compartilhar
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    icon={<ExternalLink className="h-4 w-4" />}
                    onClick={() => publicUrl && window.open(publicUrl, "_blank", "noopener,noreferrer")}
                  >
                    Abrir link
                  </Button>
                )}
                <Button
                  variant="danger"
                  loading={isSaving}
                  icon={<Trash2 className="h-4 w-4" />}
                  onClick={() => void revokeShareLink()}
                >
                  Revogar
                </Button>
              </div>

              {error && <Alert tone="error">{error}</Alert>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
