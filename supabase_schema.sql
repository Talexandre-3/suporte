-- Schema para o app de Suporte Técnico

-- Criação da tabela de configurações (Singleton)
CREATE TABLE public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_title TEXT NOT NULL DEFAULT 'TechSupport',
    site_subtitle TEXT NOT NULL DEFAULT 'Gestão de Infraestrutura',
    site_logo_url TEXT,
    help_info TEXT,
    help_email TEXT,
    help_site TEXT,
    help_phone TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inserir registro único de configuração
INSERT INTO public.settings (site_title, site_subtitle) VALUES ('TechSupport', 'Gestão de Infraestrutura');

-- Perfis de Usuários (Estende o auth.users do Supabase)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL CHECK (role IN ('Administrador', 'Técnico', 'Cliente')),
    phone TEXT,
    avatar_url TEXT,
    position TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Categorias
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT 'blue',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Popula Categorias Padrão
INSERT INTO public.categories (name, color) VALUES 
('Informática/TI', 'blue'),
('Elétrica', 'yellow'),
('Predial/Civil', 'green'),
('Segurança Eletrônica', 'red'),
('Telecomunicações', 'purple');

-- Tabela de Status
CREATE TABLE public.statuses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT 'gray',
    is_closed_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Popula Status Padrão
INSERT INTO public.statuses (name, color, is_closed_status) VALUES 
('Pendente', 'gray', FALSE),
('Em Progresso', 'blue', FALSE),
('Aguardando Peças', 'yellow', FALSE),
('Concluído', 'green', TRUE),
('Cancelado', 'red', TRUE);

-- Tabela de Chamados
CREATE TABLE public.tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number SERIAL,
    title TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    priority TEXT CHECK (priority IN ('Baixa', 'Média', 'Alta', 'Crítica')),
    status_id UUID REFERENCES public.statuses(id) ON DELETE SET NULL,
    created_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    closed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Triggers para atualizar updated_at e closed_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at
    BEFORE UPDATE ON public.tickets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE FUNCTION set_closed_at()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT is_closed_status FROM public.statuses WHERE id = NEW.status_id) = TRUE AND OLD.status_id != NEW.status_id THEN
        NEW.closed_at = NOW();
    ELSIF (SELECT is_closed_status FROM public.statuses WHERE id = NEW.status_id) = FALSE THEN
        NEW.closed_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_set_closed_at
    BEFORE UPDATE ON public.tickets
    FOR EACH ROW
    EXECUTE FUNCTION set_closed_at();

-- Políticas RLS (Row Level Security) - para simplificar neste exemplo, permitimos all para autenticados
-- Em um ambiente real de produção, regras mais granulares devem ser configuradas.
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all actions for authenticated users on settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users on profiles" ON public.profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users on categories" ON public.categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users on statuses" ON public.statuses FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all actions for authenticated users on tickets" ON public.tickets FOR ALL USING (auth.role() = 'authenticated');
