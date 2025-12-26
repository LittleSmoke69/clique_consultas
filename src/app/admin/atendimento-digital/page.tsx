'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Video } from 'lucide-react';

export default function AtendimentoDigitalPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Video className="w-10 h-10 text-[#2B59FF]" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Atendimento Digital</h2>
      <p className="text-slate-500 mt-2 max-w-md">
        Módulo de teleconsultas e atendimento remoto em desenvolvimento.
      </p>
    </div>
  );
}

