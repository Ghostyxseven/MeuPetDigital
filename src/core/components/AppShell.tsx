"use client";

import { useRouter } from "next/navigation";
import { Header } from "./Header";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className = "" }: AppShellProps) {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Header user={user} onLogout={handleLogout} />
      <div className={`pb-24 md:pb-0 ${className}`}>{children}</div>
    </div>
  );
}
