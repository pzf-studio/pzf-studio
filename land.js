// Добавляем в функцию animateSocialLinks
function animateSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-icon-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Добавляем наблюдение за появлением подвала
function initFooterObserver() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(footer);
}

// В функции DOMContentLoaded оставляем только вызов
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация Three.js сцены
    initThreeJs();
    
    // Анимация социальных ссылок
    animateSocialLinks();
    
    // Улучшение голографического фона
    enhanceHolographicBg();
    
    // Анимация карточек услуг
    animateServiceCards();
    
    // Обработчики для кнопок CTA
    document.getElementById('headerCta').addEventListener('click', function() {
        document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('heroCta').addEventListener('click', function() {
        document.getElementById('contacts').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Обработчик формы
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Спасибо за вашу заявку! Мы свяжемся с вами в ближайшее время.');
        this.reset();
    });
    
    // Параллакс эффект для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.holographic-bg');
        parallaxElement.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
    
    // Анимация элементов при скролле
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .about-text, .contact-info').forEach(function(el) {
        observer.observe(el);
    });
});

// Остальные функции остаются без изменений
function initThreeJs() {
    const container = document.getElementById('threeJsContainer');
    if (!container) return;
    
    container.innerHTML = '<div style="width:100%; height:100%; display:flex; justify-content:center; align-items:center;"><div style="width:200px; height:200px; background: linear-gradient(45deg, #6e44ff, #0cceeb); border-radius:50%; opacity:0.5; filter: blur(20px);"></div></div>';
}

function enhanceHolographicBg() {
    const bg = document.getElementById('holographicBg');
    if (!bg) return;
    
    const colors = ['#6e44ff', '#0cceeb', '#ef6eae', '#36d6b5'];
    let currentIndex = 0;
    
    setInterval(() => {
        bg.style.background = `linear-gradient(125deg, #0a0a14, ${colors[currentIndex] + '22'}, #16264d, #1c3463)`;
        currentIndex = (currentIndex + 1) % colors.length;
    }, 5000);
}

function animateServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = `linear-gradient(45deg, rgba(110, 68, 255, 0.1), rgba(12, 206, 235, 0.1))`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = `rgba(255, 255, 255, 0.05)`;
        });
    });
}