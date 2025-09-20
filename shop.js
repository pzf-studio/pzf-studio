// shop.js
document.addEventListener('DOMContentLoaded', function() {
    // Данные услуг
    const services = [
        {
            id: 1,
            name: "Лендинг",
            category: "web",
            description: "Одностраничный сайт для презентации вашего продукта или услуги",
            price: 25000,
            features: ["Адаптивный дизайн", "SEO-оптимизация", "Форма обратной связи", "Интеграция с аналитикой"],
            icon: "fas fa-window-restore"
        },
        {
            id: 2,
            name: "Корпоративный сайт",
            category: "web",
            description: "Многостраничный сайт для представления вашей компании в интернете",
            price: 50000,
            features: ["До 10 страниц", "Система управления контентом", "Адаптивный дизайн", "Формы обратной связи"],
            icon: "fas fa-building"
        },
        {
            id: 3,
            name: "Интернет-магазин",
            category: "web",
            description: "Полнофункциональный онлайн-магазин для вашего бизнеса",
            price: 100000,
            features: ["Каталог товаров", "Корзина и оформление заказа", "Платежная система", "Панель администратора"],
            icon: "fas fa-shopping-cart"
        },
        {
            id: 4,
            name: "Мобильное приложение",
            category: "mobile",
            description: "Кроссплатформенное приложение для iOS и Android",
            price: 150000,
            features: ["Кроссплатформенность", "Нативные элементы UI", "Интеграция с API", "Публикация в магазинах"],
            icon: "fas fa-mobile-alt"
        },
        {
            id: 5,
            name: "Информационный бот",
            category: "bot",
            description: "Telegram-бот для автоматического ответа на частые вопросы",
            price: 15000,
            features: ["База знаний", "Меню команд", "Интеграция с сайтом", "Статистика запросов"],
            icon: "fab fa-telegram-plane"
        },
        {
            id: 6,
            name: "Торговый бот",
            category: "bot",
            description: "Telegram-бот для приема заказов и обработки платежей",
            price: 30000,
            features: ["Каталог товаров", "Корзина покупок", "Прием платежей", "Уведомления о заказах"],
            icon: "fab fa-telegram-plane"
        },
        {
            id: 7,
            name: "Базовая CRM",
            category: "crm",
            description: "Система управления взаимоотношениями с клиентами",
            price: 60000,
            features: ["Управление контактами", "История взаимодействий", "Напоминания", "Базовая аналитика"],
            icon: "fas fa-cogs"
        },
        {
            id: 8,
            name: "Расширенная CRM",
            category: "crm",
            description: "Полнофункциональная CRM система с интеграциями",
            price: 120000,
            features: ["Все функции базовой CRM", "Интеграция с телефонией", "Email-рассылки", "Расширенная аналитика"],
            icon: "fas fa-cogs"
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
            crm: 'CRM'
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