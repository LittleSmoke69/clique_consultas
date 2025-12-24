'use client';

import React from 'react';
import { ShieldPlus, User, Menu, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth';

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar, sidebarOpen = true }) => {
  const router = useRouter();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 h-20 flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-40 shadow-sm transition-all duration-300">
      {/* Logo e Título */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Desktop Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="hidden lg:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-[#2B59FF] transition-all hover:scale-105 active:scale-95 mr-2"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        
        <div className="w-10 h-10 bg-[#2B59FF] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2B59FF]/20">
          <ShieldPlus className="text-white w-5 h-5 lg:w-6 lg:h-6" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-base lg:text-lg font-bold text-[#2B59FF]">Painel Administrativo</h1>
          <p className="text-xs text-slate-500">Gestão completa do sistema</p>
        </div>
      </div>

      {/* Botão do Administrador */}
      <button
        onClick={async () => {
          await signOut();
          router.replace('/login');
        }}
        className="flex items-center gap-2 bg-[#2B59FF] text-white px-3 lg:px-4 py-2 lg:py-2.5 rounded-xl hover:bg-[#1a44cc] transition-all font-bold text-xs lg:text-sm shadow-lg shadow-[#2B59FF]/20 hover:scale-105 active:scale-95"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">Sair</span>
      </button>
    </header>
  );
};

