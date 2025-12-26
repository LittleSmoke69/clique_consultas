'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyProfile, getSession, signOut } from '@/lib/auth';

// Estado global para evitar flickering entre trocas de layout
let isVerifiedGlobal = false;
let verifiedRoleGlobal: string | null = null;

interface RequireAdminProps {
  children: React.ReactNode;
}

export const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(isVerifiedGlobal);
  const [loading, setLoading] = useState(!isVerifiedGlobal);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        // Se já verificamos globalmente, apenas marcamos como permitido
        if (isVerifiedGlobal && (verifiedRoleGlobal === 'admin' || verifiedRoleGlobal === 'parceiro')) {
          setAllowed(true);
          setLoading(false);
          return;
        }

        const { data, error } = await getSession();
        if (error) throw error;

        if (!data.session?.user) {
          router.replace('/login');
          return;
        }

        const { profile, error: profileError } = await getMyProfile();
        if (profileError) throw profileError;

        if (!profile || (profile.role !== 'admin' && profile.role !== 'parceiro')) {
          console.warn('DEBUG: Acesso negado. Role:', profile?.role);
          await signOut();
          router.replace('/login');
          return;
        }

        // Sucesso: Atualiza estados locais e globais
        isVerifiedGlobal = true;
        verifiedRoleGlobal = profile.role;
        
        if (!cancelled) {
          setAllowed(true);
          setLoading(false);
        }
      } catch {
        router.replace('/login');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  // Se já está permitido, renderiza imediatamente sem mostrar o splash de loading
  if (allowed) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <p className="text-slate-700 font-bold">Verificando acesso…</p>
          <p className="text-slate-500 text-sm mt-1">Aguarde um instante.</p>
        </div>
      </div>
    );
  }

  return null;
};


