'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutGrid, 
  Box, 
  Stethoscope, 
  Calendar,
  Video,
  Wallet,
  Users,
  Settings,
  Building2
} from 'lucide-react';

const menuItems = [
  { name: 'Painel Geral', href: '/admin', icon: LayoutGrid },
  { name: 'Gestão de Serviços', href: '/admin/cadastros/valores', icon: Box },
  { name: 'Profissionais', href: '/admin/cadastros/medicos', icon: Stethoscope },
  { name: 'Agenda', href: '/admin/agendamentos', icon: Calendar },
  { name: 'Atendimento Digital', href: '/admin/atendimento-digital', icon: Video },
  { name: 'Financeiro', href: '/admin/financeiro', icon: Wallet },
  { name: 'Pacientes', href: '/admin/pacientes', icon: Users },
  { name: 'Configurações', href: '/admin/configuracoes', icon: Settings },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onNavigate }) => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-slate-100">
      {/* Header da Sidebar (Logo + Título do Figma) */}
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#2B59FF] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2B59FF]/20">
            <Building2 className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#0F172A] leading-tight">Painel da Clínica</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Gestão Completa</p>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto py-6">
        <div className="p-4">
          <h2 className="text-sm font-bold text-[#0F172A] mb-6 px-3">
            Módulos
          </h2>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                (item.href === '/admin' && pathname === '/admin');

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all group ${
                    isActive
                      ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#2B59FF]'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#2B59FF]'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer with Logo/Avatar */}
      <div className="p-4 border-t border-slate-100">
        <div className="w-10 h-10 bg-gradient-to-br from-[#2B59FF] to-[#1a44cc] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#2B59FF]/20">
          <span className="text-white font-bold text-lg">A</span>
        </div>
      </div>
    </aside>
  );
};
