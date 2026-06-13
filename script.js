// script.js — Lógica de interação da UI

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    //  SIDEBAR MOBILE
    // =========================================================
    const sidebar  = document.getElementById('sidebar');
    const menuBtn  = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    const overlay  = document.getElementById('sidebar-overlay');

    function openSidebar() {
        if (!sidebar) return;
        sidebar.classList.add('open');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        if (!sidebar) return;
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuBtn)  menuBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (overlay)  overlay.addEventListener('click', closeSidebar);

    // =========================================================
    //  BOTÃO "NOVO CHAMADO" — navega para novo_chamado.html
    // =========================================================
    const newTicketBtn = document.querySelector('.new-ticket-btn');
    if (newTicketBtn) {
        newTicketBtn.addEventListener('click', () => {
            window.location.href = '/novo_chamado.html';
        });
    }

    // =========================================================
    //  DESTAQUE DINÂMICO DO MENU LATERAL
    // =========================================================
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href') || '';
        const itemPage = href.replace('.html', '').replace('/', '');

        // Detecta a página atual pelo pathname
        const isRoot = currentPath === '/' || currentPath.endsWith('index.html');
        const isMatch = itemPage && currentPath.includes(itemPage);

        if (isRoot && itemPage === 'index') {
            item.classList.add('active');
        } else if (!isRoot && isMatch) {
            item.classList.add('active');
        }
    });

    // =========================================================
    //  DROPDOWN DE PERFIL (clique em "Admin ▾")
    // =========================================================
    const profileDropdown = document.querySelector('.profile-dropdown');
    const profileMenu     = document.querySelector('.profile-menu');

    if (profileDropdown && profileMenu) {
        profileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = profileMenu.style.display === 'block';
            closeAllDropdowns();
            if (!isOpen) profileMenu.style.display = 'block';
        });
    }

    // Botão "Sair"
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Futuramente: supabase.auth.signOut()
            window.location.href = '/login.html';
        });
    }

    // =========================================================
    //  DROPDOWN DE AJUDA/SUPORTE (clique em "Suporte ❓")
    // =========================================================
    const helpBtn     = document.querySelector('.help-btn');
    const helpContent = document.querySelector('.help-dropdown-content');

    if (helpBtn && helpContent) {
        helpBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = helpContent.style.display === 'block';
            closeAllDropdowns();
            if (!isOpen) helpContent.style.display = 'block';
        });
    }

    // Fecha todos os dropdowns ao clicar fora
    function closeAllDropdowns() {
        if (profileMenu)  profileMenu.style.display  = 'none';
        if (helpContent)  helpContent.style.display   = 'none';
    }

    document.addEventListener('click', closeAllDropdowns);

    // =========================================================
    //  FILTROS DE CATEGORIA (botões de chip)
    // =========================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.textContent.trim();
            filterTicketsByCategory(category);
        });
    });

    function filterTicketsByCategory(category) {
        const rows = document.querySelectorAll('.ticket-table tbody tr');
        rows.forEach(row => {
            if (category === 'Todos') {
                row.style.display = '';
            } else {
                const categoryCell = row.querySelector('.badge');
                if (categoryCell) {
                    row.style.display = categoryCell.textContent.trim() === category ? '' : 'none';
                }
            }
        });
    }

    // =========================================================
    //  PESQUISA (botão lupa ou Enter)
    // =========================================================
    const searchInput = document.getElementById('search-input');
    const searchBtn   = document.getElementById('search-btn');

    function doSearch() {
        if (!searchInput) return;
        const term = searchInput.value.trim().toLowerCase();
        const rows = document.querySelectorAll('.ticket-table tbody tr');
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
        });
    }

    if (searchBtn)  searchBtn.addEventListener('click', doSearch);
    if (searchInput) {
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') doSearch();
        });
    }

    // =========================================================
    //  FILTRO DE STATUS (select combo)
    // =========================================================
    const statusFilter = document.querySelector('.status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', () => {
            const selected = statusFilter.value;
            const rows = document.querySelectorAll('.ticket-table tbody tr');
            rows.forEach(row => {
                if (!selected) {
                    row.style.display = '';
                } else {
                    const statusCell = row.querySelector('.status-badge');
                    if (statusCell) {
                        row.style.display = statusCell.textContent.trim() === selected ? '' : 'none';
                    }
                }
            });
        });
    }

    // =========================================================
    //  "VER TODOS" — redireciona para meus chamados
    // =========================================================
    const verTodosBtn = document.querySelector('.btn-link');
    if (verTodosBtn) {
        verTodosBtn.addEventListener('click', () => {
            window.location.href = '/meus_chamados.html';
        });
    }

    // =========================================================
    //  BOTÃO VOLTAR NO NOVO CHAMADO
    // =========================================================
    const backBtn = document.querySelector('.btn-cancel');
    if (backBtn) {
        backBtn.addEventListener('click', () => window.history.back());
    }

    // =========================================================
    //  FORMULÁRIO NOVO CHAMADO
    // =========================================================
    const newTicketForm = document.getElementById('new-ticket-form');
    if (newTicketForm) {
        newTicketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Chamado salvo! (Integração com Supabase a ser configurada)');
            window.location.href = '/index.html';
        });
    }

});
