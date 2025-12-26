'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/slug';
import type { Clinic } from '@/types';
import { Building2, Plus, Trash2, RefreshCw } from 'lucide-react';

type ClinicType = 'clinica' | 'hospital';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function AdminUnidadesPage() {
  const [items, setItems] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    type: 'clinica' as ClinicType,
    name: '',
    city: '',
    state: '',
    address: '',
    is_partner: true,
  });

  const slug = useMemo(() => slugify(form.name), [form.name]);

  async function load() {
    try {
      setError(null);
      setLoading(true);
        const { data, error } = await supabase
          .from('clique_clinics')
          .select('id, type, name, slug, description, address, city, state, zip_code, latitude, longitude, image_url, rating, reviews_count, is_partner')
          .order('created_at', { ascending: false });
      if (error) throw error;
      setItems((data ?? []) as Clinic[]);
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao carregar unidades.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleCreate() {
    try {
      setError(null);
      setSaving(true);

      if (!form.name.trim()) throw new Error('Informe o nome.');
      if (!slug) throw new Error('Nome inválido para gerar slug.');

        const { error } = await supabase.from('clique_clinics').insert({
        type: form.type,
        name: form.name.trim(),
        slug,
        city: form.city.trim() || null,
        state: form.state.trim() || null,
        address: form.address.trim() || null,
        is_partner: form.is_partner,
      });
      if (error) throw error;

      setForm((prev) => ({ ...prev, name: '', city: '', state: '', address: '' }));
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao cadastrar unidade.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm('Tem certeza que deseja excluir esta unidade?');
    if (!ok) return;

    try {
      setError(null);
        const { error } = await supabase.from('clique_clinics').delete().eq('id', id);
      if (error) throw error;
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao excluir unidade.');
    }
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#2B59FF]/10 rounded-xl">
                <Building2 className="w-6 h-6 text-[#2B59FF]" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Cadastros: Clínicas & Hospitais</h1>
                <p className="text-slate-600 text-sm">Crie e gerencie unidades que aparecem na busca da landing.</p>
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

        {(error || slug) && (
          <motion.div variants={itemVariants} className="space-y-3">
            {error && (
              <div className="bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl px-4 py-3 text-sm font-bold">
                {error}
              </div>
            )}
            {slug && (
              <div className="bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl px-4 py-3 text-sm">
                <span className="font-bold">Slug:</span> <span className="font-mono">{slug}</span>
              </div>
            )}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Nova unidade</h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tipo</label>
              <select
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as ClinicType }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF]"
              >
                <option value="clinica">Clínica</option>
                <option value="hospital">Hospital</option>
              </select>
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nome</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF]"
                placeholder="Ex: Clínica Vida Nova"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cidade</label>
              <input
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF]"
                placeholder="Ex: São Paulo"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">UF</label>
              <input
                value={form.state}
                onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF]"
                placeholder="SP"
              />
            </div>
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Endereço</label>
              <input
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2B59FF]/20 focus:border-[#2B59FF]"
                placeholder="Rua, número, bairro"
              />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <input
                id="is_partner"
                type="checkbox"
                checked={form.is_partner}
                onChange={(e) => setForm((p) => ({ ...p, is_partner: e.target.checked }))}
                className="w-5 h-5 rounded border-slate-300 text-[#2B59FF] focus:ring-[#2B59FF]"
              />
              <label htmlFor="is_partner" className="text-sm font-bold text-slate-700">
                Parceiro (Clique+)
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              type="button"
              disabled={saving || !form.name.trim()}
              onClick={() => void handleCreate()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2B59FF] text-white font-bold hover:bg-[#1a44cc] shadow-lg shadow-[#2B59FF]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {saving ? 'Salvando…' : 'Cadastrar'}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Unidades cadastradas</h2>
          {loading ? (
            <div className="h-24 bg-slate-50 rounded-xl animate-pulse" />
          ) : items.length === 0 ? (
            <p className="text-slate-500 font-medium">Nenhuma unidade cadastrada ainda.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Cidade</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Parceiro</th>
                    <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((c) => (
                    <tr key={c.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{c.name}</p>
                        <p className="text-xs text-slate-400 font-mono">{c.slug}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold border bg-slate-100 text-slate-700 border-slate-200">
                          {c.type === 'hospital' ? 'Hospital' : 'Clínica'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 font-bold">
                          {c.city ?? '—'}{c.state ? `/${c.state}` : ''}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${c.is_partner ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                          {c.is_partner ? 'Sim' : 'Não'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => void handleDelete(c.id)}
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
  );
}


