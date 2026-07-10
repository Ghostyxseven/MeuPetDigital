import Link from "next/link";
import { Dog, ShieldCheck } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthLayout({
  title,
  description,
  icon,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden overflow-hidden bg-emerald-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />
        <Link href="/" className="relative flex items-center gap-3 font-bold">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <Dog className="h-6 w-6" />
          </span>
          MeuPetDigital
        </Link>
        <div className="relative max-w-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-200">
            Saúde preventiva sem complicação
          </p>
          <h2 className="mt-4 text-4xl font-black leading-tight">
            Vacinas, histórico e próximos cuidados em um só lugar.
          </h2>
          <p className="mt-4 text-base leading-7 text-emerald-100">
            Consulte rapidamente o que está em dia e o que precisa da sua atenção.
          </p>
        </div>
        <p className="relative flex items-center gap-2 text-sm text-emerald-100">
          <ShieldCheck className="h-5 w-5" /> Dados protegidos com Supabase e RLS.
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="animate-slide-up w-full max-w-md">
          <Link href="/" className="mb-8 flex items-center gap-2 font-bold text-slate-900 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Dog className="h-5 w-5" />
            </span>
            MeuPetDigital
          </Link>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                {icon ?? <Dog className="h-6 w-6" />}
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-950">{title}</h1>
                <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
              </div>
            </div>
            {children}
            {footer && <div className="mt-6 border-t border-slate-100 pt-5">{footer}</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
