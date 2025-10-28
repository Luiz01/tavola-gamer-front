document.addEventListener('DOMContentLoaded', function() {

  // --- DARK MODE / LIGHT MODE TOGGLE (AGORA DENTRO DO MENU DE ACESSIBILIDADE) ---
  const themeToggleMenuBtn = document.getElementById('theme-toggle-menu');
  const body = document.body;

  // Função para atualizar o ícone e texto do botão de tema no menu
  function updateThemeToggleButton() {
    if (!themeToggleMenuBtn) return;
    const icon = themeToggleMenuBtn.querySelector('i');
    if (body.classList.contains('light-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
      themeToggleMenuBtn.innerHTML = '<i class="fas fa-sun"></i> Modo Claro';
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      themeToggleMenuBtn.innerHTML = '<i class="fas fa-moon"></i> Modo Escuro';
    }
  }

  // Carrega a preferência de tema (salva ou do sistema)
  function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
      body.classList.add('light-mode');
    } else if (savedTheme === 'dark-mode') {
      body.classList.remove('light-mode');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      body.classList.add('light-mode');
    }
    updateThemeToggleButton();
  }

  // Alterna o tema ao clicar no botão dentro do menu
  if (themeToggleMenuBtn) {
    themeToggleMenuBtn.addEventListener('click', function() {
      if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark-mode');
      } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
      }
      updateThemeToggleButton();
    });
  }

  // --- MENU DE ACESSIBILIDADE (MODAL) ---
  const accessibilityToggleBtn = document.getElementById('accessibility-toggle');
  const accessibilityMenu = document.getElementById('accessibility-menu');
  const closeMenuBtn = accessibilityMenu ? accessibilityMenu.querySelector('.close-btn') : null;

  if (accessibilityToggleBtn && accessibilityMenu) {
    accessibilityToggleBtn.addEventListener('click', function() {
      accessibilityMenu.classList.add('active');
      body.style.overflow = 'hidden';
    });

    if (closeMenuBtn) {
      closeMenuBtn.addEventListener('click', function() {
        accessibilityMenu.classList.remove('active');
        body.style.overflow = '';
      });
    }

    // Fecha o menu se clicar fora do conteúdo (overlay)
    accessibilityMenu.addEventListener('click', function(e) {
      if (e.target === accessibilityMenu) {
        accessibilityMenu.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }


  // --- AVISO DE BOAS-VINDAS (POPUP) ---
  const welcomeMessage = document.getElementById('welcome-message');
  const closeWelcomeBtn = document.getElementById('close-welcome');

  // Mostra o popup apenas na primeira visita (ou se não foi fechado antes)
  function showWelcomeMessage() {
    if (welcomeMessage && !localStorage.getItem('welcomeMessageClosed')) {
      welcomeMessage.classList.add('active');
      body.style.overflow = 'hidden';
    }
  }

  if (closeWelcomeBtn && welcomeMessage) {
    closeWelcomeBtn.addEventListener('click', function() {
      welcomeMessage.classList.remove('active');
      body.style.overflow = '';
      localStorage.setItem('welcomeMessageClosed', 'true');
    });
  }


  // --- INICIALIZAÇÃO ---
  loadThemePreference();
  showWelcomeMessage();

});