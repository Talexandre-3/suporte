// main.js — Inicialização do app e integração com Supabase
import './styles.css'
import { supabase, fetchSettings, signOut } from './supabase.js'

// ──────────────────────────────────────────────────────
//  APLICA CONFIGURAÇÕES DINÂMICAS NA UI
// ──────────────────────────────────────────────────────
function applySettings(settings) {
  if (!settings) return

  document.querySelectorAll('.logo-text h2, .mobile-title').forEach(el => {
    el.textContent = settings.site_title || 'TechSupport'
  })
  document.querySelectorAll('.logo-text p').forEach(el => {
    el.textContent = settings.site_subtitle || 'Gestão de Infraestrutura'
  })

  // Informações de ajuda/suporte
  if (settings.help_info)  {
    const el = document.getElementById('help-text')
    if (el) el.textContent = settings.help_info
  }
  if (settings.help_email) {
    const el = document.getElementById('help-email')
    if (el) el.textContent = `Email: ${settings.help_email}`
  }
  if (settings.help_phone) {
    const el = document.getElementById('help-phone')
    if (el) el.textContent = `Tel: ${settings.help_phone}`
  }
  if (settings.help_site)  {
    const el = document.getElementById('help-site')
    if (el) el.textContent = `Site: ${settings.help_site}`
  }
}

// ──────────────────────────────────────────────────────
//  ATUALIZA INFO DO PERFIL NA SIDEBAR/TOPBAR
// ──────────────────────────────────────────────────────
function applyUserInfo(user) {
  if (!user) return
  const name  = user.user_metadata?.name  || user.email?.split('@')[0] || 'Usuário'
  const role  = user.user_metadata?.role  || 'Técnico'
  const email = user.email || ''

  document.querySelectorAll('.profile-name').forEach(el => el.textContent = name)
  document.querySelectorAll('.profile-name-top').forEach(el => el.textContent = name)
  document.querySelectorAll('.profile-role').forEach(el => el.textContent = role)
}

// ──────────────────────────────────────────────────────
//  BOTÃO DE SAIR
// ──────────────────────────────────────────────────────
async function handleLogout() {
  await signOut()
  window.location.href = '/login.html'
}

// ──────────────────────────────────────────────────────
//  INICIALIZAÇÃO
// ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {

  // Carrega configurações e aplica na UI
  try {
    const settings = await fetchSettings()
    applySettings(settings)
  } catch (e) {
    console.warn('Configurações não carregadas:', e.message)
  }

  // Monitora sessão do usuário
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.user) {
      applyUserInfo(session.user)
    }
  } catch (e) {
    console.warn('Sessão não verificada:', e.message)
  }

  // Botão de sair (global)
  const logoutBtn = document.getElementById('logout-btn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault()
      handleLogout()
    })
  }

  console.log('TechSupport iniciado com sucesso.')
})
