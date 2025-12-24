-- Inserir Especialidades
INSERT INTO clique_specialties (name, slug) VALUES
('Dermatologia', 'dermatologia'),
('Pediatria', 'pediatria'),
('Cardiologia', 'cardiologia'),
('Ginecologia', 'ginecologia'),
('Ortopedia', 'ortopedia'),
('Psicologia', 'psicologia');

-- Inserir Clínicas / Hospitais
INSERT INTO clique_clinics (type, name, slug, description, address, city, state, zip_code, rating, reviews_count, is_partner) VALUES
('clinica', 'Clínica Vida Nova', 'clinica-vida-nova', 'Clínica médica geral com atendimento humanizado.', 'Av. Paulista, 1000', 'São Paulo', 'SP', '01310-100', 4.9, 287, true),
('hospital', 'Hospital Santa Cruz', 'hospital-santa-cruz', 'Hospital referência em atendimento e cirurgias.', 'Rua das Flores, 200', 'São Paulo', 'SP', '04000-000', 4.7, 412, true);

-- Inserir Profissionais
INSERT INTO clique_professionals (full_name, slug, bio, crm_rqe, base_price, rating, reviews_count, is_online_available, clique_plus_available) VALUES
('Dr. Ricardo Almeida', 'ricardo-almeida', 'Especialista em dermatologia clínica e cirúrgica.', 'CRM 123456 / RQE 789', 180.00, 4.9, 124, true, true),
('Dra. Beatriz Santos', 'beatriz-santos', 'Especialista em pediatria com foco em neonatologia.', 'CRM 654321 / RQE 321', 150.00, 4.8, 89, false, true),
('Dr. Marcos Oliveira', 'marcos-oliveira', 'Cardiologista com mais de 15 anos de experiência.', 'CRM 112233 / RQE 445', 220.00, 4.7, 56, true, false),
('Dra. Julia Costa', 'julia-costa', 'Ginecologista obstetra focada em saúde da mulher.', 'CRM 998877 / RQE 112', 200.00, 5.0, 42, true, true);

-- Vincular Especialidades (via subquery por slug)
INSERT INTO clique_professional_specialties (professional_id, specialty_id)
SELECT p.id, s.id
FROM clique_professionals p
JOIN clique_specialties s ON s.slug = 'dermatologia'
WHERE p.slug = 'ricardo-almeida';

INSERT INTO clique_professional_specialties (professional_id, specialty_id)
SELECT p.id, s.id
FROM clique_professionals p
JOIN clique_specialties s ON s.slug = 'pediatria'
WHERE p.slug = 'beatriz-santos';

INSERT INTO clique_professional_specialties (professional_id, specialty_id)
SELECT p.id, s.id
FROM clique_professionals p
JOIN clique_specialties s ON s.slug = 'cardiologia'
WHERE p.slug = 'marcos-oliveira';

INSERT INTO clique_professional_specialties (professional_id, specialty_id)
SELECT p.id, s.id
FROM clique_professionals p
JOIN clique_specialties s ON s.slug = 'ginecologia'
WHERE p.slug = 'julia-costa';

-- Vincular Profissionais às Clínicas
INSERT INTO clique_clinic_professionals (clinic_id, professional_id)
SELECT c.id, p.id
FROM clique_clinics c
JOIN clique_professionals p ON p.slug in ('ricardo-almeida', 'beatriz-santos')
WHERE c.slug = 'clinica-vida-nova';

INSERT INTO clique_clinic_professionals (clinic_id, professional_id)
SELECT c.id, p.id
FROM clique_clinics c
JOIN clique_professionals p ON p.slug in ('marcos-oliveira', 'julia-costa')
WHERE c.slug = 'hospital-santa-cruz';

-- Inserir Serviços
INSERT INTO clique_services (name, slug, description) VALUES
('Consulta presencial', 'consulta-presencial', 'Consulta presencial na unidade'),
('Teleconsulta', 'teleconsulta', 'Atendimento online'),
('Exame de sangue', 'exame-sangue', 'Coleta e análise laboratorial'),
('Raio-X', 'raio-x', 'Exame de imagem');

-- Preços por clínica/hospital
INSERT INTO clique_facility_service_prices (clinic_id, service_id, price, currency, active)
SELECT c.id, s.id, 150.00, 'BRL', true
FROM clique_clinics c
JOIN clique_services s ON s.slug = 'consulta-presencial'
WHERE c.slug = 'clinica-vida-nova';

INSERT INTO clique_facility_service_prices (clinic_id, service_id, price, currency, active)
SELECT c.id, s.id, 220.00, 'BRL', true
FROM clique_clinics c
JOIN clique_services s ON s.slug = 'consulta-presencial'
WHERE c.slug = 'hospital-santa-cruz';

INSERT INTO clique_facility_service_prices (clinic_id, service_id, price, currency, active)
SELECT c.id, s.id, 120.00, 'BRL', true
FROM clique_clinics c
JOIN clique_services s ON s.slug = 'teleconsulta'
WHERE c.slug = 'clinica-vida-nova';

