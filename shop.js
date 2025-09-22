// shop.js
document.addEventListener('DOMContentLoaded', function() {
    // Данные услуг - РАСШИРЕННЫЙ АССОРТИМЕНТ
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

    // Элементы DOM
    const servicesGrid = document.getElementById('services-grid');
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.querySelector('.cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const orderModal = document.getElementById('order-modal');
    const closeModal = document.querySelector('.close-modal');
    const orderForm = document.getElementById('order-form');
    const notification = document.getElementById('notification');
    const notificationText = document.querySelector('.notification-text');

    // Корзина
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Инициализация магазина
    function initShop() {
        renderServices();
        updateCart();
        setupEventListeners();
    }

    // Отображение услуг
    function renderServices() {
        servicesGrid.innerHTML = '';
        
        const searchTerm = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;
        const priceValue = priceFilter.value;
        
        const filteredServices = services.filter(service => {
            // Поиск
            const matchesSearch = service.name.toLowerCase().includes(searchTerm) || 
                                 service.description.toLowerCase().includes(searchTerm);
            
            // Категория
            const matchesCategory = categoryValue === 'all' || service.category === categoryValue;
            
            // Цена
            let matchesPrice = true;
            if (priceValue !== 'all') {
                if (priceValue === '0-25000') {
                    matchesPrice = service.price <= 25000;
                } else if (priceValue === '25000-50000') {
                    matchesPrice = service.price > 25000 && service.price <= 50000;
                } else if (priceValue === '50000-100000') {
                    matchesPrice = service.price > 50000 && service.price <= 100000;
                } else if (priceValue === '100000+') {
                    matchesPrice = service.price > 100000;
                }
            }
            
            return matchesSearch && matchesCategory && matchesPrice;
        });
        
        if (filteredServices.length === 0) {
            servicesGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>Услуги не найдены</h3>
                    <p>Попробуйте изменить параметры поиска или фильтры</p>
                </div>
            `;
            return;
        }
        
        filteredServices.forEach(service => {
            const isInCart = cart.some(item => item.id === service.id);
            
            const serviceElement = document.createElement('div');
            serviceElement.classList.add('service-item');
            serviceElement.dataset.id = service.id;
            serviceElement.innerHTML = `
                <div class="service-badge">${getCategoryName(service.category)}</div>
                <div class="service-icon"><i class="${service.icon}"></i></div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <ul class="service-features">
                    ${service.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="service-price">${formatPrice(service.price)} <span>/ проект</span></div>
                <button class="add-to-cart-btn ${isInCart ? 'added' : ''}" data-id="${service.id}">
                    ${isInCart ? 'Добавлено в корзину' : 'Добавить в корзину'}
                </button>
            `;
            
            servicesGrid.appendChild(serviceElement);
        });
    }

    // Получение названия категории
    function getCategoryName(category) {
        const categories = {
            web: 'Веб',
            mobile: 'Мобильное',
            bot: 'Бот',
            crm: 'CRM',
            design: 'Дизайн',
            marketing: 'Маркетинг',
            support: 'Поддержка',
            consulting: 'Консультация'
        };
        return categories[category] || category;
    }

    // Форматирование цены
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(price) + ' руб.';
    }

    // Обновление корзины
    function updateCart() {
        // Обновление счетчика корзины
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Сохранение корзины в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Отображение товаров в корзине
        renderCartItems();
        
        // Обновление итоговой суммы
        updateCartTotals();
    }

    // Отображение товаров в корзине
    function renderCartItems() {
    
        const existingProposalBtn = document.querySelector('.generate-proposal-btn');
        if (existingProposalBtn) {
            existingProposalBtn.remove();
        }
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Ваша корзина пуста</p>
                </div>
            `;
            checkoutBtn.disabled = true;
            return;
        }
        
        checkoutBtn.disabled = false;
        
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const service = services.find(s => s.id === item.id);
            
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <i class="${service.icon}"></i>
                </div>
                <div class="cart-item-info">
                    <h4>${service.name}</h4>
                    <p>${getCategoryName(service.category)}</p>
                </div>
                <div class="cart-item-price">${formatPrice(service.price * item.quantity)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${service.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${service.id}">+</button>
                </div>
                <button class="remove-item" data-id="${service.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        // Создаем кнопку только если есть товары в корзине
        if (cart.length > 0) {
            const generateProposalBtn = document.createElement('button');
            generateProposalBtn.textContent = 'Сформировать КП';
            generateProposalBtn.classList.add('checkout-btn', 'generate-proposal-btn');
            generateProposalBtn.style.marginTop = '1rem';
            generateProposalBtn.style.background = '#4caf50';
            generateProposalBtn.onclick = function() {
                window.location.href = 'proposal.html';
            };

            cartItems.parentNode.insertBefore(generateProposalBtn, cartItems.nextSibling);
        }
    }

    // Обновление итоговой суммы
    function updateCartTotals() {
        const subtotal = cart.reduce((total, item) => {
            const service = services.find(s => s.id === item.id);
            return total + (service.price * item.quantity);
        }, 0);
        
        const tax = subtotal * 0.2; // 20% налог
        const total = subtotal + tax;
        
        subtotalElement.textContent = formatPrice(subtotal);
        taxElement.textContent = formatPrice(tax);
        totalElement.textContent = formatPrice(total);
    }

    // Добавление товара в корзину
    function addToCart(id) {
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, quantity: 1 });
        }
        
        updateCart();
        
        // Обновление кнопки "Добавить в корзину"
        const addButton = document.querySelector(`.add-to-cart-btn[data-id="${id}"]`);
        if (addButton) {
            addButton.classList.add('added');
            addButton.textContent = 'Добавлено в корзину';
        }
        
        showNotification('Услуга добавлена в корзину');
    }

    // Увеличение количества товара
    function increaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity += 1;
            updateCart();
        }
    }

    // Уменьшение количества товара
    function decreaseQuantity(id) {
        const item = cart.find(item => item.id === id);
        if (item) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                removeFromCart(id);
                return;
            }
            updateCart();
        }
    }

    // Удаление товара из корзины
    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        updateCart();
        
        // Обновление кнопки "Добавить в корзину"
        const addButton = document.querySelector(`.add-to-cart-btn[data-id="${id}"]`);
        if (addButton) {
            addButton.classList.remove('added');
            addButton.textContent = 'Добавить в корзину';
        }
        
        showNotification('Услуга удалена из корзины');
    }

    // Показать уведомление
    function showNotification(message) {
        notificationText.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Оформление заказа
    function checkout() {
        if (cart.length === 0) {
            showNotification('Корзина пуста');
            return;
        }
        
        orderModal.style.display = 'flex';
    }

    // Отправка формы заказа
    function submitOrder(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const requirements = document.getElementById('requirements').value;
        const deadline = document.getElementById('deadline').value;
        
        // В реальном приложении здесь был бы AJAX-запрос к серверу
        console.log('Заказ оформлен:', {
            name, email, phone, requirements, deadline,
            cart, 
            total: totalElement.textContent
        });
        
        showNotification('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.');
        
        // Очистка корзины
        cart = [];
        updateCart();
        
        // Сброс формы
        orderForm.reset();
        
        // Закрытие модального окна
        orderModal.style.display = 'none';
        
        // Обновление всех кнопок "Добавить в корзину"
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.classList.remove('added');
            btn.textContent = 'Добавить в корзину';
        });
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        // Фильтры
        searchInput.addEventListener('input', renderServices);
        categoryFilter.addEventListener('change', renderServices);
        priceFilter.addEventListener('change', renderServices);
        
        // Добавление в корзину
        servicesGrid.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart-btn')) {
                const id = parseInt(e.target.dataset.id);
                addToCart(id);
            }
        });
        
        // Управление корзиной
        cartItems.addEventListener('click', function(e) {
            if (e.target.classList.contains('increase')) {
                const id = parseInt(e.target.dataset.id);
                increaseQuantity(id);
            } else if (e.target.classList.contains('decrease')) {
                const id = parseInt(e.target.dataset.id);
                decreaseQuantity(id);
            } else if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
                const id = parseInt(e.target.dataset.id || e.target.closest('.remove-item').dataset.id);
                removeFromCart(id);
            }
        });
        
        // Оформление заказа
        checkoutBtn.addEventListener('click', checkout);
        
        // Модальное окно
        closeModal.addEventListener('click', function() {
            orderModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === orderModal) {
                orderModal.style.display = 'none';
            }
        });
        
        // Форма заказа
        orderForm.addEventListener('submit', submitOrder);
        
        // Кнопка "Наверх"
        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Инициализация магазина
    initShop();
});