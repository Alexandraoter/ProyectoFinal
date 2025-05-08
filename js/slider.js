document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.querySelector('.slides-container');
    const slides = slidesContainer ? Array.from(slidesContainer.children) : [];
    const dotsContainer = document.querySelector('.slider-dots');
    const nextButton = document.querySelector('.slider-nav.next');
    const prevButton = document.querySelector('.slider-nav.prev');
    let currentIndex = 0;
    let slideInterval;
    const autoPlayDelay = 5000; // Tiempo en milisegundos (5 segundos)

    if (slides.length <= 1) { // No necesita carrusel si hay 0 o 1 slide
        if (dotsContainer) dotsContainer.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (prevButton) prevButton.style.display = 'none';
        return;
    }

    // Crear puntos de navegación
    if (dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir al slide ${index + 1}`);
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
    }
    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

    function updateSlidePosition() {
        if (slidesContainer) {
            slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }

    function updateDots() {
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[currentIndex]) {
                dots[currentIndex].classList.add('active');
            }
        }
    }

    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        updateSlidePosition();
        updateDots();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    // Auto-play
    function startInterval() {
        slideInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Inicializar slider
    updateSlidePosition();
    updateDots();
    startInterval();

    // Pausar en hover (opcional pero recomendado)
    if (slidesContainer) {
        slidesContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slidesContainer.addEventListener('mouseleave', startInterval);
    }
});