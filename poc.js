// process.js
// Скрипт для страницы процесса работы

document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления этапов при скролле
    const processPhases = document.querySelectorAll('.process-phase');
    
    function animateOnScroll() {
        processPhases.forEach(phase => {
            const phasePosition = phase.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (phasePosition < screenPosition) {
                phase.style.opacity = 1;
                phase.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Инициализация стилей для анимации
    processPhases.forEach(phase => {
        phase.style.opacity = 0;
        phase.style.transform = 'translateX(-50px)';
        phase.style.transition = 'opacity 0.8s, transform 0.8s';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    // Проверяем при загрузке страницы
    animateOnScroll();
    
    // Раскрытие/сворачивание деталей этапа
    const phaseHeaders = document.querySelectorAll('.phase-header');
    
    phaseHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const phaseContent = header.nextElementSibling;
            phaseContent.classList.toggle('active');
            
            // Плавная анимация высоты
            if (phaseContent.style.maxHeight) {
                phaseContent.style.maxHeight = null;
            } else {
                phaseContent.style.maxHeight = phaseContent.scrollHeight + "px";
            }
        });
    });
    
    // Инициализация максимальной высоты для открытого первого элемента
    const firstPhaseContent = document.querySelector('.phase-content');
    if (firstPhaseContent) {
        firstPhaseContent.style.maxHeight = firstPhaseContent.scrollHeight + "px";
        firstPhaseContent.classList.add('active');
    }
    
    // Параллакс эффект для герой секции
    const processHero = document.querySelector('.process-hero');
    
    if (processHero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            processHero.style.backgroundPosition = `center ${rate}px`;
        });
    }
    
    // Анимация чисел преимуществ
    const advantageNumbers = document.querySelectorAll('.advantage-number');
    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Запуск анимации чисел при попадании в область видимости
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const targetValue = parseInt(number.getAttribute('data-value'));
                animateValue(number, 0, targetValue, 2000);
                observer.unobserve(number);
            }
        });
    }, { threshold: 0.5 });
    
    advantageNumbers.forEach(number => {
        observer.observe(number);
    });
    
    // Кнопка "Наверх"
    const scrollButton = document.querySelector('.scroll-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Интерактив для сравнительной таблицы
    const comparisonRows = document.querySelectorAll('.comparison-row');
    
    comparisonRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = 'rgba(255, 255, 255, 0.03)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});