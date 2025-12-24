'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyProfile, getSession, signOut } from '@/lib/auth';

interface RequireAdminProps {
  children: React.ReactNode;
}

export const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);

        const { data, error } = await getSession();
        if (error) throw error;

        if (!data.session?.user) {
          router.replace('/login');
          return;
        }

        const { profile, error: profileError } = await getMyProfile();
        if (profileError) throw profileError;

        if (!profile || profile.role !== 'admin') {
          await signOut();
          router.replace('/login');
          return;
        }

        if (!cancelled) setAllowed(true);
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

  if (!allowed) return null;
  return <>{children}</>;
};


