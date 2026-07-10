/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from "react";
import type { Pet } from "@/features/pets/types";
import type { RegistroVacinalDetailed } from "@/features/vacinas/types";
import { getSpeciesIcon } from "@/features/pets/utils/speciesIcon";

interface CarteirinhaPDFProps {
  pet: Pet | null;
  registros: RegistroVacinalDetailed[];
}

/* ── Paleta MeuPetDigital ───────────────────────────────────── */
const colors = {
  primary900: "#422810",
  primary800: "#5c3a1a",
  primary700: "#734d26",
  primary500: "#8c6239",
  secondary: "#b38f6b",
  secondaryLight: "#c6a07a",
  cream50: "#faf6f0",
  cream100: "#f0e4d3",
  cream200: "#e2ceb5",
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate700: "#334155",
  slate900: "#0f172a",
  slate950: "#020617",
};

export const CarteirinhaPDF = forwardRef<HTMLDivElement, CarteirinhaPDFProps>(
  ({ pet, registros }, ref) => {
    if (!pet) return null;

    const formatDate = (dateString?: string | null) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("pt-BR");
    };

    return (
      <div
        ref={ref}
        className="relative w-[800px] min-h-[1131px] font-sans"
        style={{ padding: "32px", backgroundColor: colors.cream50 }}
      >
        {/* ═══════════════════════════════════════════════════════
            CARTEIRA DE IDENTIDADE ANIMAL — Frente
            ═══════════════════════════════════════════════════════ */}
        <div
          style={{
            borderRadius: "16px",
            overflow: "hidden",
            border: `2px solid ${colors.primary700}`,
            backgroundColor: "#ffffff",
            boxShadow: "0 8px 30px rgba(92, 58, 26, 0.15)",
          }}
        >
          {/* ── Header marrom ──────────────────────────────────── */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.primary900} 0%, ${colors.primary700} 50%, ${colors.primary500} 100%)`,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(255,255,255,0.25)",
                }}
              >
                <span style={{ color: "#ffffff", display: "flex" }}>
                  {getSpeciesIcon(pet.especie, "h-6 w-6")}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "9px",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  MeuPetDigital
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 800,
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  Carteira de Identidade Animal
                </div>
              </div>
            </div>
            <div
              style={{
                fontSize: "8px",
                color: "rgba(255,255,255,0.45)",
                textAlign: "right" as const,
                lineHeight: "1.5",
              }}
            >
              Documento digital
              <br />
              de uso veterinário
            </div>
          </div>

          {/* ── Corpo do documento ─────────────────────────────── */}
          <div style={{ display: "flex" }}>
            {/* Coluna esquerda: Foto + dados */}
            <div style={{ flex: 1, padding: "20px 24px 16px" }}>
              <div style={{ display: "flex", gap: "20px" }}>
                {/* Foto do pet */}
                <div
                  style={{
                    width: "130px",
                    height: "150px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: `3px solid ${colors.primary700}`,
                    backgroundColor: colors.cream100,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {pet.foto_url ? (
                    <img
                      src={pet.foto_url}
                      alt={`Foto de ${pet.nome}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      crossOrigin="anonymous"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column" as const,
                        alignItems: "center",
                        gap: "6px",
                        color: colors.secondary,
                      }}
                    >
                      {getSpeciesIcon(pet.especie, "h-12 w-12")}
                      <span
                        style={{
                          fontSize: "8px",
                          fontWeight: 700,
                          textTransform: "uppercase" as const,
                          letterSpacing: "0.1em",
                        }}
                      >
                        Sem foto
                      </span>
                    </div>
                  )}
                </div>

                {/* Grid de dados */}
                <div style={{ flex: 1 }}>
                  {/* Nome do animal — destaque */}
                  <div style={{ marginBottom: "12px" }}>
                    <FieldLabel>Nome do Animal</FieldLabel>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 900,
                        color: colors.primary800,
                        lineHeight: 1.2,
                      }}
                    >
                      {pet.nome}
                    </div>
                  </div>

                  {/* Grid 2 colunas */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "8px 16px",
                    }}
                  >
                    <Field label="Espécie" value={pet.especie || "Não informada"} />
                    <Field label="Raça" value={pet.raca || "SRD"} />
                    <Field
                      label="Data de Nascimento"
                      value={formatDate(pet.data_nascimento)}
                    />
                    <Field
                      label="Peso"
                      value={pet.peso ? `${pet.peso} kg` : "Não informado"}
                    />
                    <Field
                      label="RG SinPatinhas"
                      value={pet.rg_sinpatinhas || "Não informado"}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna direita: Faixa caramelo decorativa */}
            <div
              style={{
                width: "180px",
                background: `linear-gradient(180deg, ${colors.primary500} 0%, ${colors.secondary} 100%)`,
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "space-between",
                position: "relative" as const,
                overflow: "hidden",
              }}
            >
              {/* Silhuetas decorativas */}
              <div
                style={{
                  position: "absolute" as const,
                  right: "-20px",
                  top: "20px",
                  opacity: 0.08,
                  transform: "rotate(15deg)",
                }}
              >
                <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
                  <path d="M4.5 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm5-4a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm5 4a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm4 5.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM12 17c-2.76 0-5-2-5-4.5 0-1.83 1.5-3.5 5-6.5 3.5 3 5 4.67 5 6.5 0 2.5-2.24 4.5-5 4.5Z" />
                </svg>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 800,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: "6px",
                  }}
                >
                  Status vacinal
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.4,
                  }}
                >
                  {registros.length === 0
                    ? "Nenhum registro"
                    : `${registros.length} vacina(s) registrada(s)`}
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: "8px",
                  padding: "10px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.6)",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  Emissão
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {new Date().toLocaleDateString("pt-BR")}
                </div>
              </div>
            </div>
          </div>

          {/* ── Barra inferior do documento ─────────────────────── */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.primary900}, ${colors.primary700})`,
              padding: "8px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
              }}
            >
              Carteira de Identidade Animal
            </span>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════
            HISTÓRICO DE VACINAÇÃO
            ═══════════════════════════════════════════════════════ */}
        <div
          style={{
            marginTop: "24px",
            borderRadius: "16px",
            overflow: "hidden",
            border: `2px solid ${colors.cream200}`,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 20px rgba(92, 58, 26, 0.08)",
          }}
        >
          {/* Título da seção */}
          <div
            style={{
              background: `linear-gradient(135deg, ${colors.primary800}, ${colors.primary500})`,
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m14.5 6.5-1-1a2.12 2.12 0 0 0-3 0L3 13v3h3l7.5-7.5" />
                <path d="m16 8 3-3" />
                <path d="M15 5 5 15" />
                <line x1="18" y1="11" x2="18" y2="22" />
                <line x1="12.5" y1="16.5" x2="24" y2="16.5" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "13px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "0.04em",
                textTransform: "uppercase" as const,
              }}
            >
              Histórico de Vacinação
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.5)",
                marginLeft: "auto",
              }}
            >
              {registros.length} registro(s)
            </span>
          </div>

          {registros.length === 0 ? (
            <div
              style={{
                padding: "40px 24px",
                textAlign: "center" as const,
                color: colors.slate400,
                fontSize: "13px",
                fontStyle: "italic" as const,
              }}
            >
              Nenhum registro de vacina encontrado para este pet.
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse" as const,
                fontSize: "12px",
              }}
            >
              <thead>
                <tr
                  style={{
                    backgroundColor: colors.cream50,
                    borderBottom: `2px solid ${colors.cream200}`,
                  }}
                >
                  <Th>Vacina</Th>
                  <Th>Data de Aplicação</Th>
                  <Th>Próxima Dose</Th>
                  <Th>Assinatura / Carimbo</Th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro, index) => (
                  <tr
                    key={registro.id}
                    style={{
                      backgroundColor: index % 2 === 0 ? "#ffffff" : colors.cream50,
                      borderBottom: `1px solid ${colors.cream100}`,
                    }}
                  >
                    <td
                      style={{
                        padding: "12px 20px",
                        fontWeight: 700,
                        color: colors.primary800,
                      }}
                    >
                      {registro.vacinas?.nome || "Vacina Geral"}
                    </td>
                    <td style={{ padding: "12px 20px", color: colors.slate700 }}>
                      {formatDate(registro.data_aplicacao)}
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        color: colors.slate700,
                        fontWeight: 600,
                      }}
                    >
                      {registro.proxima_dose
                        ? formatDate(registro.proxima_dose)
                        : "Dose única"}
                    </td>
                    <td
                      style={{
                        padding: "12px 20px",
                        color: colors.cream200,
                        letterSpacing: "0.05em",
                      }}
                    >
                      ______________________
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ── Rodapé ────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            borderRadius: "12px",
            backgroundColor: colors.cream100,
            border: `1px solid ${colors.cream200}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "9px",
              color: colors.primary500,
              fontWeight: 600,
            }}
          >
            Documento gerado digitalmente pelo app MeuPetDigital
          </span>
          <span
            style={{
              fontSize: "9px",
              color: colors.secondary,
            }}
          >
            A validade oficial pode requerer carimbo e assinatura do Médico
            Veterinário
          </span>
        </div>
      </div>
    );
  }
);

CarteirinhaPDF.displayName = "CarteirinhaPDF";

/* ── Componentes auxiliares ──────────────────────────────────── */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "8px",
        fontWeight: 800,
        textTransform: "uppercase" as const,
        letterSpacing: "0.12em",
        color: colors.secondary,
        marginBottom: "2px",
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: colors.primary900,
          lineHeight: 1.3,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      style={{
        padding: "10px 20px",
        textAlign: "left" as const,
        fontSize: "9px",
        fontWeight: 800,
        textTransform: "uppercase" as const,
        letterSpacing: "0.1em",
        color: colors.primary500,
      }}
    >
      {children}
    </th>
  );
}
