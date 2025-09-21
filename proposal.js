// proposal.js
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка данных из корзины
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Данные услуг (должны совпадать с shop.js)
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
        },
        {
            id: 9,
            name: "Логотип и айдентика",
            category: "design",
            description: "Разработка уникального логотипа и фирменного стиля для вашего бренда",
            price: 20000,
            features: ["3 концепции логотипа", "Фирменные цвета и шрифты", "Брендбук", "Гайдлайны"],
            icon: "fas fa-palette"
        },
        {
            id: 10,
            name: "UI/UX дизайн",
            category: "design",
            description: "Проектирование пользовательских интерфейсов и опыта взаимодействия",
            price: 45000,
            features: ["Прототипирование", "User research", "Адаптивный дизайн", "Интерактивный прототип"],
            icon: "fas fa-pencil-ruler"
        },
        {
            id: 11,
            name: "Дизайн презентаций",
            category: "design",
            description: "Создание профессиональных презентаций для вашего бизнеса",
            price: 15000,
            features: ["До 20 слайдов", "Анимации", "Брендирование", "Редактируемые файлы"],
            icon: "fas fa-chart-line"
        },
        {
            id: 12,
            name: "SEO-оптимизация",
            category: "marketing",
            description: "Повышение видимости вашего сайта в поисковых системах",
            price: 35000,
            features: ["Аудит сайта", "Ключевые слова", "Техническая оптимизация", "Отчетность"],
            icon: "fas fa-search"
        },
        {
            id: 13,
            name: "Контекстная реклама",
            category: "marketing",
            description: "Настройка и ведение рекламных кампаний в Яндекс.Директ и Google Ads",
            price: 25000,
            features: ["Настройка кампаний", "Аналитика", "A/B тестирование", "Ежемесячный отчет"],
            icon: "fas fa-ad"
        },
        {
            id: 14,
            name: "Аналитика и метрики",
            category: "marketing",
            description: "Настройка систем аналитики для отслеживания эффективности бизнеса",
            price: 20000,
            features: ["Google Analytics", "Яндекс.Метрика", "Настройка целей", "Дашборды"],
            icon: "fas fa-chart-pie"
        },
        {
            id: 15,
            name: "Техническое обслуживание",
            category: "support",
            description: "Регулярное обслуживание и поддержка вашего сайта или приложения",
            price: 10000,
            features: ["Ежемесячное обновление", "Резервное копирование", "Мониторинг", "Техподдержка 24/7"],
            icon: "fas fa-tools"
        },
        {
            id: 16,
            name: "Исправление ошибок",
            category: "support",
            description: "Устранение неполадок и ошибок на существующем сайте или приложении",
            price: 15000,
            features: ["Диагностика проблем", "Исправление багов", "Тестирование", "Гарантия на работу"],
            icon: "fas fa-bug"
        },
        {
            id: 17,
            name: "Техническая консультация",
            category: "consulting",
            description: "Экспертная консультация по выбору технологий и архитектуры проекта",
            price: 5000,
            features: ["1 час консультации", "Технический анализ", "Рекомендации", "Письменный отчет"],
            icon: "fas fa-headset"
        },
        {
            id: 18,
            name: "Стратегия digital-развития",
            category: "consulting",
            description: "Разработка комплексной стратегии цифрового развития вашего бизнеса",
            price: 30000,
            features: ["Анализ рынка", "План развития", "Roadmap", "Ключевые метрики"],
            icon: "fas fa-chess"
        }
    ];
    
    // Инициализация страницы
    initProposalPage();
    
    function initProposalPage() {
        loadSelectedServices();
        setupEventListeners();
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
        const additionalRequirements = document.getElementById('additional-requirements').value;
        
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
        const selectedOptions = document.querySelectorAll('input[name="options"]:checked');
        
        selectedOptions.forEach(option => {
            let optionPrice = 0;
            let optionName = '';
            
            switch(option.value) {
                case 'design':
                    optionPrice = subtotal * 0.15;
                    optionName = 'Индивидуальный дизайн';
                    break;
                case 'support':
                    optionPrice = subtotal * 0.2;
                    optionName = 'Годовая поддержка';
                    break;
                case 'hosting':
                    optionPrice = 5000;
                    optionName = 'Настройка хостинга';
                    break;
                case 'seo':
                    optionPrice = 10000;
                    optionName = 'SEO-оптимизация';
                    break;
            }
            
            optionsTotal += optionPrice;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${optionName}</td>
                <td>Дополнительная опция</td>
                <td>${formatPrice(optionPrice)}</td>
            `;
            servicesTable.appendChild(row);
        });
        
        const total = subtotal + optionsTotal;
        
        // Обновление итогов
        document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
        document.getElementById('summary-options').textContent = formatPrice(optionsTotal);
        document.getElementById('summary-total').textContent = formatPrice(total);
        
        // Заполнение данных клиента
        document.getElementById('client-company').textContent = companyName;
        document.getElementById('client-description').textContent = description;
        
        // Расчет срока выполнения в днях вместо даты
        let daysToComplete = 30; // базовый срок
        if (deadline) {
            const today = new Date();
            const deadlineDate = new Date(deadline);
            const diffTime = Math.abs(deadlineDate - today);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            daysToComplete = Math.max(15, diffDays); // минимум 15 дней
        }
        document.getElementById('proposal-deadline').textContent = `${daysToComplete} рабочих дней`;
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
        
        // Убираем гарантию из условий
        const termsElement = pdfContainer.querySelector('.proposal-terms');
        if (termsElement) {
            termsElement.innerHTML = termsElement.innerHTML.replace(/Гарантия на работы:.*?<br>/g, '');
        }
        
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