'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User, ShieldPlus, Heart, Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Clínicas & Hospitais', href: '/clinicas' },
    { name: 'Telemedicina', href: '/telemedicina' },
    { name: 'Exames & Laboratórios', href: '/exames' },
    { name: 'Farmácia', href: '/farmacia' },
    { name: 'Cartão Clique+', href: '/cartao', icon: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-8">
          <div className="w-10 h-10 bg-[#2B59FF] rounded-xl flex items-center justify-center">
            <ShieldPlus className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-[#2B59FF] tracking-tight">
            Clique<span className="text-[#2B59FF]">Consultas</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                  isActive 
                    ? 'bg-[#2B59FF] text-white shadow-lg shadow-[#2B59FF]/20' 
                    : 'text-slate-600 hover:text-[#2B59FF] hover:bg-slate-50'
                }`}
              >
                {item.icon && <Calendar className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6 ml-auto">
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-[#2B59FF] transition-colors">
              <Heart className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF4D4D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
            <button className="relative p-2 text-slate-400 hover:text-[#2B59FF] transition-colors">
              <Calendar className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#FF4D4D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">2</span>
            </button>
          </div>

          <Link 
            href="/register?type=parceiro" 
            className="flex items-center gap-2 border-2 border-slate-100 text-[#2B59FF] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all uppercase tracking-wider"
          >
            Seja um parceiro
          </Link>
          
          <Link 
            href="/login"
            className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[#2B59FF] hover:bg-slate-200 transition-all"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 absolute top-20 left-0 right-0 p-4 shadow-xl">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className={`p-4 rounded-xl text-sm font-bold ${
                  pathname === item.href ? 'bg-[#2B59FF] text-white' : 'text-slate-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link 
                href="/login"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-slate-100 text-[#2B59FF] font-bold"
              >
                <User className="w-5 h-5" />
                Entrar na minha conta
              </Link>
              <Link 
                href="/register?type=parceiro"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#2B59FF] text-white font-bold"
              >
                Seja um parceiro
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
