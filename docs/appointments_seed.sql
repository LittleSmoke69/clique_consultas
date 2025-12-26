-- ==========================================================
-- Seed de Agendamentos de Exemplo
-- ==========================================================

-- Inserir agendamentos de exemplo
-- Nota: user_id pode ser null para simular agendamentos sem login

INSERT INTO public.clique_appointments (
  patient_name,
  patient_email,
  patient_phone,
  patient_cpf,
  payment_method,
  status,
  payment_status,
  total_amount,
  created_at
) VALUES
(
  'Maria Silva',
  'maria.silva@email.com',
  '(11) 98765-4321',
  '123.456.789-00',
  'pix',
  'confirmed',
  'paid',
  150.00,
  timezone('utc'::text, now() - interval '2 days')
),
(
  'João Santos',
  'joao.santos@email.com',
  '(11) 98765-1234',
  '987.654.321-00',
  'credit_card',
  'pending',
  'pending',
  180.00,
  timezone('utc'::text, now() - interval '1 day')
),
(
  'Ana Costa',
  'ana.costa@email.com',
  '(11) 98765-5678',
  '456.789.123-00',
  'clique_plus',
  'confirmed',
  'paid',
  142.50, -- 5% desconto
  timezone('utc'::text, now() - interval '5 hours')
),
(
  'Pedro Oliveira',
  'pedro.oliveira@email.com',
  '(11) 98765-9876',
  '789.123.456-00',
  'pix',
  'completed',
  'paid',
  200.00,
  timezone('utc'::text, now() - interval '7 days')
),
(
  'Carla Mendes',
  'carla.mendes@email.com',
  '(11) 98765-2468',
  '321.654.987-00',
  'credit_card',
  'cancelled',
  'refunded',
  150.00,
  timezone('utc'::text, now() - interval '3 days')
);

-- Inserir itens dos agendamentos
-- Assumindo que existem profissionais e especialidades já cadastrados
INSERT INTO public.clique_appointment_items (
  appointment_id,
  professional_id,
  clinic_id,
  appointment_date,
  appointment_time,
  appointment_type,
  price,
  specialty_id
)
SELECT 
  a.id,
  p.id,
  c.id,
  CASE 
    WHEN a.status = 'completed' THEN (current_date - interval '7 days')::date
    WHEN a.status = 'cancelled' THEN (current_date - interval '3 days')::date
    ELSE (current_date + interval '2 days')::date
  END,
  '15:00:00'::time,
  'presencial',
  CASE 
    WHEN a.payment_method = 'clique_plus' THEN a.total_amount / 0.95 -- Reverter desconto
    ELSE a.total_amount
  END,
  s.id
FROM public.clique_appointments a
CROSS JOIN LATERAL (
  SELECT id FROM public.clique_professionals 
  ORDER BY random() 
  LIMIT 1
) p
CROSS JOIN LATERAL (
  SELECT id FROM public.clique_clinics 
  ORDER BY random() 
  LIMIT 1
) c
CROSS JOIN LATERAL (
  SELECT id FROM public.clique_specialties 
  ORDER BY random() 
  LIMIT 1
) s
WHERE NOT EXISTS (
  SELECT 1 FROM public.clique_appointment_items ai 
  WHERE ai.appointment_id = a.id
)
LIMIT 5;

-- Atualizar total_amount dos agendamentos baseado nos itens
UPDATE public.clique_appointments a
SET total_amount = (
  SELECT COALESCE(SUM(price), 0)
  FROM public.clique_appointment_items
  WHERE appointment_id = a.id
)
WHERE EXISTS (
  SELECT 1 FROM public.clique_appointment_items 
  WHERE appointment_id = a.id
);

