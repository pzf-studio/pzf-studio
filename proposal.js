// proposal.js
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из корзины
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Данные услуг (должны совпадать с shop.js)
    const services = [
        // ВЕБ-РАЗРАБОТКА (расширено)
        {
            id: 1,
            name: "Лендинг Премиум",
            category: "web",
            description: "Одностраничный сайт с анимациями и высокой конверсией",
            price: 45000,
            features: ["Адаптивный дизайн", "3D-анимации", "A/B тестирование", "SEO-оптимизация", "Интеграция с CRM"],
            icon: "fas fa-window-restore"
        },
        {
            id: 2,
            name: "Корпоративный сайт",
            category: "web",
            description: "Многостраничный сайт для представления вашей компании",
            price: 80000,
            features: ["До 15 страниц", "CMS система", "Мультиязычность", "Блог", "Формы обратной связи"],
            icon: "fas fa-building"
        },
        {
            id: 3,
            name: "Интернет-магазин",
            category: "web",
            description: "Полнофункциональный онлайн-магазин",
            price: 150000,
            features: ["Неограниченные товары", "Платежные системы", "Инventory management", "Отзывы и рейтинги"],
            icon: "fas fa-shopping-cart"
        },
        {
            id: 4,
            name: "Портал новостей",
            category: "web",
            description: "Новостной портал с системой управления контентом",
            price: 120000,
            features: ["Система тегов", "RSS-ленты", "Модерация", "Комментарии", "Поиск по контенту"],
            icon: "fas fa-newspaper"
        },
        {
            id: 5,
            name: "Образовательная платформа",
            category: "web",
            description: "LMS система для онлайн-обучения",
            price: 200000,
            features: ["Курсы и уроки", "Тесты и экзамены", "Сертификаты", "Видео-хостинг", "Прогресс студентов"],
            icon: "fas fa-graduation-cap"
        },

        // МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ (расширено)
        {
            id: 6,
            name: "iOS приложение",
            category: "mobile",
            description: "Нативное приложение для Apple devices",
            price: 250000,
            features: ["SwiftUI", "App Store публикация", "Push-уведомления", "In-App purchases", "Apple Pay"],
            icon: "fab fa-apple"
        },
        {
            id: 7,
            name: "Android приложение",
            category: "mobile",
            description: "Нативное приложение для Android",
            price: 220000,
            features: ["Kotlin/Java", "Google Play публикация", "Material Design", "Google Pay", "Firebase"],
            icon: "fab fa-android"
        },
        {
            id: 8,
            name: "Кроссплатформенное приложение",
            category: "mobile",
            description: "Приложение для iOS и Android на Flutter/React Native",
            price: 180000,
            features: ["Единый кодобаза", "Нативный performance", "Hot reload", "Публикация в обоих сторах"],
            icon: "fas fa-mobile-alt"
        },
        {
            id: 9,
            name: "Игровое приложение",
            category: "mobile",
            description: "Мобильная игра на Unity/Unreal Engine",
            price: 300000,
            features: ["3D графика", "Мультиплеер", "In-game purchases", "Leaderboards", "Achievements"],
            icon: "fas fa-gamepad"
        },

        // TELEGRAM БОТЫ (расширено)
        {
            id: 10,
            name: "Информационный бот",
            category: "bot",
            description: "Бот для автоматического ответа на вопросы",
            price: 25000,
            features: ["База знаний", "Машинное обучение", "Мультиязычность", "Аналитика", "Интеграция с API"],
            icon: "fab fa-telegram-plane"
        },
        {
            id: 11,
            name: "Торговый бот",
            category: "bot",
            description: "Бот для продаж и приема заказов",
            price: 50000,
            features: ["Каталог товаров", "Корзина", "Оплата", "Уведомления", "CRM интеграция"],
            icon: "fab fa-telegram-plane"
        },
        {
            id: 12,
            name: "Новостной бот",
            category: "bot",
            description: "Бот для рассылки новостей и уведомлений",
            price: 30000,
            features: ["RSS парсинг", "Расписание", "Категории", "Статистика", "Модерация"],
            icon: "fab fa-telegram-plane"
        },

        // CRM СИСТЕМЫ (расширено)
        {
            id: 13,
            name: "Базовая CRM",
            category: "crm",
            description: "Система управления клиентами",
            price: 80000,
            features: ["Клиентская база", "История взаимодействий", "Напоминания", "Отчеты", "Импорт/экспорт"],
            icon: "fas fa-cogs"
        },
        {
            id: 14,
            name: "Расширенная CRM",
            category: "crm",
            description: "Полнофункциональная CRM система",
            price: 150000,
            features: ["Автоматизация", "Воронки продаж", "Email-маркетинг", "Аналитика", "Интеграции"],
            icon: "fas fa-cogs"
        },
        {
            id: 15,
            name: "ERP система",
            category: "crm",
            description: "Enterprise Resource Planning система",
            price: 300000,
            features: ["Финансы", "HR", "Логистика", "Производство", "Бизнес-аналитика"],
            icon: "fas fa-chart-line"
        },

        // ДИЗАЙН И БРЕНДИНГ (расширено)
        {
            id: 16,
            name: "Логотип и айдентика",
            category: "design",
            description: "Разработка фирменного стиля",
            price: 35000,
            features: ["3 концепции", "Брендбук", "Гайдлайны", "Все форматы", "Правки"],
            icon: "fas fa-palette"
        },
        {
            id: 17,
            name: "UI/UX дизайн",
            category: "design",
            description: "Проектирование интерфейсов",
            price: 60000,
            features: ["Прототипы", "User research", "Wireframes", "Design system", "Интерактивный прототип"],
            icon: "fas fa-pencil-ruler"
        },
        {
            id: 18,
            name: "3D дизайн",
            category: "design",
            description: "3D моделирование и визуализация",
            price: 90000,
            features: ["3D модели", "Текстуры", "Анимации", "AR/VR", "Рендеринг"],
            icon: "fas fa-cube"
        },
        {
            id: 19,
            name: "Моушн-дизайн",
            category: "design",
            description: "Анимированная графика",
            price: 70000,
            features: ["2D анимация", "3D анимация", "Explainer video", "Sound design", "Все форматы"],
            icon: "fas fa-film"
        },

        // МАРКЕТИНГ И АНАЛИТИКА (расширено)
        {
            id: 20,
            name: "SEO-оптимизация",
            category: "marketing",
            description: "Продвижение в поисковых системах",
            price: 50000,
            features: ["Аудит сайта", "Ключевые слова", "Технический SEO", "Контент-стратегия", "Отчетность"],
            icon: "fas fa-search"
        },
        {
            id: 21,
            name: "Контекстная реклама",
            category: "marketing",
            description: "Реклама в Яндекс.Директ и Google Ads",
            price: 40000,
            features: ["Настройка кампаний", "А/Б тестирование", "Ретаргетинг", "Аналитика", "Оптимизация"],
            icon: "fas fa-ad"
        },
        {
            id: 22,
            name: "SMM продвижение",
            category: "marketing",
            description: "Продвижение в социальных сетях",
            price: 45000,
            features: ["Стратегия", "Контент-план", "Таргетированная реклама", "Комьюнити-менеджмент", "Аналитика"],
            icon: "fas fa-hashtag"
        },
        {
            id: 23,
            name: "Email-маркетинг",
            category: "marketing",
            description: "Рассылки и автоматизация",
            price: 35000,
            features: ["Стратегия", "Шаблоны", "Автоматизация", "A/B тесты", "Аналитика"],
            icon: "fas fa-envelope"
        },

        // ТЕХНИЧЕСКАЯ ПОДДЕРЖКА (расширено)
        {
            id: 24,
            name: "Техническое обслуживание",
            category: "support",
            description: "Постоянная поддержка сайта/приложения",
            price: 15000,
            features: ["Мониторинг", "Резервное копирование", "Обновления", "Безопасность", "Техподдержка 24/7"],
            icon: "fas fa-tools"
        },
        {
            id: 25,
            name: "Исправление ошибок",
            category: "support",
            description: "Устранение неполадок",
            price: 20000,
            features: ["Диагностика", "Исправление багов", "Тестирование", "Документация", "Гарантия"],
            icon: "fas fa-bug"
        },
        {
            id: 26,
            name: "Миграция данных",
            category: "support",
            description: "Перенос на новые системы",
            price: 30000,
            features: ["Анализ данных", "Миграция", "Тестирование", "Обучение", "Поддержка"],
            icon: "fas fa-database"
        },

        // КОНСУЛЬТАЦИИ (расширено)
        {
            id: 27,
            name: "Техническая консультация",
            category: "consulting",
            description: "Экспертная консультация",
            price: 8000,
            features: ["1 час консультации", "Технический анализ", "Рекомендации", "Письменный отчет", "Follow-up"],
            icon: "fas fa-headset"
        },
        {
            id: 28,
            name: "Стратегия digital-развития",
            category: "consulting",
            description: "Комплексная стратегия",
            price: 50000,
            features: ["Анализ рынка", "Roadmap", "KPI", "Бюджетирование", "Реализация"],
            icon: "fas fa-chess"
        },
        {
            id: 29,
            name: "Аудит проекта",
            category: "consulting",
            description: "Комплексный аудит",
            price: 35000,
            features: ["Технический аудит", "Бизнес-аудит", "Рекомендации", "План действий", "Приоритизация"],
            icon: "fas fa-chart-bar"
        },

        // НОВЫЕ КАТЕГОРИИ
        // БЛОКЧЕЙН И WEB3
        {
            id: 30,
            name: "Смарт-контракты",
            category: "blockchain",
            description: "Разработка смарт-контрактов",
            price: 120000,
            features: ["Solidity/Rust", "Audit", "Deployment", "Testing", "Documentation"],
            icon: "fas fa-link"
        },
        {
            id: 31,
            name: "NFT маркетплейс",
            category: "blockchain",
            description: "Платформа для торговли NFT",
            price: 250000,
            features: ["Minting", "Marketplace", "Wallet integration", "Royalties", "Gas optimization"],
            icon: "fas fa-coins"
        },

        // ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ
        {
            id: 32,
            name: "Чат-бот с AI",
            category: "ai",
            description: "Умный чат-бот с машинным обучением",
            price: 90000,
            features: ["NLP", "Machine Learning", "Training", "Integration", "Analytics"],
            icon: "fas fa-robot"
        },
        {
            id: 33,
            name: "Рекомендательная система",
            category: "ai",
            description: "Система персональных рекомендаций",
            price: 150000,
            features: ["Algorithms", "Data processing", "Personalization", "A/B testing", "Dashboard"],
            icon: "fas fa-brain"
        },

        // AR/VR РАЗРАБОТКА
        {
            id: 34,
            name: "AR приложение",
            category: "arvr",
            description: "Приложение дополненной реальности",
            price: 180000,
            features: ["3D models", "Markerless AR", "Multiplatform", "Cloud recognition", "Analytics"],
            icon: "fas fa-vr-cardboard"
        },
        {
            id: 35,
            name: "VR опыт",
            category: "arvr",
            description: "Виртуальная реальность",
            price: 220000,
            features: ["Immersive experience", "3D environment", "Interactions", "Multiplayer", "Hardware integration"],
            icon: "fas fa-vr-cardboard"
        },

        // КИБЕРБЕЗОПАСНОСТЬ
        {
            id: 36,
            name: "Пентест",
            category: "security",
            description: "Тестирование на проникновение",
            price: 60000,
            features: ["Vulnerability assessment", "Penetration testing", "Report", "Remediation", "Follow-up"],
            icon: "fas fa-shield-alt"
        },
        {
            id: 37,
            name: "Аудит безопасности",
            category: "security",
            description: "Комплексный аудит безопасности",
            price: 80000,
            features: ["Code review", "Infrastructure audit", "Compliance", "Recommendations", "Implementation"],
            icon: "fas fa-user-shield"
        },

        // ОБЛАЧНЫЕ ТЕХНОЛОГИИ
        {
            id: 38,
            name: "Миграция в облако",
            category: "cloud",
            description: "Перенос инфраструктуры в облако",
            price: 100000,
            features: ["Architecture design", "Migration", "Optimization", "Monitoring", "Cost management"],
            icon: "fas fa-cloud"
        },
        {
            id: 39,
            name: "DevOps настройка",
            category: "cloud",
            description: "Настройка CI/CD и инфраструктуры",
            price: 120000,
            features: ["CI/CD pipeline", "Containerization", "Orchestration", "Monitoring", "Automation"],
            icon: "fas fa-server"
        },

        // ИНТЕРНЕТ ВЕЩЕЙ (IoT)
        {
            id: 40,
            name: "IoT платформа",
            category: "iot",
            description: "Платформа для умных устройств",
            price: 200000,
            features: ["Device management", "Data processing", "Dashboards", "Alerts", "Integration"],
            icon: "fas fa-microchip"
        },
        {
            id: 41,
            name: "Умный дом",
            category: "iot",
            description: "Система умного дома",
            price: 150000,
            features: ["Automation", "Mobile app", "Voice control", "Energy management", "Security"],
            icon: "fas fa-home"
        },

        // БИГ ДАТА И АНАЛИТИКА
        {
            id: 42,
            name: "Data Lake",
            category: "data",
            description: "Хранилище больших данных",
            price: 180000,
            features: ["Data ingestion", "Storage", "Processing", "Visualization", "ML integration"],
            icon: "fas fa-database"
        },
        {
            id: 43,
            name: "Бизнес-аналитика",
            category: "data",
            description: "Система аналитики и отчетности",
            price: 120000,
            features: ["ETL", "Dashboards", "KPIs", "Predictive analytics", "Custom reports"],
            icon: "fas fa-chart-pie"
        },

        // ЭЛЕКТРОННАЯ КОММЕРЦИЯ
        {
            id: 44,
            name: "Marketplace",
            category: "ecommerce",
            description: "Многопользовательская площадка",
            price: 250000,
            features: ["Multi-vendor", "Escrow system", "Reviews", "Dispute resolution", "Analytics"],
            icon: "fas fa-store"
        },
        {
            id: 45,
            name: "Система бронирования",
            category: "ecommerce",
            description: "Онлайн-бронирование услуг",
            price: 150000,
            features: ["Calendar", "Payments", "Notifications", "CRM integration", "Mobile app"],
            icon: "fas fa-calendar-check"
        },

        // КОРПОРАТИВНЫЕ РЕШЕНИЯ
        {
            id: 46,
            name: "Интранет портал",
            category: "enterprise",
            description: "Корпоративный портал",
            price: 180000,
            features: ["Document management", "Collaboration", "Workflows", "HR tools", "Analytics"],
            icon: "fas fa-building"
        },
        {
            id: 47,
            name: "Система документооборота",
            category: "enterprise",
            description: "Электронный документооборот",
            price: 120000,
            features: ["Workflows", "E-signature", "Version control", "Audit trail", "Integration"],
            icon: "fas fa-file-contract"
        },

        // ОБРАЗОВАТЕЛЬНЫЕ ТЕХНОЛОГИИ
        {
            id: 48,
            name: "EdTech платформа",
            category: "edtech",
            description: "Образовательная технология",
            price: 200000,
            features: ["LMS", "Content management", "Gamification", "Certification", "Mobile learning"],
            icon: "fas fa-book-open"
        },
        {
            id: 49,
            name: "Виртуальный класс",
            category: "edtech",
            description: "Онлайн-обучение в реальном времени",
            price: 150000,
            features: ["Video conferencing", "Whiteboard", "Screen sharing", "Recording", "Interactive tools"],
            icon: "fas fa-chalkboard-teacher"
        },

        // ФИНТЕХ РЕШЕНИЯ
        {
            id: 50,
            name: "Платежный шлюз",
            category: "fintech",
            description: "Интеграция платежных систем",
            price: 120000,
            features: ["Multiple providers", "Recurring payments", "Fraud detection", "Reporting", "Compliance"],
            icon: "fas fa-credit-card"
        },
        {
            id: 51,
            name: "Блокчейн кошелек",
            category: "fintech",
            description: "Криптовалютный кошелек",
            price: 100000,
            features: ["Multi-currency", "Security", "Exchange integration", "Mobile app", "Backup"],
            icon: "fas fa-wallet"
        }
    ];
    
    // Инициализация страницы
    initProposalPage();
    
    function initProposalPage() {
        loadSelectedServices();
        setupEventListeners();
        setupOptionSliders();
        setCurrentDate();
    }
    
    function loadSelectedServices() {
        const selectedServicesContainer = document.getElementById('selected-services');
        
        if (cart.length === 0) {
            selectedServicesContainer.innerHTML = `
                <div class="empty-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Корзина пуста. Вернитесь в <a href="shop.html">магазин</a> чтобы выбрать услуги.</p>
                </div>
            `;
            return;
        }
        
        selectedServicesContainer.innerHTML = '';
        
        cart.forEach(item => {
            const service = services.find(s => s.id === item.id);
            if (service) {
                const serviceElement = document.createElement('div');
                serviceElement.classList.add('selected-service');
                serviceElement.innerHTML = `
                    <div class="service-info">
                        <h4>${service.name}</h4>
                        <p>${service.description}</p>
                    </div>
                    <div class="service-price">${formatPrice(service.price * item.quantity)}</div>
                `;
                selectedServicesContainer.appendChild(serviceElement);
            }
        });
    }
    
    function setupEventListeners() {
        // Навигация между шагами
        window.nextStep = function(stepNumber) {
            document.querySelectorAll('.proposal-step').forEach(step => {
                step.classList.add('hidden');
            });
            document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
            
            document.querySelectorAll('.step').forEach((step, index) => {
                step.classList.remove('active');
                if (index === stepNumber - 1) {
                    step.classList.add('active');
                }
            });
        };
        
        window.prevStep = function(stepNumber) {
            document.querySelectorAll('.proposal-step').forEach(step => {
                step.classList.add('hidden');
            });
            document.getElementById(`step-${stepNumber}`).classList.remove('hidden');
            
            document.querySelectorAll('.step').forEach((step, index) => {
                step.classList.remove('active');
                if (index === stepNumber - 1) {
                    step.classList.add('active');
                }
            });
        };
    }
    
    function setupOptionSliders() {
        // Обработчики для слайдеров
        const sliders = document.querySelectorAll('.option-slider');
        sliders.forEach(slider => {
            slider.addEventListener('input', function() {
                updateSliderValue(this);
                // Автоматически пересчитываем стоимость при изменении слайдера
                if (document.getElementById('company-name').value) {
                    calculateProposal(
                        document.getElementById('company-name').value,
                        document.getElementById('project-description').value,
                        document.getElementById('project-deadline').value
                    );
                }
            });
            
            // Инициализируем значения при загрузке
            updateSliderValue(slider);
        });
        
        // Обработчики для переключателей
        const toggles = document.querySelectorAll('.toggle-switch input');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', function() {
                const parent = this.closest('.option-toggle-group');
                if (this.checked) {
                    parent.classList.add('active');
                } else {
                    parent.classList.remove('active');
                }
                // Автоматически пересчитываем стоимость при изменении переключателя
                if (document.getElementById('company-name').value) {
                    calculateProposal(
                        document.getElementById('company-name').value,
                        document.getElementById('project-description').value,
                        document.getElementById('project-deadline').value
                    );
                }
            });
        });
    }
    
    function updateSliderValue(slider) {
        const valueDisplay = document.getElementById(`${slider.id.replace('-slider', '-value')}`);
        if (valueDisplay) {
            valueDisplay.textContent = slider.value;
        }
        
        // Подсветка активного слайдера
        const parent = slider.closest('.option-slider-group');
        if (slider.value > 0) {
            parent.classList.add('active');
        } else {
            parent.classList.remove('active');
        }
    }
    
    function setCurrentDate() {
        const now = new Date();
        document.getElementById('proposal-date').textContent = 
            now.toLocaleDateString('ru-RU');
        
        // Генерация номера предложения
        document.getElementById('proposal-number').textContent = 
            `PZF-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    }
    
    window.generateProposal = function() {
        // Валидация формы
        const form = document.getElementById('project-details-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Сбор данных формы
        const companyName = document.getElementById('company-name').value;
        const projectDescription = document.getElementById('project-description').value;
        const deadline = document.getElementById('project-deadline').value;
        
        // Расчет стоимости
        calculateProposal(companyName, projectDescription, deadline);
        
        // Переход к шагу 3
        nextStep(3);
    };
    
    function calculateProposal(companyName, description, deadline) {
        let subtotal = 0;
        const servicesTable = document.getElementById('services-table').querySelector('tbody');
        servicesTable.innerHTML = '';
        
        // Добавление основных услуг
        cart.forEach(item => {
            const service = services.find(s => s.id === item.id);
            if (service) {
                const serviceTotal = service.price * item.quantity;
                subtotal += serviceTotal;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${service.name}</td>
                    <td>${service.description}</td>
                    <td>${formatPrice(serviceTotal)}</td>
                `;
                servicesTable.appendChild(row);
            }
        });
        
        // Расчет дополнительных опций
        let optionsTotal = 0;
        
        // Обработка слайдеров
        const designSlider = document.getElementById('design-slider');
        if (designSlider && designSlider.value > 0) {
            const designValue = parseInt(designSlider.value);
            const designPrice = subtotal * (designValue / 100);
            optionsTotal += designPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Индивидуальный дизайн</td>
                <td>Уровень кастомизации: ${designValue}%</td>
                <td>${formatPrice(designPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const supportSlider = document.getElementById('support-slider');
        if (supportSlider && supportSlider.value > 0) {
            const supportValue = parseInt(supportSlider.value);
            const supportPrice = supportValue * 5000; // 5000 руб. за месяц
            optionsTotal += supportPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Техническая поддержка</td>
                <td>Продолжительность: ${supportValue} месяцев</td>
                <td>${formatPrice(supportPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const languagesSlider = document.getElementById('languages-slider');
        if (languagesSlider && languagesSlider.value > 0) {
            const languagesValue = parseInt(languagesSlider.value);
            const languagesPrice = languagesValue * 7000; // 7000 руб. за язык
            optionsTotal += languagesPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Мультиязычная версия</td>
                <td>Количество языков: ${languagesValue}</td>
                <td>${formatPrice(languagesPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const adminPagesSlider = document.getElementById('admin-pages-slider');
        if (adminPagesSlider && adminPagesSlider.value > 0) {
            const adminPagesValue = parseInt(adminPagesSlider.value);
            const adminPagesPrice = adminPagesValue * 3000; // 3000 руб. за страницу
            optionsTotal += adminPagesPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Страницы админ-панели</td>
                <td>Количество страниц: ${adminPagesValue}</td>
                <td>${formatPrice(adminPagesPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const prioritySlider = document.getElementById('priority-slider');
        if (prioritySlider && prioritySlider.value > 0) {
            const priorityValue = parseInt(prioritySlider.value);
            const priorityPrice = subtotal * (priorityValue / 100);
            optionsTotal += priorityPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Приоритетная разработка</td>
                <td>Ускорение на ${priorityValue}%</td>
                <td>${formatPrice(priorityPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        // Обработка переключателей
        const hostingToggle = document.getElementById('hosting-toggle');
        if (hostingToggle && hostingToggle.checked) {
            const hostingPrice = 5000;
            optionsTotal += hostingPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Настройка хостинга и домена</td>
                <td>Полная настройка инфраструктуры</td>
                <td>${formatPrice(hostingPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const seoToggle = document.getElementById('seo-toggle');
        if (seoToggle && seoToggle.checked) {
            const seoPrice = 10000;
            optionsTotal += seoPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>SEO-оптимизация</td>
                <td>Базовая поисковая оптимизация</td>
                <td>${formatPrice(seoPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const mobileToggle = document.getElementById('mobile-toggle');
        if (mobileToggle && mobileToggle.checked) {
            const mobilePrice = 15000;
            optionsTotal += mobilePrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Адаптация под мобильные устройства</td>
                <td>Полная мобильная адаптация</td>
                <td>${formatPrice(mobilePrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const crmToggle = document.getElementById('crm-toggle');
        if (crmToggle && crmToggle.checked) {
            const crmPrice = 20000;
            optionsTotal += crmPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Интеграция с CRM</td>
                <td>Подключение к CRM-системе</td>
                <td>${formatPrice(crmPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const analyticsToggle = document.getElementById('analytics-toggle');
        if (analyticsToggle && analyticsToggle.checked) {
            const analyticsPrice = 12000;
            optionsTotal += analyticsPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>Аналитика и отчетность</td>
                <td>Расширенная система аналитики</td>
                <td>${formatPrice(analyticsPrice)}</td>
            `;
            servicesTable.appendChild(row);
        }
        
        const total = subtotal + optionsTotal;
        
        // Обновление итогов
        document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
        document.getElementById('summary-options').textContent = formatPrice(optionsTotal);
        document.getElementById('summary-total').textContent = formatPrice(total);
        
        // Заполнение данных клиента
        document.getElementById('client-company').textContent = companyName;
        document.getElementById('client-description').textContent = description;
        
        // Расчет срока выполнения
        let daysToComplete = calculateProjectDays(subtotal, optionsTotal);
        if (deadline) {
            const today = new Date();
            const deadlineDate = new Date(deadline);
            const diffTime = Math.abs(deadlineDate - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            daysToComplete = Math.max(daysToComplete, diffDays);
        }
        
        // Учет приоритета в сроках
        if (prioritySlider && prioritySlider.value > 0) {
            const priorityReduction = parseInt(prioritySlider.value) / 100;
            daysToComplete = Math.max(7, Math.floor(daysToComplete * (1 - priorityReduction)));
        }
        
        document.getElementById('proposal-deadline').textContent = `${daysToComplete} рабочих дней`;
    }
    
    // Функция для расчета базового срока выполнения
    function calculateProjectDays(subtotal, optionsTotal) {
        const total = subtotal + optionsTotal;
        
        if (total < 50000) return 14;
        if (total < 100000) return 21;
        if (total < 200000) return 30;
        if (total < 500000) return 45;
        return 60;
    }
    
    window.downloadPDF = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Создаем копию элемента для PDF
        const proposalElement = document.getElementById('proposal-preview');
        const pdfContainer = document.createElement('div');
        pdfContainer.style.width = '800px';
        pdfContainer.style.padding = '20px';
        pdfContainer.style.fontFamily = 'Arial, sans-serif';
        pdfContainer.style.color = '#333333';
        pdfContainer.style.backgroundColor = '#ffffff';
        pdfContainer.style.position = 'relative';
        
        // Клонируем содержимое
        pdfContainer.innerHTML = proposalElement.innerHTML;
        
        // Добавляем водяной знак поверх всего содержимого
        const watermark = document.createElement('div');
        watermark.style.position = 'absolute';
        watermark.style.top = '50%';
        watermark.style.left = '50%';
        watermark.style.transform = 'translate(-50%, -50%) rotate(-45deg)';
        watermark.style.fontSize = '80px';
        watermark.style.fontWeight = 'bold';
        watermark.style.color = 'rgba(110, 69, 226, 0.1)';
        watermark.style.zIndex = '1000';
        watermark.style.pointerEvents = 'none';
        watermark.textContent = 'PZF-STUDIO';
        pdfContainer.appendChild(watermark);
        
        // Улучшаем стили таблицы
        const table = pdfContainer.querySelector('table');
        if (table) {
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.margin = '20px 0';
            
            const thCells = table.querySelectorAll('th');
            thCells.forEach(th => {
                th.style.backgroundColor = '#6e45e2';
                th.style.color = 'white';
                th.style.padding = '12px';
                th.style.border = '1px solid #ddd';
            });
            
            const tdCells = table.querySelectorAll('td');
            tdCells.forEach(td => {
                td.style.padding = '10px';
                td.style.border = '1px solid #ddd';
            });
        }
        
        // Улучшаем блок с итогами
        const summary = pdfContainer.querySelector('.proposal-summary');
        if (summary) {
            summary.style.backgroundColor = '#f8f9fa';
            summary.style.padding = '20px';
            summary.style.borderRadius = '8px';
            summary.style.margin = '20px 0';
        }
        
        // Добавляем временный контейнер в DOM
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.appendChild(pdfContainer);
        document.body.appendChild(tempContainer);
        
        html2canvas(pdfContainer, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png', 1.0);
            const imgWidth = doc.internal.pageSize.getWidth();
            let imgHeight = canvas.height * imgWidth / canvas.width;
            
            // Добавляем основное содержимое
            doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            
            // Добавляем дополнительную информацию на новые страницы
            let currentHeight = imgHeight;
            const pageHeight = doc.internal.pageSize.getHeight();
            
            if (currentHeight > pageHeight) {
                // Если контент не поместился, добавляем новую страницу
                doc.addPage();
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                
                const additionalInfo = [
                    'Условия сотрудничества:',
                    '• Этапы оплаты: 50% предоплата, 50% по завершению проекта',
                    '• Техническая поддержка: 1 месяц бесплатно после сдачи проекта',
                    '',
                    'Процесс работы:',
                    '1. Обсуждение проекта и согласование технического задания',
                    '2. Подписание договора и внесение предоплаты',
                    '3. Разработка и согласование этапов работы',
                    '4. Сдача проекта и финальный платеж',
                    '5. Техническая поддержка (при необходимости)'
                ];
                
                let yPosition = 20;
                additionalInfo.forEach(line => {
                    if (yPosition > pageHeight - 20) {
                        doc.addPage();
                        yPosition = 20;
                    }
                    doc.text(line, 20, yPosition);
                    yPosition += 8;
                });
            }
            
            // Удаляем временный контейнер
            document.body.removeChild(tempContainer);
            
            // Сохраняем PDF
            const fileName = `Коммерческое_предложение_PZF-Studio_${new Date().toLocaleDateString('ru-RU')}.pdf`;
            doc.save(fileName);
            
            showNotification('PDF успешно скачан!');
        }).catch(error => {
            console.error('Ошибка генерации PDF:', error);
            showNotification('Ошибка при создании PDF');
            document.body.removeChild(tempContainer);
        });
    };
    
    function showNotification(message) {
        const notification = document.getElementById('notification');
        const notificationText = document.querySelector('.notification-text');
        
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Функция форматирования цены
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' руб.';
    }
});