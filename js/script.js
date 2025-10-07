// Este código JavaScript será executado quando a página HTML estiver totalmente carregada.
document.addEventListener('DOMContentLoaded', function() {

  // --- Efeito de Rolagem Suave para Links de Âncora ---

  // Seleciona todos os links que começam com '#' (links de âncora)
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  // Para cada um desses links encontrados:
  smoothScrollLinks.forEach(link => {
    // Adiciona um evento que escuta o clique do mouse
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Impede o comportamento padrão do link (que é pular instantaneamente)

      // Pega o valor do atributo 'href' (ex: "#topo", "#rpg")
      let targetId = this.getAttribute('href');
      // Encontra o elemento na página que tem o ID correspondente
      let targetElement = document.querySelector(targetId);

      // Se o elemento foi encontrado:
      if (targetElement) {
        // Rola a página suavemente até o elemento
        targetElement.scrollIntoView({
          behavior: 'smooth', // Define a rolagem como suave
          block: 'start'     // Alinha o topo do elemento com o topo da janela visível
        });
      }
    });
  });

  // --- Botão Flutuante "Voltar ao Topo" ---

  // Seleciona o botão "Voltar ao Topo" usando seu ID
  const backToTopButton = document.querySelector('#back-to-top');

  // Adiciona um evento que escuta a rolagem da janela
  window.onscroll = function() {
    // Se a posição de rolagem do corpo da página (ou do elemento raiz do documento)
    // for maior que 100 pixels (ou seja, se o usuário rolou para baixo o suficiente)
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      backToTopButton.style.display = "block"; // Torna o botão visível
    } else {
      backToTopButton.style.display = "none"; // Esconde o botão
    }
  };

  // O clique no próprio botão flutuante já é tratado pelo smoothScrollLinks acima
  // porque ele também é um link de âncora com href="#topo"
});