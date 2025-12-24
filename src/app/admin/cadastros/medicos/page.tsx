'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/slug';
import type { Clinic, Professional } from '@/types';
import { Plus, RefreshCw, Stethoscope, Trash2 } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

type ClinicOption = Pick<Clinic, 'id' | 'name'>;

export default function AdminMedicosPage() {
  const [clinics, setClinics] = useState<ClinicOption[]>([]);
  const [items, setItems] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: '',
    crm_rqe: '',
    bio: '',
    base_price: '150',
    is_online_available: true,
    clique_plus_available: false,
    clinic_id: '' as string,
  });

  const slug = useMemo(() => slugify(form.full_name), [form.full_name]);

  async function load() {
    try {
      setError(null);
      setLoading(true);

        const [clinicsRes, profRes] = await Promise.all([
          supabase.from('clique_clinics').select('id, name').order('name', { ascending: true }),
          supabase
            .from('clique_professionals')
            .select('id, full_name, slug, bio, crm_rqe, avatar_url, rating, reviews_count, base_price, is_online_available, clique_plus_available')
            .order('created_at', { ascending: false }),
        ]);

      if (clinicsRes.error) throw clinicsRes.error;
      if (profRes.error) throw profRes.error;

      setClinics((clinicsRes.data ?? []) as ClinicOption[]);
      setItems((profRes.data ?? []) as Professional[]);
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao carregar médicos.');
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

      if (!form.full_name.trim()) throw new Error('Informe o nome do médico.');
      if (!slug) throw new Error('Nome inválido para gerar slug.');
      const basePrice = Number(form.base_price);
      if (!Number.isFinite(basePrice) || basePrice < 0) throw new Error('Preço base inválido.');

        const { data: created, error: createError } = await supabase
          .from('clique_professionals')
          .insert({
          full_name: form.full_name.trim(),
          slug,
          bio: form.bio.trim() || null,
          crm_rqe: form.crm_rqe.trim() || null,
          base_price: basePrice,
          is_online_available: form.is_online_available,
          clique_plus_available: form.clique_plus_available,
          kind: 'medico',
        })
        .select('id')
        .single();
      if (createError) throw createError;

      if (form.clinic_id) {
          const { error: linkError } = await supabase.from('clique_clinic_professionals').insert({
          clinic_id: form.clinic_id,
          professional_id: created.id,
        });
        if (linkError) throw linkError;
      }

      setForm((p) => ({ ...p, full_name: '', crm_rqe: '', bio: '', base_price: '150', clinic_id: '' }));
      await load();
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao cadastrar médico.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = confirm('Tem certeza que deseja excluir este médico?');
    if (!ok) return;

    try {
      setError(null);
        const { error } = await supabase.from('clique_professionals').delete().eq('id', id);
      if (error) throw error;
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      setError(e?.message ?? 'Falha ao excluir médico.');
    }
  }

  return (
    <AdminLayout>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <Stethoscope className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Cadastros: Médicos</h1>
                <p className="text-slate-600 text-sm">Crie médicos que aparecerão na busca e listagens.</p>
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

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Novo médico</h2>
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nome</label>
              <input
                value={form.full_name}
                onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Ex: Dr. Ricardo Almeida"
              />
              {slug && <p className="text-xs text-slate-400 mt-1 font-mono">slug: {slug}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">CRM/RQE</label>
              <input
                value={form.crm_rqe}
                onChange={(e) => setForm((p) => ({ ...p, crm_rqe: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Ex: CRM 123456 / RQE 789"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Preço base</label>
              <input
                value={form.base_price}
                onChange={(e) => setForm((p) => ({ ...p, base_price: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="150"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Vincular à unidade (opcional)</label>
              <select
                value={form.clinic_id}
                onChange={(e) => setForm((p) => ({ ...p, clinic_id: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              >
                <option value="">—</option>
                {clinics.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="lg:col-span-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bio</label>
              <input
                value={form.bio}
                onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                placeholder="Ex: Especialista em cardiologia…"
              />
            </div>
            <div className="lg:col-span-6 flex flex-wrap gap-6 pt-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.is_online_available}
                  onChange={(e) => setForm((p) => ({ ...p, is_online_available: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-bold text-slate-700">Disponível online</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.clique_plus_available}
                  onChange={(e) => setForm((p) => ({ ...p, clique_plus_available: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm font-bold text-slate-700">Clique+</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-5">
            <button
              type="button"
              disabled={saving || !form.full_name.trim()}
              onClick={() => void handleCreate()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              {saving ? 'Salvando…' : 'Cadastrar'}
            </button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Médicos cadastrados</h2>
          {loading ? (
            <div className="h-24 bg-slate-50 rounded-xl animate-pulse" />
          ) : items.length === 0 ? (
            <p className="text-slate-500 font-medium">Nenhum médico cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-100">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Nome</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">CRM/RQE</th>
                    <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Preço base</th>
                    <th className="text-right py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{p.full_name}</p>
                        <p className="text-xs text-slate-400 font-mono">{p.slug}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 font-bold">{p.crm_rqe ?? '—'}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-slate-700 font-bold">R$ {p.base_price}</span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => void handleDelete(p.id)}
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


