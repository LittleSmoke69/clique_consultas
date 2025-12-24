'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  DollarSign, 
  Users, 
  Building2,
  Stethoscope,
  BadgeDollarSign,
  Package, 
  CreditCard, 
  Gift, 
  FileText, 
  Settings 
} from 'lucide-react';

const menuItems = [
  { name: 'Painel Geral', href: '/admin', icon: LayoutDashboard },
  { name: 'Cadastros (Unidades)', href: '/admin/cadastros/unidades', icon: Building2 },
  { name: 'Cadastros (Médicos)', href: '/admin/cadastros/medicos', icon: Stethoscope },
  { name: 'Valores de Serviços', href: '/admin/cadastros/valores', icon: BadgeDollarSign },
  { name: 'Financeiro', href: '/admin/financeiro', icon: DollarSign },
  { name: 'Usuários', href: '/admin/usuarios', icon: Users },
  { name: 'Planos', href: '/admin/planos', icon: Package },
  { name: 'Cartões', href: '/admin/cartoes', icon: CreditCard },
  { name: 'Indicações', href: '/admin/indicacoes', icon: Gift },
  { name: 'Relatórios', href: '/admin/relatorios', icon: FileText },
  { name: 'Configurações', href: '/admin/configuracoes', icon: Settings },
];

interface AdminSidebarProps {
  onNavigate?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onNavigate }) => {
  const pathname = usePathname();

  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-slate-100">
      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto pt-20">
        <div className="p-4">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-3">
            MÓDULOS
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
                  onClick={() => {
                    // Close mobile menu on navigation
                    onNavigate?.();
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all group ${
                    isActive
                      ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#2B59FF] hover:shadow-sm'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#2B59FF]'}`} />
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

