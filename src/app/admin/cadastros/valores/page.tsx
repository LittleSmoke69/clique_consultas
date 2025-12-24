'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/slug';
import { BadgeDollarSign, Plus, RefreshCw, Trash2 } from 'lucide-react';

type ClinicOption = { id: string; name: string };
type ServiceOption = { id: string; name: string; slug: string };

type PriceRow = {
  id: string;
  price: number;
  currency: string;
  active: boolean;
  clinics: ClinicOption | null;
  services: { id: string; name: string } | null;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function AdminValoresPage() {
  const [clinics, setClinics] = useState<ClinicOption[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [prices, setPrices] = useState<PriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [serviceForm, setServiceForm] = useState({ name: '', description: '' });
  const serviceSlug = useMemo(() => slugify(serviceForm.name), [serviceForm.name]);

  const [priceForm, setPriceForm] = useState({ clinic_id: '', service_id: '', price: '150', currency: 'BRL', active: true });

  async function load() {
    try {
      setError(null);
      setLoading(true);

      const [clinicsRes, servicesRes, pricesRes] = await Promise.all([
        supabase.from('clique_clinics').select('id, name').order('name', { ascending: true }),
        supabase.from('clique_services').select('id, name, slug').order('name', { ascending: true }),
        supabase
          .from('clique_facility_service_prices')
          .select('id, price, currency, active, clinics:clique_clinics(id, name), services:clique_services(id, name)')
          .order('created_at', { ascending: false }),
      ]);

      if (clinicsRes.error) throw clinicsRes.error;
      if (servicesRes.error) throw servicesRes.error;
      if (pricesRes.error) throw pricesRes.error;

      setClinics((clinicsRes.data ?? []) as ClinicOption[]);
      setServices((servicesRes.data ?? []) as ServiceOption[]);
      
      // Normalizar dados do Supabase: relacionamentos podem vir como arrays
      const rawPrices = (pricesRes.data ?? []) as any[];
      const normalizedPrices: PriceRow[] = rawPrices.map((p: any): PriceRow => {
        // Normalizar clinic (pode vir como array ou objeto único)
        let clinic: ClinicOption | null = null;
        if (p.clinics) {
          if (Array.isArray(p.clinics)) {
            clinic = p.clinics[0] ? { id: p.clinics[0].id, name: p.clinics[0].name } : null;
          } else {
            clinic = { id: p.clinics.id, name: p.clinics.name };
          }
        }
        
        // Normalizar service (pode vir como array ou objeto único)
        let service: { id: string; name: string } | null = null;
        if (p.services) {
          if (Array.isArray(p.services)) {
            service = p.services[0] ? { id: p.services[0].id, name: p.services[0].name } : null;
          } else {
            service = { id: p.services.id, name: p.services.name };
          }
        }
        
        return {
          id: String(p.id),
          price: Number(p.price),
          currency: String(p.currency),
          active: Boolean(p.active),
          clinics: clinic,
          services: service,
        };
      });
      
      setPrices(normalizedPrices);
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao carregar valores.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleCreateService() {
    try {
      setError(null);
      setSaving(true);

      if (!serviceForm.name.trim()) throw new Error('Informe o nome do serviço.');
      if (!serviceSlug) throw new Error('Nome inválido para gerar slug.');

      const { error } = await supabase.from('clique_services').insert({
        name: serviceForm.name.trim(),
        slug: serviceSlug,
        description: serviceForm.description.trim() || null,
      });
      if (error) throw error;

      setServiceForm({ name: '', description: '' });
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao cadastrar serviço.');
    } finally {
      setSaving(false);
    }
  }

  async function handleUpsertPrice() {
    try {
      setError(null);
      setSaving(true);

      if (!priceForm.clinic_id) throw new Error('Selecione a unidade.');
      if (!priceForm.service_id) throw new Error('Selecione o serviço.');
      const price = Number(priceForm.price);
      if (!Number.isFinite(price) || price < 0) throw new Error('Preço inválido.');

      const { error } = await supabase.from('clique_facility_service_prices').upsert(
        {
          clinic_id: priceForm.clinic_id,
          service_id: priceForm.service_id,
          price,
          currency: priceForm.currency || 'BRL',
          active: priceForm.active,
        },
        { onConflict: 'clinic_id,service_id' },
      );
      if (error) throw error;

      setPriceForm((p) => ({ ...p, price: '150' }));
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao salvar valor.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDeletePrice(id: string) {
    const ok = confirm('Tem certeza que deseja excluir este valor?');
    if (!ok) return;

    try {
      setError(null);
      const { error } = await supabase.from('clique_facility_service_prices').delete().eq('id', id);
      if (error) throw error;
      setPrices((prev) => prev.filter((p) => p.id !== id));
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao excluir valor.');
    }
  }

  return (
    <AdminLayout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <BadgeDollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Valores de serviços</h1>
                <p className="text-slate-600 text-sm">Cadastre serviços e defina valores por clínica/hospital.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold hover:bg-slate-50"
            >
              <RefreshCw className="w-4 h-4" />
              Atualizar
            </button>
          </div>
        </motion.div>

        {error && (
          <motion.div variants={itemVariants} className="bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl px-4 py-3 text-sm font-bold">
            {error}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Novo serviço</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nome</label>
                <input
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  placeholder="Ex: Consulta presencial"
                />
                {serviceSlug && <p className="text-xs text-slate-400 mt-1 font-mono">slug: {serviceSlug}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Descrição</label>
                <input
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  placeholder="Opcional"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={saving || !serviceForm.name.trim()}
                  onClick={() => void handleCreateService()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 shadow-lg shadow-amber-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  {saving ? 'Salvando…' : 'Cadastrar serviço'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Definir valor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Unidade</label>
                <select
                  value={priceForm.clinic_id}
                  onChange={(e) => setPriceForm((p) => ({ ...p, clinic_id: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="">Selecione…</option>
                  {clinics.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Serviço</label>
                <select
                  value={priceForm.service_id}
                  onChange={(e) => setPriceForm((p) => ({ ...p, service_id: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                >
                  <option value="">Selecione…</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preço</label>
                <input
                  value={priceForm.price}
                  onChange={(e) => setPriceForm((p) => ({ ...p, price: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  placeholder="150"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Moeda</label>
                <input
                  value={priceForm.currency}
                  onChange={(e) => setPriceForm((p) => ({ ...p, currency: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  placeholder="BRL"
                />
              </div>
              <div className="md:col-span-2 flex items-center justify-between pt-2">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={priceForm.active}
                    onChange={(e) => setPriceForm((p) => ({ ...p, active: e.target.checked }))}
                    className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="text-sm font-bold text-slate-700">Ativo</span>
                </label>
                <button
                  type="button"
                  disabled={saving || !priceForm.clinic_id || !priceForm.service_id}
                  onClick={() => void handleUpsertPrice()}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2B59FF] text-white font-bold hover:bg-[#1a44cc] shadow-lg shadow-[#2B59FF]/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  {saving ? 'Salvando…' : 'Salvar valor'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Valores cadastrados</h2>
          {loading ? (
            <div className="h-24 bg-slate-50 rounded-xl animate-pulse" />
          ) : prices.length === 0 ? (
            <p className="text-slate-500 font-medium">Nenhum valor cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Unidade</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Serviço</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {prices.map((p) => (
                    <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{p.clinics?.name ?? '—'}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{p.services?.name ?? '—'}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 font-bold">
                          {p.currency} {p.price}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${p.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                          {p.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => void handleDeletePrice(p.id)}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 font-bold hover:bg-rose-100"
                        >
                          <Trash2 className="w-4 h-4" />
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AdminLayout>
  );
}


