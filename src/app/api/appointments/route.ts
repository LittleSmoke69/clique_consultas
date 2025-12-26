import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      patient_name,
      patient_email,
      patient_phone,
      patient_cpf,
      payment_method,
      payment_status,
      status,
      items
    } = body;

    // Validação básica
    if (!patient_name || !patient_email || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Dados obrigatórios faltando' },
        { status: 400 }
      );
    }

    // Calcular total_amount manualmente para evitar dependência exclusiva do trigger
    const totalAmount = items.reduce((sum: number, item: any) => sum + (Number(item.price) || 0), 0);

    // Criar agendamento usando supabaseAdmin para evitar problemas de RLS com triggers
    const { data: appointment, error: appointmentError } = await supabaseAdmin
      .from('clique_appointments')
      .insert({
        patient_name,
        patient_email,
        patient_phone: patient_phone || null,
        patient_cpf: patient_cpf || null,
        payment_method: payment_method || null,
        status: status || 'confirmed',
        payment_status: payment_status || 'paid',
        total_amount: totalAmount // Calculado manualmente
      })
      .select()
      .single();

    if (appointmentError) {
      console.error('Erro ao criar agendamento:', appointmentError);
      return NextResponse.json(
        { error: `Erro ao criar agendamento: ${appointmentError.message}` },
        { status: 500 }
      );
    }

    // Criar itens do agendamento
    const appointmentItems = items.map((item: any) => ({
      appointment_id: appointment.id,
      professional_id: item.professional_id,
      clinic_id: item.clinic_id || null,
      appointment_date: item.appointment_date,
      appointment_time: item.appointment_time,
      appointment_type: item.appointment_type || 'presencial',
      price: item.price,
      specialty_id: item.specialty_id || null
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('clique_appointment_items')
      .insert(appointmentItems);

    if (itemsError) {
      console.error('Erro ao criar itens do agendamento:', itemsError);
      // Tentar deletar o agendamento criado se os itens falharem
      await supabaseAdmin
        .from('clique_appointments')
        .delete()
        .eq('id', appointment.id);

      return NextResponse.json(
        { error: `Erro ao criar itens do agendamento: ${itemsError.message}` },
        { status: 500 }
      );
    }

    // Buscar agendamento completo com itens
    const { data: fullAppointment, error: fetchError } = await supabaseAdmin
      .from('clique_appointments')
      .select(`
        *,
        items:clique_appointment_items (
          *,
          professional:clique_professionals (*),
          clinic:clique_clinics (*),
          specialty:clique_specialties (*)
        )
      `)
      .eq('id', appointment.id)
      .single();

    if (fetchError) {
      console.error('Erro ao buscar agendamento completo:', fetchError);
    }

    return NextResponse.json({
      success: true,
      appointment: fullAppointment || appointment
    }, { status: 201 });

  } catch (error: any) {
    console.error('Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('clique_appointments')
      .select(`
        *,
        items:clique_appointment_items (
          *,
          professional:clique_professionals (*),
          clinic:clique_clinics (*),
          specialty:clique_specialties (*)
        )
      `)
      .order('created_at', { ascending: false });

    // status pode ser:
    // - null/undefined: sem filtro (todos)
    // - "scheduled": interpreta como consultas marcadas (pending + confirmed)
    // - "pending"/"confirmed"/"completed"/"cancelled": filtro único
    // - "pending,confirmed": lista separada por vírgula
    if (status && status !== 'all') {
      const allowed = new Set(['pending', 'confirmed', 'completed', 'cancelled', 'scheduled']);
      const normalized = status.trim().toLowerCase();

      if (!allowed.has(normalized) && !normalized.includes(',')) {
        return NextResponse.json(
          { error: 'Filtro de status inválido' },
          { status: 400 }
        );
      }

      if (normalized === 'scheduled') {
        query = query.in('status', ['pending', 'confirmed']);
      } else if (normalized.includes(',')) {
        const parts = normalized
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

        const invalid = parts.find((p) => !allowed.has(p) || p === 'scheduled');
        if (invalid) {
          return NextResponse.json(
            { error: `Filtro de status inválido: ${invalid}` },
            { status: 400 }
          );
        }

        query = query.in('status', parts);
      } else {
        query = query.eq('status', normalized);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Erro ao buscar agendamentos:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar agendamentos', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ appointments: data || [] });
  } catch (error: any) {
    console.error('Erro inesperado:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    );
  }
}

