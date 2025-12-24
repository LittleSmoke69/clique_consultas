'use client';

import React, { useMemo, useState, Suspense } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  ChevronLeft,
  Phone,
  ArrowRight
} from 'lucide-react';
import { signUpWithRole, signInWithPassword } from '@/lib/auth';

function RegisterContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialType = useMemo(() => {
    const t = searchParams.get('type');
    return t === 'parceiro' ? 'parceiro' : 'paciente';
  }, [searchParams]);

  const [userType, setUserType] = useState<'paciente' | 'parceiro'>(initialType);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleRegister() {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);

      // Validações básicas
      const trimmedEmail = email.trim();
      if (!trimmedEmail) {
        setError('Por favor, informe seu e-mail.');
        return;
      }

      // Validação de formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        setError('Por favor, informe um e-mail válido.');
        return;
      }

      if (!password || password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      if (!fullName.trim()) {
        setError('Por favor, informe seu nome completo.');
        return;
      }

      const role: 'paciente' | 'parceiro' = userType === 'paciente' ? 'paciente' : 'parceiro';
      
      // Prepara os dados, convertendo strings vazias para undefined
      const payload = {
        email: email.trim(),
        password,
        fullName: fullName.trim() || undefined,
        phone: phone.trim() || undefined,
        role,
      };

      const { data, error: signUpError } = await signUpWithRole(payload);

      if (signUpError) {
        // Mensagens de erro mais específicas
        let errorMessage = 'Falha ao cadastrar. Verifique os dados e tente novamente.';
        
        const errorMsg = signUpError.message?.toLowerCase() || '';
        const errorStatus = signUpError.status || 0;
        
        if (errorMsg.includes('already registered') || errorMsg.includes('already exists') || errorMsg.includes('user already')) {
          errorMessage = 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.';
        } else if (errorMsg.includes('password') || errorMsg.includes('weak password')) {
          errorMessage = 'A senha não atende aos requisitos mínimos. Use pelo menos 6 caracteres.';
        } else if (errorMsg.includes('email') || errorMsg.includes('invalid email')) {
          errorMessage = 'E-mail inválido. Verifique o formato e tente novamente.';
        } else if (errorStatus === 400) {
          errorMessage = `Erro na validação: ${errorMsg || 'Verifique todos os campos e tente novamente.'}`;
        } else if (signUpError.message) {
          errorMessage = signUpError.message;
        }
        
        setError(errorMessage);
        return;
      }

      // Para parceiros: login imediato sem confirmação de email (MVP)
      if (role === 'parceiro') {
        // Se já veio sessão no signup, redireciona
        if (data.session) {
          router.replace('/');
          return;
        }
        
        // Se não veio sessão, faz login automático após um pequeno delay
        // (permite que o Supabase processe o cadastro)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const { data: signInData, error: signInError } = await signInWithPassword(trimmedEmail, password);
        
        if (signInError) {
          // Se o login falhar, pode ser que a conta ainda esteja sendo processada
          // Tenta mais uma vez após um delay maior
          await new Promise(resolve => setTimeout(resolve, 1000));
          const { data: retryData, error: retryError } = await signInWithPassword(trimmedEmail, password);
          
          if (retryError) {
            setError('Conta criada com sucesso! Por favor, faça login manualmente.');
            router.push('/login');
            return;
          }
          
          if (retryData.session) {
            router.replace('/');
            return;
          }
        } else if (signInData.session) {
          router.replace('/');
          return;
        }
      }

      // Para pacientes: mantém o fluxo de confirmação de email
      if (!data.session) {
        setSuccess('Cadastro criado! Verifique seu e-mail para confirmar e depois faça login.');
        return;
      }

      router.replace('/');
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao cadastrar. Verifique os dados e tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] lg:bg-[#2B59FF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo (visíveis apenas em telas grandes) */}
      <div className="hidden lg:block absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="hidden lg:block absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-2xl" />
      
      <Link 
        href="/login" 
        className="absolute top-8 left-8 text-slate-600 lg:text-white/80 hover:text-[#2B59FF] lg:hover:text-white flex items-center gap-2 font-bold transition-colors group z-20"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Voltar para o login
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-[600px] z-10"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Lado Esquerdo - Info (Opcional, mas dá um toque premium) */}
            <div className="w-full p-8 lg:p-12">
              <div className="text-center lg:text-left mb-8">
                <div className="inline-flex w-12 h-12 bg-[#2B59FF]/10 rounded-xl items-center justify-center mb-4">
                  <ShieldCheck className="text-[#2B59FF] w-6 h-6" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                  Comece agora <br className="hidden lg:block" />
                  sua jornada de <span className="text-[#2B59FF]">saúde</span>
                </h1>
                <p className="text-slate-500 font-medium">Escolha seu perfil e preencha os dados abaixo.</p>
              </div>

              {/* Toggle de Tipo de Usuário */}
              <div className="flex p-1 bg-slate-100 rounded-2xl mb-8">
                <button 
                  onClick={() => setUserType('paciente')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    userType === 'paciente' ? 'bg-white text-[#2B59FF] shadow-sm' : 'text-slate-500 hover:text-[#2B59FF]'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Sou Paciente
                </button>
                <button 
                  onClick={() => setUserType('parceiro')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                    userType === 'parceiro' ? 'bg-white text-[#10B981] shadow-sm' : 'text-slate-500 hover:text-[#10B981]'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Sou Parceiro
                </button>
              </div>

              {/* Formulário de Registro */}
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleRegister();
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Nome completo</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B59FF] transition-colors" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Telefone / WhatsApp</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B59FF] transition-colors" />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>
                </div>

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
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Crie uma senha</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#2B59FF] transition-colors" />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl px-4 py-3 text-sm font-bold">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl px-4 py-3 text-sm font-bold">
                    {success}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !email || !password || !fullName}
                    className={`w-full flex items-center justify-center gap-2 text-white py-4 rounded-2xl font-bold shadow-lg transition-all group disabled:opacity-60 disabled:cursor-not-allowed ${
                    userType === 'paciente' 
                      ? 'bg-[#2B59FF] shadow-[#2B59FF]/20 hover:bg-blue-600' 
                      : 'bg-[#10B981] shadow-[#10B981]/20 hover:bg-[#0D9668]'
                  }`}
                  >
                    {loading ? 'Criando…' : userType === 'paciente' ? 'Criar minha conta gratuita' : 'Cadastrar minha clínica'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <p className="text-center text-xs text-slate-400 font-medium mt-6 px-4">
                  Ao se cadastrar, você concorda com nossos <Link href="#" className="text-[#2B59FF] underline">Termos de Uso</Link> e <Link href="#" className="text-[#2B59FF] underline">Política de Privacidade</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-400 lg:text-white/60 text-sm font-medium">
          Já tem uma conta? <Link href="/login" className="text-[#2B59FF] lg:text-white font-bold hover:underline">Faça login</Link>
        </p>
      </motion.div>
    </main>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F8FAFC] lg:bg-[#2B59FF] flex items-center justify-center p-4">
        <div className="w-full max-w-[600px]">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-12 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </main>
    }>
      <RegisterContent />
    </Suspense>
  );
}

