'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Users } from 'lucide-react';

export default function PacientesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <Users className="w-10 h-10 text-[#2B59FF]" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Gestão de Pacientes</h2>
      <p className="text-slate-500 mt-2 max-w-md">
        Módulo de prontuários e histórico de pacientes em desenvolvimento.
      </p>
    </div>
  );
}

