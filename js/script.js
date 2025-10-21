document.addEventListener('DOMContentLoaded', function() {

  // --- EFEITO DE ROLAGEM SUAVE ---
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // --- CONTROLE DO BOTÃO FLUTUANTE "VOLTAR AO TOPO" ---
  const backToTopButton = document.querySelector('#back-to-top');
  if (backToTopButton) { // Garante que o botão existe
    function toggleBackToTopButton() {
      // Usa window.scrollY para navegadores modernos
      if (window.scrollY > 200) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    }
    window.addEventListener('scroll', toggleBackToTopButton);
    toggleBackToTopButton(); // Chama uma vez para definir o estado inicial
  }


  // --- DARK MODE / LIGHT MODE TOGGLE ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Função para atualizar o ícone do botão (lua/sol)
  function updateToggleButtonIcon() {
    if (!themeToggleBtn) return; // Se o botão não existe, sai
    const icon = themeToggleBtn.querySelector('i');
    if (body.classList.contains('light-mode')) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // 1. Carrega a preferência do usuário (se houver) ou detecta a preferência do sistema
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light-mode') {
      body.classList.add('light-mode');
    } else if (savedTheme === 'dark-mode') {
      body.classList.remove('light-mode'); // Garante que não tenha light-mode
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      // Se não há preferência salva, verifica a preferência do sistema operacional
      body.classList.add('light-mode');
    }
    // Se nada for encontrado, o tema padrão (darker, sem a classe light-mode) será aplicado
    updateToggleButtonIcon(); // Atualiza o ícone do botão
  }

  // 2. Alterna o tema ao clicar no botão
  if (themeToggleBtn) { // Garante que o botão exista na página
    themeToggleBtn.addEventListener('click', function() {
      if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark-mode'); // Salva a preferência
      } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode'); // Salva a preferência
      }
      updateToggleButtonIcon(); // Atualiza o ícone
    });
  }

  // Carrega o tema quando a página é carregada
  loadTheme();

});