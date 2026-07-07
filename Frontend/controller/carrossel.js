// Carrossel de imagens da página principal
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carrossel .slide');
  const dots = document.querySelectorAll('.dotsCarrossel .dot');

  const intervaloTempo = 2000; // troca a cada 5 segundos
  let indiceAtual = 0;
  let temporizador;

  function mostrarSlide(indice) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[indice].classList.add('active');
    dots[indice].classList.add('active');

    indiceAtual = indice;
  }

  function proximoSlide() {
    const novoIndice = (indiceAtual + 1) % slides.length;
    mostrarSlide(novoIndice);
  }

  function iniciarAutoPlay() {
    temporizador = setInterval(proximoSlide, intervaloTempo);
  }

  function reiniciarAutoPlay() {
    clearInterval(temporizador);
    iniciarAutoPlay();
  }

  // Clique nas bolinhas leva direto para o slide escolhido
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const indice = parseInt(dot.dataset.slide, 10);
      mostrarSlide(indice);
      reiniciarAutoPlay();
    });
  });

  iniciarAutoPlay();
});