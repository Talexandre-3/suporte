// supabase.js — Cliente e serviços de dados do Supabase
import { createClient } from '@supabase/supabase-js'

// ──────────────────────────────────────────────────────
//  CLIENTE
// ──────────────────────────────────────────────────────
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// ──────────────────────────────────────────────────────
//  UTILITÁRIOS DE BADGE / CSS
// ──────────────────────────────────────────────────────
const CATEGORY_CLASS = {
  'Informática/TI':      'badge-blue',
  'Elétrica':            'badge-yellow',
  'Predial/Civil':       'badge-green',
  'Segurança Eletrônica':'badge-red',
  'Telecomunicações':    'badge-purple',
}

const PRIORITY_CLASS = {
  'Crítica': { cls: 'text-error',   icon: 'warning' },
  'Alta':    { cls: 'text-orange',  icon: 'priority_high' },
  'Média':   { cls: 'text-yellow',  icon: 'remove' },
  'Baixa':   { cls: 'text-success', icon: 'arrow_downward' },
}

const STATUS_CLASS = {
  'Pendente':          'status-pending',
  'Em Progresso':      'status-progress',
  'Aguardando Peças':  'status-warning',
  'Concluído':         'status-done',
  'Cancelado':         'status-cancelled',
}

export function badgeFor(category) {
  return CATEGORY_CLASS[category] || 'badge-blue'
}

export function priorityFor(priority) {
  return PRIORITY_CLASS[priority] || { cls: 'text-yellow', icon: 'remove' }
}

export function statusFor(status) {
  return STATUS_CLASS[status] || 'status-pending'
}

// ──────────────────────────────────────────────────────
//  AUTENTICAÇÃO
// ──────────────────────────────────────────────────────
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  return await supabase.auth.signOut()
}

// ──────────────────────────────────────────────────────
//  CHAMADOS (TICKETS)
// ──────────────────────────────────────────────────────
export async function fetchTickets({ limit = 50, statusFilter = null, search = null } = {}) {
  let query = supabase
    .from('tickets')
    .select(`
      id,
      ticket_number,
      title,
      priority,
      created_at,
      categories ( name ),
      statuses    ( name )
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (statusFilter) query = query.eq('statuses.name', statusFilter)
  if (search)       query = query.ilike('title', `%${search}%`)

  const { data, error } = await query
  if (error) { console.error('Erro ao buscar chamados:', error); return [] }
  return data || []
}

export async function createTicket({ title, description, category_id, priority }) {
  const session = await getSession()
  const { data, error } = await supabase
    .from('tickets')
    .insert({
      title,
      description,
      category_id,
      priority,
      created_by: session?.user?.id || null,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateTicketStatus(ticketId, statusId) {
  const { data, error } = await supabase
    .from('tickets')
    .update({ status_id: statusId })
    .eq('id', ticketId)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteTicket(ticketId) {
  const { error } = await supabase.from('tickets').delete().eq('id', ticketId)
  if (error) throw error
}

// ──────────────────────────────────────────────────────
//  KPIs PARA O DASHBOARD
// ──────────────────────────────────────────────────────
export async function fetchKpis() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const todayStr = today.toISOString()

  const [abertos, progresso, aguardando, concluidos] = await Promise.all([
    supabase.from('tickets').select('id', { count: 'exact', head: true })
      .not('statuses.is_closed_status', 'eq', true),
    supabase.from('tickets').select('id', { count: 'exact', head: true })
      .eq('statuses.name', 'Em Progresso'),
    supabase.from('tickets').select('id', { count: 'exact', head: true })
      .eq('statuses.name', 'Aguardando Peças'),
    supabase.from('tickets').select('id', { count: 'exact', head: true })
      .eq('statuses.is_closed_status', true)
      .gte('closed_at', todayStr),
  ])

  return {
    abertos:   abertos.count   ?? 0,
    progresso: progresso.count ?? 0,
    aguardando: aguardando.count ?? 0,
    concluidos: concluidos.count ?? 0,
  }
}

// ──────────────────────────────────────────────────────
//  CATEGORIAS
// ──────────────────────────────────────────────────────
export async function fetchCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, color')
    .order('name')
  if (error) { console.error(error); return [] }
  return data || []
}

export async function createCategory(name, color = 'blue') {
  const { data, error } = await supabase
    .from('categories')
    .insert({ name, color })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCategory(id) {
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error
}

// ──────────────────────────────────────────────────────
//  STATUS
// ──────────────────────────────────────────────────────
export async function fetchStatuses() {
  const { data, error } = await supabase
    .from('statuses')
    .select('id, name, color, is_closed_status')
    .order('name')
  if (error) { console.error(error); return [] }
  return data || []
}

export async function createStatus(name, color = 'gray', is_closed_status = false) {
  const { data, error } = await supabase
    .from('statuses')
    .insert({ name, color, is_closed_status })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteStatus(id) {
  const { error } = await supabase.from('statuses').delete().eq('id', id)
  if (error) throw error
}

// ──────────────────────────────────────────────────────
//  CONFIGURAÇÕES
// ──────────────────────────────────────────────────────
export async function fetchSettings() {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single()
  if (error) { console.error(error); return null }
  return data
}

export async function updateSettings(id, updates) {
  const { data, error } = await supabase
    .from('settings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

// ──────────────────────────────────────────────────────
//  RELATÓRIOS
// ──────────────────────────────────────────────────────
export async function fetchReportData() {
  const { data: tickets, error } = await supabase
    .from('tickets')
    .select(`
      id, priority, created_at, closed_at,
      categories ( name ),
      statuses   ( name, is_closed_status )
    `)
  if (error) { console.error(error); return { tickets: [] } }

  const byCategory = {}
  const byStatus   = {}
  const byPriority = {}

  ;(tickets || []).forEach(t => {
    const cat = t.categories?.name || 'Sem categoria'
    const st  = t.statuses?.name   || 'Sem status'
    const pr  = t.priority          || 'Média'
    byCategory[cat] = (byCategory[cat] || 0) + 1
    byStatus[st]    = (byStatus[st]    || 0) + 1
    byPriority[pr]  = (byPriority[pr]  || 0) + 1
  })

  return { tickets: tickets || [], byCategory, byStatus, byPriority }
}
