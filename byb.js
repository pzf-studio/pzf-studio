// byb.js
document.addEventListener('DOMContentLoaded', function() {
    // Конфигурация биржи
    const config = {
        basePrice: 2.00,        // Базовая цена в BTC
        minPrice: 1.00,         // Минимальная цена
        maxPrice: 3.00,         // Максимальная цена
        minStep: 0.001,          // Минимальный шаг изменения
        maxStep: 1.0,           // Максимальный шаг изменения
        updateInterval: 10000,   // Интервал обновления (1 минута)
        rubPerBtc: 100000       // Курс 1 BTC = 100 000 руб
    };

    // Текущее состояние
    let currentPrice = config.basePrice;
    let priceHistory = [config.basePrice];
    let timerValue = 60;
    let timerInterval;
    let chart;

    // Элементы DOM
    const elements = {
        currentPrice: document.getElementById('current-price'),
        priceRub: document.getElementById('price-rub'),
        changeIndicator: document.getElementById('change-indicator'),
        changeAmount: document.getElementById('change-amount'),
        changePercent: document.getElementById('change-percent'),
        nextChange: document.getElementById('next-change'),
        timer: document.getElementById('timer'),
        timerFill: document.querySelector('.timer-circle-fill'),
        buyButton: document.getElementById('buy-button')
    };

    // Инициализация графика
    function initChart() {
        const ctx = document.getElementById('price-chart').getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from({length: priceHistory.length}, (_, i) => i + 1),
                datasets: [{
                    label: 'Цена (BTC)',
                    data: priceHistory,
                    borderColor: '#6e45e2',
                    backgroundColor: 'rgba(110, 69, 226, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        display: true,
                        min: config.minPrice - 0.1,
                        max: config.maxPrice + 0.1
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Генерация случайного изменения цены
    function generatePriceChange() {
        const changeDirection = Math.random() > 0.5 ? 1 : -1;
        const changeAmount = (Math.random() * (config.maxStep - config.minStep) + config.minStep) * changeDirection;
        
        let newPrice = currentPrice + changeAmount;
        
        // Проверка границ
        if (newPrice < config.minPrice || newPrice > config.maxPrice) {
            newPrice = config.basePrice;
        }
        
        return parseFloat(newPrice.toFixed(2));
    }

    // Обновление цены
    function updatePrice() {
        const oldPrice = currentPrice;
        currentPrice = generatePriceChange();
        
        // Добавление в историю
        priceHistory.push(currentPrice);
        if (priceHistory.length > 20) {
            priceHistory.shift();
        }
        
        // Обновление интерфейса
        updateUI(oldPrice);
        
        // Обновление графика
        updateChart();
    }

    // Обновление интерфейса
    function updateUI(oldPrice) {
        // Обновление цены
        elements.currentPrice.textContent = currentPrice.toFixed(2);
        elements.priceRub.textContent = formatRubles(currentPrice * config.rubPerBtc);
        
        // Расчет изменений
        const change = currentPrice - oldPrice;
        const changePercent = ((change / oldPrice) * 100).toFixed(2);
        
        // Обновление индикатора изменения
        elements.changeAmount.textContent = change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2);
        elements.changePercent.textContent = change >= 0 ? `+${changePercent}%` : `${changePercent}%`;
        
        // Стили для индикатора
        elements.changeIndicator.className = 'change-indicator';
        if (change > 0) {
            elements.changeIndicator.classList.add('positive');
            elements.changeIndicator.innerHTML = `<i class="fas fa-arrow-up"></i><span id="change-amount">+${change.toFixed(2)}</span>`;
        } else if (change < 0) {
            elements.changeIndicator.classList.add('negative');
            elements.changeIndicator.innerHTML = `<i class="fas fa-arrow-down"></i><span id="change-amount">${change.toFixed(2)}</span>`;
        } else {
            elements.changeIndicator.innerHTML = `<i class="fas fa-minus"></i><span id="change-amount">0.00</span>`;
        }
        
        // Анимация изменения цены
        animatePriceChange();
    }

    // Анимация изменения цены
    function animatePriceChange() {
        elements.currentPrice.style.transform = 'scale(1.1)';
        setTimeout(() => {
            elements.currentPrice.style.transform = 'scale(1)';
        }, 300);
    }

    // Обновление графика
    function updateChart() {
        chart.data.labels = Array.from({length: priceHistory.length}, (_, i) => i + 1);
        chart.data.datasets[0].data = priceHistory;
        chart.update();
    }

    // Форматирование рублей
    function formatRubles(amount) {
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Таймер
    function startTimer() {
        timerValue = 10;
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timerValue--;
            updateTimerDisplay();
            
            if (timerValue <= 0) {
                updatePrice();
                timerValue = 10;
            }
        }, 1000);
    }

    // Обновление отображения таймера
    function updateTimerDisplay() {
        elements.timer.textContent = timerValue;
        elements.nextChange.textContent = `через ${timerValue} секунд`;
        
        // Обновление кругового прогресса
        const circumference = 176; // 2 * π * r (r = 28)
        const offset = circumference - (timerValue / 60) * circumference;
        elements.timerFill.style.strokeDashoffset = offset;
    }

    // Обработчик покупки
    function setupBuyButton() {
        elements.buyButton.addEventListener('click', function() {
            const confirmation = confirm(
                `Вы уверены, что хотите приобрести премиум услугу за ${currentPrice.toFixed(2)} BTC (${formatRubles(currentPrice * config.rubPerBtc)})?`
            );
            
            if (confirmation) {
                alert('Спасибо за покупку! Наш менеджер свяжется с вами в ближайшее время.');
                // Здесь можно добавить логику обработки покупки
            }
        });
    }

    // Инициализация
    function init() {
        initChart();
        startTimer();
        setupBuyButton();
        
        // Инициализация начальных значений
        elements.currentPrice.textContent = currentPrice.toFixed(2);
        elements.priceRub.textContent = formatRubles(currentPrice * config.rubPerBtc);
    }

    // Запуск
    init();

    // Обработчик для мобильного меню (если нужно)
    const hamburger = document.querySelector('.nav-hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
});