'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { MetricCard } from '@/components/admin/MetricCard';
import { 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  MoreVertical
} from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const hours = ['8:00', '9:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const days = [
  { name: 'Segunda', date: '15/11' },
  { name: 'Terça', date: '16/11' },
  { name: 'Quarta', date: '17/11' },
  { name: 'Quinta', date: '18/11' },
  { name: 'Sexta', date: '19/11' },
  { name: 'Sábado', date: '20/11' },
];

const dailyAppointments = [
  { id: 1, patient: 'Maria Silva', time: '08:00', type: 'Consulta Cardiologia', doctor: 'Dr. João Santos', status: 'Confirmada' },
  { id: 2, patient: 'Carlos Oliveira', time: '08:00', type: 'Consulta Dermatologia', doctor: 'Dra. Ana Costa', status: 'Pendente' },
  { id: 3, patient: 'Beatriz Lima', time: '08:00', type: 'Consulta Ortopedia', doctor: 'Dr. Paulo Mendes', status: 'Confirmada' },
  { id: 4, patient: 'Roberto Costa', time: '08:00', type: 'Consulta Pediatria', doctor: 'Dra. Fernanda Silva', status: 'Confirmada' },
];

export default function AgendaPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Hoje"
            value="4"
            icon={CalendarIcon}
            iconColor="#2B59FF"
          />
          <MetricCard
            title="Confirmadas"
            value="3"
            icon={CheckCircle2}
            iconColor="#10B981"
          />
          <MetricCard
            title="Pendentes"
            value="1"
            icon={Clock}
            iconColor="#F59E0B"
          />
          <MetricCard
            title="Esta Semana"
            value="5"
            icon={CalendarIcon}
            iconColor="#8B5CF6"
          />
        </div>

        {/* Calendar Grid Header */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Agenda</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <select className="appearance-none bg-slate-50 border border-slate-100 rounded-2xl pl-4 pr-10 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF] transition-all cursor-pointer">
                  <option>Todos profissionais</option>
                  <option>Dr. João Santos</option>
                  <option>Dra. Ana Costa</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
              <button className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
                Visão Mensal
              </button>
              <button className="flex items-center gap-2 bg-[#2B59FF] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#1a44cc] transition-all shadow-lg shadow-[#2B59FF]/20">
                <Plus className="w-5 h-5" />
                Novo Agendamento
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
              <ChevronLeft className="w-4 h-4" />
              Semana Anterior
            </button>
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">15 - 21 Novembro 2024</h3>
              <p className="text-sm text-slate-400 font-medium">Semana 46</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all">
              Próxima Semana
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekly Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-[100px_repeat(6,1fr)] mb-4">
                <div />
                {days.map((day) => (
                  <div key={day.name} className="text-center p-4 bg-blue-50/50 rounded-2xl mx-1 border border-blue-100/50">
                    <p className="text-sm font-bold text-[#2B59FF]">{day.name}</p>
                    <p className="text-xs text-[#2B59FF]/60 font-medium">{day.date}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {hours.map((hour) => (
                  <div key={hour} className="grid grid-cols-[100px_repeat(6,1fr)] min-h-[80px]">
                    <div className="flex items-start justify-center pt-2 text-sm font-bold text-slate-400">
                      {hour}
                    </div>
                    {days.map((day, idx) => (
                      <div key={idx} className="border border-slate-50 rounded-2xl mx-1 relative bg-slate-50/20">
                        {hour === '14:00' && day.name === 'Segunda' && (
                          <div className="absolute inset-1 bg-blue-50 border border-blue-200 rounded-xl p-2 shadow-sm overflow-hidden group cursor-pointer hover:shadow-md transition-all">
                            <p className="text-[10px] font-black text-[#2B59FF] truncate uppercase">Roberto C...</p>
                            <p className="text-[10px] text-[#2B59FF]/70 truncate font-medium">Consulta P...</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Agendamentos de Hoje */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Agendamentos de Hoje</h3>
          <div className="space-y-4">
            {dailyAppointments.map((app) => (
              <div key={app.id} className="flex items-center gap-4 p-4 bg-slate-50/50 border border-slate-100 rounded-[2rem] hover:border-[#2B59FF]/30 transition-all group">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-[#2B59FF] shadow-sm">
                  <span className="text-xs font-bold">{app.time}</span>
                  <Clock className="w-4 h-4 mt-1" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900">{app.patient}</h4>
                  <p className="text-xs text-slate-500 font-medium">{app.type}</p>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-wider">{app.doctor}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                    app.status === 'Confirmada' 
                      ? 'bg-blue-50 text-[#2B59FF] border border-blue-100' 
                      : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {app.status}
                  </span>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 hover:bg-slate-50 transition-all">
                      Confirmar
                    </button>
                    <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-900 hover:bg-slate-50 transition-all">
                      Reagendar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
  );
}
