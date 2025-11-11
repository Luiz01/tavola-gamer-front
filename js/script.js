document.addEventListener('DOMContentLoaded', function() {

  // --- DARK MODE / LIGHT MODE TOGGLE (DENTRO DO MENU DE ACESSIBILIDADE) ---
  const themeToggleMenuBtn = document.getElementById('theme-toggle-menu');
  const body = document.body;

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


  // --- NOVO: LÓGICA DE VALIDAÇÃO DO FORMULÁRIO DE CADASTRO ---
  
  // Seleciona o formulário de registro
  const registrationForm = document.getElementById('registration-form');

  // Este 'if' garante que o código a seguir SÓ tente rodar se
  // estivermos na página que contém o formulário (cadastro.html)
  if (registrationForm) {
    
    // Seleciona os campos e a área de mensagem
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');
    const messageContainer = document.getElementById('form-message');

    // Adiciona um "escutador" para o evento de 'submit' (envio) do formulário
    registrationForm.addEventListener('submit', function(e) {
      // 1. Previne o envio padrão do formulário (que recarregaria a página)
      e.preventDefault(); 
      
      // Reseta qualquer mensagem anterior
      messageContainer.textContent = '';
      messageContainer.className = '';

      // 2. Realiza as validações
      
      // Validação de E-mail
      if (!isValidEmail(email.value)) {
        showMessage('Por favor, insira um e-mail válido (ex: seuemail@dominio.com).', 'error');
        return; // Para a execução se o e-mail for inválido
      }
      
      // Validação de Senha Mínima (Exemplo: 6 caracteres)
      if (password.value.length < 6) {
        showMessage('A senha deve ter pelo menos 6 caracteres.', 'error');
        return; 
      }

      // Validação de Senhas Iguais
      if (password.value !== confirmPassword.value) {
        showMessage('As senhas não coincidem. Tente novamente.', 'error');
        return; // Para a execução se as senhas não baterem
      }

      // 3. Se tudo estiver correto
      showMessage('Cadastro realizado com sucesso! (Simulação)', 'success');
      // Em um projeto real, aqui você enviaria os dados para um backend.
      // registrationForm.submit(); // Descomente esta linha se quiser que o form seja enviado de verdade
    });

    // Função para mostrar mensagens de erro ou sucesso
    function showMessage(message, type) {
      messageContainer.textContent = message;
      if (type === 'error') {
        messageContainer.className = 'error';
      } else {
        messageContainer.className = 'success';
      }
    }

    // Função de verificação de e-mail (básica)
    function isValidEmail(email) {
      // Esta é uma Expressão Regular (Regex) simples para validar e-mails.
      // Ela verifica se o texto tem o formato: [algo]@[algo].[algo]
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }


  // --- INICIALIZAÇÃO (Roda quando a página carrega) ---
  loadThemePreference();
  showWelcomeMessage();

});