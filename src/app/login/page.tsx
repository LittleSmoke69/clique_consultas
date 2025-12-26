'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { getMyProfile, signInWithPassword, signOut } from '@/lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<'admin' | 'paciente' | 'parceiro' | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(expectedRole: 'admin' | 'paciente' | 'parceiro') {
    try {
      setError(null);
      setLoadingRole(expectedRole);

      console.log('DEBUG: Iniciando login para:', { email, expectedRole });

      const { data: signInData, error: signInError } = await signInWithPassword(email.trim(), password);
      
      if (signInError) {
        console.error('DEBUG: Erro no signIn:', signInError);
        throw signInError;
      }

      console.log('DEBUG: Login Auth OK, buscando perfil...');

      const { profile, error: profileError } = await getMyProfile();
      
      if (profileError) {
        console.error('DEBUG: Erro ao buscar perfil:', profileError);
        throw profileError;
      }

      console.log('DEBUG: Perfil encontrado:', profile);

      if (!profile?.role) {
        console.warn('DEBUG: Perfil sem role ou não encontrado na tabela clique_profiles');
        await signOut();
        throw new Error('Perfil de usuário não encontrado na base de dados. Verifique se o cadastro foi concluído.');
      }

      if (profile.role !== expectedRole) {
        console.warn('DEBUG: Role incompatível:', { atual: profile.role, esperada: expectedRole });
        await signOut();
        throw new Error(`Seu perfil é de ${profile.role}, mas você tentou entrar como ${expectedRole}.`);
      }

      // Redirecionamento dinâmico baseado na role
      const targetPath = profile.role === 'admin' ? '/admin' : profile.role === 'parceiro' ? '/dashboard' : '/';
      console.log('DEBUG: Login sucesso! Redirecionando para:', targetPath);
      
      router.replace(targetPath);
    } catch (e: any) {
      console.error('DEBUG: Exceção no handleLogin:', e);
      setError(e?.message ?? 'Falha ao entrar. Verifique suas credenciais.');
    } finally {
      setLoadingRole(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#2B59FF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo para seguir o estilo do sistema */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-2xl" />
      
      <Link 
        href="/" 
        className="absolute top-8 left-8 text-white/80 hover:text-white flex items-center gap-2 font-bold transition-colors group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para o site
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 lg:p-12">
          {/* Header do Card */}
          <div className="text-center mb-10">
            <div className="inline-flex w-16 h-16 bg-[#2B59FF] rounded-2xl items-center justify-center mb-6 shadow-lg shadow-[#2B59FF]/20">
              <ShieldCheck className="text-white w-10 h-10" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Consulta & Benefícios <span className="text-[#2B59FF]">Online</span>
            </h1>
            <p className="text-slate-500 font-medium">Acesse sua conta para continuar</p>
          </div>

          {/* Formulário */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B59FF] transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Senha</label>
                <Link href="#" className="text-xs font-bold text-[#2B59FF] hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B59FF] transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl px-4 py-3 text-sm font-bold">
                {error}
              </div>
            )}

            {/* Botões de Ação por Perfil */}
            <div className="pt-4 space-y-3">
              <button
                type="button"
                disabled={!email || !password || loadingRole !== null}
                onClick={() => handleLogin('admin')}
                className="w-full flex items-center justify-center gap-3 bg-[#2B59FF]/10 text-[#2B59FF] py-4 rounded-2xl font-bold hover:bg-[#2B59FF] hover:text-white transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShieldCheck className="w-5 h-5" />
                {loadingRole === 'admin' ? 'Entrando…' : 'Entrar como Administrador'}
              </button>
              
              <button
                type="button"
                disabled={!email || !password || loadingRole !== null}
                onClick={() => handleLogin('paciente')}
                className="w-full flex items-center justify-center gap-3 bg-[#2B59FF] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#2B59FF]/20 hover:bg-blue-600 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <User className="w-5 h-5" />
                {loadingRole === 'paciente' ? 'Entrando…' : 'Entrar como Paciente'}
              </button>

              <button
                type="button"
                disabled={!email || !password || loadingRole !== null}
                onClick={() => handleLogin('parceiro')}
                className="w-full flex items-center justify-center gap-3 bg-[#10B981] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#10B981]/20 hover:bg-[#0D9668] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Building2 className="w-5 h-5" />
                {loadingRole === 'parceiro' ? 'Entrando…' : 'Entrar como Parceiro'}
              </button>
            </div>
          </form>

          {/* Footer do Card */}
          <div className="mt-10">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">ou</span>
              </div>
            </div>

            <div className="text-center space-y-6">
              <p className="text-slate-500 font-medium">Ainda não tem uma conta?</p>
              <Link 
                href="/register" 
                className="inline-flex w-full items-center justify-center border-2 border-slate-100 text-[#2B59FF] py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Criar conta gratuita
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-white/60 text-sm font-medium">
          © 2025 Consulta & Benefícios Online. Todos os direitos reservados.
        </p>
      </motion.div>
    </main>
  );
}

