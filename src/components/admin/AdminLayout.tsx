'use client';

import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';
import { Menu, X } from 'lucide-react';
import { RequireAdmin } from './RequireAdmin';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <RequireAdmin>
      <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden">
      {/* Elementos decorativos de fundo no estilo da LP */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#2B59FF]/5 -z-10 rounded-l-[100px] hidden lg:block" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2B59FF]/5 rounded-full -ml-48 -mb-48 blur-3xl -z-10" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#2B59FF]/3 rounded-full -mr-32 blur-2xl -z-10" />

      {/* Sidebar - Controlled by state for both mobile and desktop */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-30 transform transition-transform duration-300 shadow-xl lg:shadow-lg border-r border-slate-100 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar onNavigate={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area - Always visible, adjusts position based on sidebar */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed top-6 left-4 z-50 bg-[#2B59FF] text-white p-3 rounded-xl shadow-lg shadow-[#2B59FF]/30 hover:bg-[#1a44cc] transition-all hover:scale-105 active:scale-95"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Sidebar Overlay - Only on mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-20 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="pt-20 p-4 lg:p-6 relative z-10">
          {children}
        </main>
      </div>
      </div>
    </RequireAdmin>
  );
};

