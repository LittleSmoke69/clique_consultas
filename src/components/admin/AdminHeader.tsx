'use client';

import React from 'react';
import { Building2, User, Menu, X, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar, sidebarOpen = true }) => {
  const router = useRouter();

  return (
    <header className="h-20 flex items-center justify-between px-4 lg:px-8 fixed top-0 left-0 right-0 z-20 transition-all duration-300 pointer-events-none">
      {/* Lado Esquerdo - Vazio para dar espaço à Sidebar */}
      <div className="flex-1" />

      {/* Botão da Clínica/Usuário - Ativa pointer-events aqui */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <button
          onClick={async () => {
            if (confirm('Deseja realmente sair?')) {
              await signOut();
              router.replace('/login');
            }
          }}
          className="flex items-center gap-2 bg-[#2B59FF] text-white px-5 py-2.5 rounded-2xl hover:bg-[#1a44cc] transition-all font-bold text-sm shadow-lg shadow-[#2B59FF]/20"
        >
          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-white" />
          </div>
          <span>Clínica Bem Estar</span>
        </button>
      </div>
    </header>
  );
};
