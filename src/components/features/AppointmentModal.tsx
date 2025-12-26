'use client';

import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Calendar, Clock, ShoppingCart, CreditCard, User, Check, ArrowLeft, ArrowRight, Trash2, Wallet, Building2, Award, FileText, Download, Share, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Professional, Specialty, AppointmentItem, PaymentMethod } from '@/types';
import { format, addDays, isSameDay, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  professional: Professional | null;
  specialty?: Specialty | null;
}

type Step = 'details' | 'date' | 'time' | 'cart' | 'payment' | 'data' | 'review' | 'confirmation' | 'success';

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  professional,
  specialty
}) => {
  const [currentStep, setCurrentStep] = useState<Step>('details');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [cart, setCart] = useState<AppointmentItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    email: '',
    phone: ''
  });
  const [protocol, setProtocol] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  // Gerar protocolo único (10 caracteres + número de 2 dígitos)
  const generateProtocol = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let protocol = '';
    for (let i = 0; i < 10; i++) {
      protocol += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    protocol += Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return protocol;
  };

  // Reset quando o modal fecha
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep('details');
      setSelectedDate(null);
      setSelectedTime(null);
      setCart([]);
      setPaymentMethod(null);
      setFormData({ name: '', cpf: '', email: '', phone: '' });
      setProtocol('');
      setConfirmedAppointment(null);
    }
  }, [isOpen]);

  if (!isOpen || !professional) return null;

  // Gerar próximos 7 dias
  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      dates.push(addDays(new Date(), i));
    }
    return dates;
  };

  // Horários disponíveis
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];
  const unavailableTimes = ['10:00', '16:00']; // Simulando horários indisponíveis

  const handleAddToCart = () => {
    if (!selectedDate || !selectedTime || !professional) return;

    const newItem: AppointmentItem = {
      id: `${Date.now()}`,
      appointment_id: '',
      professional_id: professional.id,
      clinic_id: null,
      appointment_date: format(selectedDate, 'yyyy-MM-dd'),
      appointment_time: selectedTime,
      appointment_type: 'presencial',
      price: professional.base_price,
      specialty_id: specialty?.id || null,
      professional,
      specialty
    };

    setCart([newItem]);
    setCurrentStep('cart');
  };

  const handleRemoveFromCart = () => {
    setCart([]);
    setSelectedDate(null);
    setSelectedTime(null);
    setCurrentStep('details');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const renderStep = () => {
    switch (currentStep) {
      case 'details':
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Tag de especialidade */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-100 text-[#2B59FF] text-sm font-bold">
              {specialty?.name || 'Psicologia Clínica'}
            </div>

            {/* Nome e avaliação */}
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  {professional.full_name}
                </h2>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-slate-700">{professional.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-4 h-4" />
                    <span>1,2 km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Valor da consulta */}
            <div className="bg-[#2B59FF] rounded-2xl p-6 text-white">
              <p className="text-sm font-bold mb-2 opacity-90">Valor da consulta</p>
              <p className="text-4xl font-extrabold mb-2">
                R$ {professional.base_price.toFixed(2).replace('.', ',')}
              </p>
              <p className="text-sm opacity-80">Pagamento no local ou online</p>
            </div>

            {/* Informações adicionais */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Award className="w-5 h-5 text-[#2B59FF]" />
                <span>Experiência: 10+ anos</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <MapPin className="w-5 h-5 text-[#2B59FF]" />
                <span>Local de Atendimento: São Paulo, SP</span>
              </div>
            </div>

            {/* O que levar */}
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <h3 className="text-sm font-bold text-[#2B59FF] mb-3">
                O que levar na consulta
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#2B59FF] mt-1">•</span>
                  <span>Documento de identidade com foto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B59FF] mt-1">•</span>
                  <span>Carteirinha do convênio (se houver)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2B59FF] mt-1">•</span>
                  <span>Exames anteriores e relatórios médicos</span>
                </li>
              </ul>
            </div>

            {/* Política de cancelamento */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <h3 className="text-sm font-bold text-amber-900 mb-2">
                Política de Cancelamento
              </h3>
              <p className="text-sm text-amber-800">
                Cancelamentos devem ser feitos com até 24 horas de antecedência. Cancelamentos tardios ou faltas podem resultar em cobrança integral da consulta.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep('date')}
              className="w-full bg-[#2B59FF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a44cc] transition-colors"
            >
              Escolher Data e Horário <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 'date':
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold text-slate-900">Selecione a Data</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {generateDates().map((date) => {
                const isSelected = selectedDate && isSameDay(date, selectedDate);
                return (
                  <button
                    key={date.toISOString()}
                    onClick={() => setSelectedDate(date)}
                    className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl font-bold transition-all ${
                      isSelected
                        ? 'bg-[#2B59FF] text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:border-[#2B59FF]'
                    }`}
                  >
                    <span className="text-xs uppercase">
                      {format(date, 'EEE', { locale: ptBR }).slice(0, 3)}
                    </span>
                    <span className="text-xl">{format(date, 'd')}</span>
                    <span className="text-xs">
                      {format(date, 'MMM', { locale: ptBR }).slice(0, 3)}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <>
                <h3 className="text-lg font-bold text-slate-900 mt-6">Selecione o Horário</h3>
                <div className="grid grid-cols-4 gap-3">
                  {availableTimes.map((time) => {
                    const isUnavailable = unavailableTimes.includes(time);
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        onClick={() => !isUnavailable && setSelectedTime(time)}
                        disabled={isUnavailable}
                        className={`py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                          isSelected
                            ? 'bg-[#2B59FF] text-white'
                            : isUnavailable
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-[#2B59FF]'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setCurrentStep('details')}
                className="flex-1 border-2 border-[#2B59FF] text-[#2B59FF] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handleAddToCart}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 bg-slate-200 text-slate-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-300 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        );

      case 'cart':
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[#2B59FF]" />
              <h3 className="text-lg font-bold text-slate-900">Consultas Agendadas</h3>
              <span className="text-sm text-slate-500">({cart.length} consulta)</span>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2B59FF] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900">{item.professional?.full_name}</h4>
                    <p className="text-sm text-slate-500">{specialty?.name || 'Psicologia Clínica'}</p>
                    <div className="mt-3 space-y-1 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{format(parseISO(item.appointment_date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{item.appointment_time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Consulta Presencial</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveFromCart}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-700">Valor da consulta:</span>
                  <span className="text-lg font-bold text-[#2B59FF]">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}

            <button
              onClick={handleRemoveFromCart}
              className="w-full border border-red-200 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Limpar carrinho
            </button>

            <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
              <h4 className="text-lg font-bold text-[#2B59FF]">Resumo do agendamento</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Subtotal ({cart.length} consulta)</span>
                <span className="font-bold text-slate-900">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-extrabold text-[#2B59FF]">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="text-sm text-[#2B59FF]">
                <span className="font-bold">Importante:</span> Chegue com 15 minutos de antecedência e leve documento com foto.
              </p>
            </div>

            <button
              onClick={() => setCurrentStep('payment')}
              className="w-full bg-[#2B59FF] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1a44cc] transition-colors"
            >
              Continuar para pagamento <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Finalizar Agendamento</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2B59FF] hover:bg-blue-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              {['Pagamento', 'Dados', 'Revisão'].map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === 1;
                const isCompleted = false;
                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-full h-1 rounded-full mb-2 ${isActive || isCompleted ? 'bg-[#2B59FF]' : 'bg-slate-200'}`} />
                      <span className={`text-sm font-bold ${isActive ? 'text-[#2B59FF]' : 'text-slate-400'}`}>
                        {step}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <h4 className="text-lg font-bold text-[#2B59FF] mb-4">Selecione a forma de pagamento</h4>

            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod('pix')}
                className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                  paymentMethod === 'pix'
                    ? 'border-[#2B59FF] bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-[#2B59FF]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'pix' ? 'border-[#2B59FF]' : 'border-slate-300'
                  }`}>
                    {paymentMethod === 'pix' && <div className="w-3 h-3 bg-[#2B59FF] rounded-full" />}
                  </div>
                  <CreditCard className="w-6 h-6 text-[#2B59FF]" />
                  <div>
                    <p className="font-bold text-slate-900">Pix</p>
                    <p className="text-sm text-slate-500">Pagamento instantâneo</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('credit_card')}
                className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                  paymentMethod === 'credit_card'
                    ? 'border-[#2B59FF] bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-[#2B59FF]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'credit_card' ? 'border-[#2B59FF]' : 'border-slate-300'
                  }`}>
                    {paymentMethod === 'credit_card' && <div className="w-3 h-3 bg-[#2B59FF] rounded-full" />}
                  </div>
                  <CreditCard className="w-6 h-6 text-[#2B59FF]" />
                  <div>
                    <p className="font-bold text-slate-900">Visa •••• 1234</p>
                    <p className="text-sm text-slate-500">Crédito</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod('clique_plus')}
                className={`w-full p-5 rounded-2xl border-2 transition-all text-left ${
                  paymentMethod === 'clique_plus'
                    ? 'border-[#2B59FF] bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-[#2B59FF]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'clique_plus' ? 'border-[#2B59FF]' : 'border-slate-300'
                  }`}>
                    {paymentMethod === 'clique_plus' && <div className="w-3 h-3 bg-[#2B59FF] rounded-full" />}
                  </div>
                  <CreditCard className="w-6 h-6 text-[#2B59FF]" />
                  <div className="flex-1">
                    <p className="font-bold text-slate-900">Cartão Clique+</p>
                    <p className="text-sm text-green-600 font-bold">5% de desconto</p>
                  </div>
                </div>
              </button>
            </div>

            <button className="w-full border-2 border-blue-200 text-[#2B59FF] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
              + Adicionar novo cartão
            </button>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setCurrentStep('cart')}
                className="flex-1 border-2 border-[#2B59FF] text-[#2B59FF] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <button
                onClick={() => setCurrentStep('data')}
                disabled={!paymentMethod}
                className="flex-1 bg-[#2B59FF] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a44cc] transition-colors"
              >
                Continuar <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Finalizar Agendamento</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2B59FF] hover:bg-blue-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              {['Pagamento', 'Dados', 'Revisão'].map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === 2;
                const isCompleted = stepNumber < 2;
                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-full h-1 rounded-full mb-2 ${isActive || isCompleted ? 'bg-[#2B59FF]' : 'bg-slate-200'}`} />
                      <span className={`text-sm font-bold ${isActive ? 'text-[#2B59FF]' : isCompleted ? 'text-slate-400' : 'text-slate-300'}`}>
                        {step}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Seu nome completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2B59FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  CPF
                </label>
                <input
                  type="text"
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2B59FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2B59FF]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-[#2B59FF]"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="text-sm text-[#2B59FF]">
                <span className="font-bold">Importante:</span> Estes dados serão utilizados para enviar a confirmação da consulta.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setCurrentStep('payment')}
                className="flex-1 border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <button
                onClick={() => setCurrentStep('review')}
                disabled={!formData.name || !formData.email || !formData.cpf || !formData.phone}
                className="flex-1 bg-[#2B59FF] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1a44cc] transition-colors"
              >
                Continuar <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">Finalizar Agendamento</h3>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#2B59FF] hover:bg-blue-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              {['Pagamento', 'Dados', 'Revisão'].map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === 3;
                const isCompleted = stepNumber < 3;
                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-full h-1 rounded-full mb-2 ${isActive || isCompleted ? 'bg-[#2B59FF]' : 'bg-slate-200'}`} />
                      <span className={`text-sm font-bold ${isActive ? 'text-[#2B59FF]' : isCompleted ? 'text-slate-400' : 'text-slate-300'}`}>
                        {step}
                      </span>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            <h4 className="text-lg font-bold text-[#2B59FF] mb-4">Revise seu agendamento</h4>

            {/* Payment Method */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wallet className="w-5 h-5 text-[#2B59FF]" />
                  <div>
                    <p className="text-sm text-slate-500">Forma de pagamento</p>
                    <p className="font-bold text-slate-900 capitalize">{paymentMethod}</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentStep('payment')}
                  className="text-sm font-bold text-[#2B59FF] hover:underline"
                >
                  Alterar
                </button>
              </div>
            </div>

            {/* Appointments */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h5 className="text-sm font-bold text-[#2B59FF] mb-4">Consultas agendadas</h5>
              {cart.map((item) => (
                <div key={item.id} className="border-t border-slate-100 pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0">
                  <p className="font-bold text-slate-900">{item.professional?.full_name}</p>
                  <p className="text-sm text-slate-500 mb-3">{specialty?.name || 'Psicologia Clínica'}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{format(parseISO(item.appointment_date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{item.appointment_time}</span>
                    </div>
                    <span className="text-lg font-bold text-[#2B59FF]">
                      R$ {item.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do pagamento */}
            <div className="bg-slate-50 rounded-2xl p-5">
              <h5 className="text-sm font-bold text-slate-700 mb-3">Resumo do Pagamento</h5>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">Total (1 consulta)</span>
                <span className="text-sm font-bold text-slate-900">R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-lg font-bold text-slate-900">Total a pagar</span>
                <span className="text-xl font-extrabold text-[#2B59FF]">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Lembrete */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <span className="font-bold">Lembre-se:</span> Chegue com 15 minutos de antecedência e leve documento com foto.
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setCurrentStep('data')}
                className="flex-1 border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Voltar
              </button>
              <button
                onClick={async () => {
                  setLoading(true);
                  try {
                    const response = await fetch('/api/appointments', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        patient_name: formData.name,
                        patient_email: formData.email,
                        patient_phone: formData.phone,
                        patient_cpf: formData.cpf,
                        payment_method: paymentMethod,
                        payment_status: 'paid', // Simulando pagamento confirmado (protótipo)
                        status: 'confirmed',
                        items: cart.map(item => ({
                          professional_id: item.professional_id,
                          clinic_id: item.clinic_id,
                          appointment_date: item.appointment_date,
                          appointment_time: item.appointment_time,
                          appointment_type: item.appointment_type,
                          price: item.price,
                          specialty_id: item.specialty_id
                        }))
                      })
                    });

                    const data = await response.json();

                    if (response.ok) {
                      const newProtocol = generateProtocol();
                      setProtocol(newProtocol);
                      setConfirmedAppointment(data.appointment);
                      setCurrentStep('success');
                    } else {
                      throw new Error(data.error || 'Erro ao confirmar agendamento');
                    }
                  } catch (error: any) {
                    console.error(error);
                    alert(`Erro ao confirmar agendamento: ${error.message || 'Tente novamente.'}`);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
              >
                {loading ? (
                  <>Carregando...</>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Confirmar Agendamento
                  </>
                )}
              </button>
            </div>
          </div>
        );

      case 'success':
        return (
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* Header de Sucesso */}
            <div className="bg-green-500 rounded-t-[2.5rem] p-8 text-white text-center relative -mx-8 md:-mx-10 -mt-6 mb-6">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Agendamento Confirmado!</h2>
              <p className="text-green-50">Suas consultas foram agendadas com sucesso</p>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Protocolo e QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Protocolo */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-center">
                <FileText className="w-8 h-8 text-[#2B59FF] mx-auto mb-3" />
                <h3 className="text-lg font-bold text-[#2B59FF] mb-4">Protocolo</h3>
                <div className="bg-blue-50 rounded-xl p-6 mb-4">
                  <p className="text-3xl font-extrabold text-[#2B59FF] tracking-wider">
                    {protocol.slice(0, 10)}
                  </p>
                  <p className="text-2xl font-extrabold text-[#2B59FF] tracking-wider mt-1">
                    {protocol.slice(10)}
                  </p>
                </div>
                <p className="text-sm text-slate-600">
                  Guarde este número para acompanhar seus agendamentos
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white border-2 border-slate-200 rounded-2xl p-6 text-center">
                <h3 className="text-lg font-bold text-[#2B59FF] mb-4">QR Code</h3>
                <div className="bg-slate-50 rounded-xl p-8 mb-4 flex items-center justify-center">
                  <div className="w-48 h-48 bg-white border-4 border-slate-900 rounded flex items-center justify-center p-2">
                    {/* QR Code placeholder - em produção, usar biblioteca como qrcode.react */}
                    {/* Usando protocolo como seed para gerar padrão consistente */}
                    {(() => {
                      const seed = protocol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                      return (
                        <div className="grid grid-cols-8 gap-0.5">
                          {Array.from({ length: 64 }).map((_, i) => {
                            const value = (seed + i) % 3;
                            return (
                              <div
                                key={i}
                                className={`w-5 h-5 ${
                                  value === 0 ? 'bg-slate-900' : 'bg-white'
                                }`}
                              />
                            );
                          })}
                        </div>
                      );
                    })()}
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Apresente este código no consultório
                </p>
              </div>
            </div>

            {/* Informações Importantes */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-amber-700" />
                <h3 className="text-lg font-bold text-amber-900">Informações Importantes</h3>
              </div>
              <ul className="space-y-3 text-sm text-amber-800">
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Leve documento de identificação com foto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Chegue com 15 minutos de antecedência</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Leve exames anteriores e relatórios médicos se houver</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Para telemedicina, acesse o link que será enviado por e-mail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span>Cancelamentos devem ser feitos com até 24h de antecedência</span>
                </li>
              </ul>
            </div>

            {/* Resumo do Pagamento */}
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Resumo do Pagamento</h3>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                  Pago
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">1 consulta</span>
                <span className="text-sm font-bold text-slate-900">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-lg font-bold text-slate-900">Total Pago</span>
                <span className="text-2xl font-extrabold text-[#2B59FF]">
                  R$ {totalAmount.toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3 mt-6">
                <button className="flex-1 border-2 border-[#2B59FF] text-[#2B59FF] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                  <Download className="w-5 h-5" />
                  Baixar Comprovante
                </button>
                <button className="flex-1 border-2 border-[#2B59FF] text-[#2B59FF] py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-50 transition-colors">
                  <Share className="w-5 h-5" />
                  Compartilhar
                </button>
              </div>
            </div>

            {/* Mensagem de E-mail */}
            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
              <p className="text-sm text-[#2B59FF] text-center">
                Um e-mail de confirmação foi enviado com todos os detalhes do seu agendamento.
              </p>
            </div>

            {/* Botão Fechar */}
            <button
              onClick={onClose}
              className="w-full bg-[#2B59FF] text-white py-4 rounded-xl font-bold hover:bg-[#1a44cc] transition-colors"
            >
              Fechar
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 z-50 overflow-hidden flex items-center justify-center"
          >
            <div className="w-full max-w-2xl h-full max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col">
              {/* Header com botão fechar apenas na primeira etapa */}
              {currentStep === 'details' && (
                <div className="flex justify-end p-6">
                  <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-8 py-6 md:px-10 md:py-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderStep()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

