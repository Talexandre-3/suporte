import { createClient } from '@supabase/supabase-js'

// Import the CSS via Vite to handle HMR
import './styles.css'

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sua-url-do-supabase.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sua-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Global app state
export const appState = {
    user: null,
    profile: null,
    settings: null
}

// Function to check auth session
export async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
        appState.user = session.user
        // Fetch user profile
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            
        if (profile) {
            appState.profile = profile
            updateUIAfterLogin(profile)
        }
    } else {
        // Redirect to login if not authenticated and not on login page
        if (!window.location.pathname.includes('login.html')) {
            window.location.href = '/login.html'
        }
    }
}

// Function to fetch settings
export async function fetchSettings() {
    const { data: settings } = await supabase
        .from('settings')
        .select('*')
        .limit(1)
        .single()
        
    if (settings) {
        appState.settings = settings
        updateUISettings(settings)
    }
}

// Update UI elements based on profile
function updateUIAfterLogin(profile) {
    // Update avatars
    const avatars = document.querySelectorAll('.avatar, .avatar-sm img')
    avatars.forEach(img => {
        if (profile.avatar_url) img.src = profile.avatar_url
    })
    
    // Role based UI adjustments
    if (profile.role === 'Cliente') {
        // Hide config, reports, panel...
        document.querySelectorAll('.nav-item').forEach(item => {
            if (!item.textContent.includes('Meus Chamados')) {
                item.style.display = 'none'
            }
        })
    } else if (profile.role === 'Técnico') {
        // Technical staff view
    }
}

// Update settings UI
function updateUISettings(settings) {
    const titles = document.querySelectorAll('.logo-text h2, .mobile-title')
    titles.forEach(el => el.textContent = settings.site_title)
    
    const subtitles = document.querySelectorAll('.logo-text p')
    subtitles.forEach(el => el.textContent = settings.site_subtitle)
    
    if (settings.site_logo_url) {
        const logos = document.querySelectorAll('.logo-icon')
        logos.forEach(el => {
            el.innerHTML = `<img src="${settings.site_logo_url}" alt="Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;">`
            el.style.backgroundColor = 'transparent'
        })
    }
}

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    // Inicializa as configurações do sistema
    // (será ativado após configurar o Supabase)
    // await checkAuth()
    // await fetchSettings()
    console.log('TechSupport inicializado com sucesso.')
})
