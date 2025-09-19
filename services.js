// services.js
document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно
    const modal = document.getElementById('service-modal');
    const serviceButtons = document.querySelectorAll('.service-btn');
    const closeModal = document.querySelector('.close-modal');
    const selectedServiceInput = document.getElementById('selected-service');
    
    const processSteps = document.querySelectorAll('.process-step');
    const stepModal = document.querySelector('.step-details-modal');
    const stepModalTitle = document.getElementById('step-modal-title');
    const stepModalContent = document.getElementById('step-modal-content');
    const closeStepModal = document.querySelector('.close-step-modal');
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    document.body.appendChild(modalOverlay);

    // Данные для каждого этапа
    const stepData = {
        1: {
            title: "Консультация",
            content: `
                <p>На этом этапе мы проводим глубокий анализ вашего бизнеса, определяем цели проекта, целевую аудиторию и основные требования. Составляем техническое задание и согласовываем сроки реализации.</p>
                <ul>
                    <li>Анализ бизнес-процессов</li>
                    <li>Определение целей проекта</li>
                    <li>Составление технического задания</li>
                    <li>Согласование сроков и бюджета</li>
                </ul>
            `
        },
        2: {
            title: "Проектирование",
            content: `
                <p>Разрабатываем прототипы интерфейсов, создаем дизайн-макеты и детализируем техническое задание. Утверждаем каждый этап с вами перед переходом к разработке.</p>
                <ul>
                    <li>Создание прототипов и wireframes</li>
                    <li>Разработка UI/UX дизайна</li>
                    <li>Детализация технического задания</li>
                    <li>Утверждение макетов</li>
                </ul>
            `
        },
        3: {
            title: "Разработка",
            content: `
                <p>Наши разработчики создают продукт согласно утвержденному техническому заданию. Мы используем agile-методологию и предоставляем регулярные отчеты о прогрессе.</p>
                <ul>
                    <li>Frontend и backend разработка</li>
                    <li>Интеграция сторонних сервисов</li>
                    <li>Регулярные демонстрации прогресса</li>
                    <li>Тестирование на каждом этапе</li>
                </ul>
            `
        },
        4: {
            title: "Запуск",
            content: `
                <p>Проводим комплексное тестирование, обучаем вашу команду работе с системой и осуществляем запуск проекта. Обеспечиваем техническую поддержку после запуска.</p>
                <ul>
                    <li>Комплексное тестирование</li>
                    <li>Обучение пользователей</li>
                    <li>Запуск на production-сервере</li>
                    <li>Техническая поддержка</li>
                </ul>
            `
        }
    };

    processSteps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNumber = this.getAttribute('data-step');
            const data = stepData[stepNumber];
            
            stepModalTitle.textContent = data.title;
            stepModalContent.innerHTML = data.content;
            
            // Показываем модальное окно и оверлей
            stepModal.classList.add('active');
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeStepModal.addEventListener('click', closeStepModalFunc);
    modalOverlay.addEventListener('click', closeStepModalFunc);

    function closeStepModalFunc() {
        stepModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Открытие модального окна при клике на кнопку заказа
    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.getAttribute('data-service');
            selectedServiceInput.value = serviceName;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Валидация форм
    const serviceForm = document.getElementById('service-form');
    const ctaForm = document.getElementById('cta-form');
    
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Здесь код для отправки формы
                alert('Спасибо! Ваша заявка на услугу "' + selectedServiceInput.value + '" отправлена. Мы свяжемся с вами в ближайшее время.');
                this.reset();
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Здесь код для отправки формы
                alert('Спасибо! Ваша заявка на консультацию отправлена. Мы свяжемся с вами в ближайшее время.');
                this.reset();
            }
        });
    }
    
    // Функция валидации формы
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'red';
                
                // Убираем подсветку при исправлении
                input.addEventListener('input', () => {
                    if (input.value.trim()) {
                        input.style.borderColor = '';
                    }
                });
            } else {
                input.style.borderColor = '';
            }
        });
        
        return isValid;
    }
    
    // Плавная прокрутка к секциям
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
    
    // Анимация появления элементов при скролле
    const animatedElements = document.querySelectorAll('.service-item, .process-step');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Инициализация стилей для анимации
    animatedElements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.5s, transform 0.5s';
    });
    
    window.addEventListener('scroll', checkScroll);
    // Проверяем при загрузке страницы
    checkScroll();
    
    // Кнопка "Получить консультацию"
    const consultBtn = document.getElementById('consult-btn');
    if (consultBtn) {
        consultBtn.addEventListener('click', () => {
            document.getElementById('services-list').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});