document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const docTypeSelect = document.getElementById('doc-type');
    const docTitle = document.getElementById('document-title');
    const navLinks = document.querySelectorAll('.nav-link');
    const addTaskRowBtn = document.getElementById('add-task-row');
    const taskTableBody = document.getElementById('task-table-body');
    const addOptionRowBtn = document.getElementById('add-option-row');
    const optionTableBody = document.getElementById('option-table-body');
    const previewBtn = document.getElementById('preview-btn');
    const downloadBtn = document.getElementById('download-btn');
    const previewModal = document.getElementById('preview-modal');
    const closeModal = document.getElementById('close-modal');
    const previewContent = document.getElementById('preview-content');

    // Типы документов и их настройки
    const documentTypes = {
        kp: {
            title: 'Коммерческое предложение',
            taskTitle: 'Задачи',
            optionTitle: 'Опции'
        },
        tz: {
            title: 'Техническое задание',
            taskTitle: 'Технические требования',
            optionTitle: 'Дополнительные опции'
        },
        contract: {
            title: 'Договор на оказание услуг',
            taskTitle: 'Услуги',
            optionTitle: 'Дополнительные услуги'
        }
    };

    // Инициализация
    function init() {
        setupEventListeners();
        setupTableRowActions();
        setupCostCalculation();
    }

    // Настройка обработчиков событий
    function setupEventListeners() {
        // Переключение типа документа
        docTypeSelect.addEventListener('change', function() {
            updateDocumentType(this.value);
        });

        // Навигация
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const type = this.getAttribute('data-type');
                docTypeSelect.value = type;
                updateDocumentType(type);
                
                // Обновляем активную ссылку
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Добавление строк в таблицы
        addTaskRowBtn.addEventListener('click', addTaskRow);
        addOptionRowBtn.addEventListener('click', addOptionRow);

        // Предпросмотр и скачивание
        previewBtn.addEventListener('click', generatePreview);
        downloadBtn.addEventListener('click', generatePDF);

        // Закрытие модального окна
        closeModal.addEventListener('click', () => previewModal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === previewModal) previewModal.style.display = 'none';
        });
    }

    // Настройка автоматического расчета стоимости
    function setupCostCalculation() {
        const mainCostInput = document.getElementById('main-cost');
        const optionsCostInput = document.getElementById('options-cost');
        const totalCostInput = document.getElementById('total-cost');

        function calculateTotal() {
            const mainCost = parseFloat(mainCostInput.value) || 0;
            const optionsCost = parseFloat(optionsCostInput.value) || 0;
            const total = mainCost + optionsCost;
            totalCostInput.value = total > 0 ? total.toFixed(2) : '';
        }

        mainCostInput.addEventListener('input', calculateTotal);
        optionsCostInput.addEventListener('input', calculateTotal);
    }

    // Обновление типа документа
    function updateDocumentType(type) {
        const config = documentTypes[type];
        docTitle.textContent = config.title;
        
        // Обновляем заголовки разделов
        document.querySelectorAll('.section-title')[1].textContent = `Раздел 1: ${config.taskTitle}`;
        document.querySelectorAll('.section-title')[2].textContent = `Раздел 2: ${config.optionTitle}`;
        
        // Обновляем активную навигацию
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-type') === type);
        });
    }

    // Добавление строки в таблицу задач
    function addTaskRow() {
        const row = createTableRow('task');
        taskTableBody.appendChild(row);
        setupRowActions(row);
    }

    // Добавление строки в таблицу опций
    function addOptionRow() {
        const row = createTableRow('option');
        optionTableBody.appendChild(row);
        setupRowActions(row);
    }

    // Создание строки таблицы
    function createTableRow(type) {
        const row = document.createElement('tr');
        const isTask = type === 'task';
        
        row.innerHTML = `
            <td><input type="text" placeholder="${isTask ? 'Основная задача' : 'Дополнительная опция'}"></td>
            <td><textarea placeholder="${isTask ? 'Подробное описание задачи' : 'Описание опции'}"></textarea></td>
            <td><input type="text" placeholder="${isTask ? 'Стоимость или комментарий' : 'Стоимость'}"></td>
            <td class="actions-cell">
                <button class="row-btn delete-row" title="Удалить строку">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        return row;
    }

    // Настройка действий для строк таблицы
    function setupRowActions(row) {
        const deleteBtn = row.querySelector('.delete-row');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Вы уверены, что хотите удалить эту строку?')) {
                row.remove();
            }
        });
    }

    // Настройка действий для существующих строк
    function setupTableRowActions() {
        document.querySelectorAll('#task-table-body tr, #option-table-body tr').forEach(row => {
            setupRowActions(row);
        });
    }

    // Генерация предпросмотра
    function generatePreview() {
        if (!validateData()) {
            alert('Добавьте данные в таблицы перед просмотром.');
            return;
        }

        const previewHTML = generatePreviewHTML();
        previewContent.innerHTML = previewHTML;
        previewModal.style.display = 'flex';
    }

    // Генерация HTML для предпросмотра
    function generatePreviewHTML() {
        const docType = docTypeSelect.value;
        const config = documentTypes[docType];
        const companyName = document.getElementById('company-name').value || 'PZF-Studio';
        const clientName = document.getElementById('client-name').value || 'Заказчик';
        const docNumber = document.getElementById('doc-number').value || '№ документа';
        const currentDate = new Date().toLocaleDateString('ru-RU');
        const additionalConditions = document.getElementById('additional-conditions').value;

        let html = `
            <div class="preview-content">
                <div class="watermark">PZF-Studio</div>
                
                <div class="preview-header">
                    <h1>${config.title}</h1>
                    <p><strong>${docNumber}</strong> от ${currentDate}</p>
                    <p>Кому: ${clientName}</p>
                    <p>От: ${companyName}</p>
                </div>
        `;

        // Раздел 1: Задачи
        const taskRows = getTableData('task');
        if (taskRows.length > 0) {
            html += `
                <div class="preview-section">
                    <h2>${config.taskTitle}</h2>
                    <table class="preview-table">
                        <thead>
                            <tr>
                                <th width="25%">${docType === 'tz' ? 'Требование' : 'Задача'}</th>
                                <th width="45%">Описание</th>
                                <th width="30%">${docType === 'tz' ? 'Комментарий' : 'Цена/Комментарий'}</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            taskRows.forEach(row => {
                html += `
                    <tr>
                        <td>${escapeHTML(row.col1) || '-'}</td>
                        <td>${escapeHTML(row.col2).replace(/\n/g, '<br>') || '-'}</td>
                        <td>${escapeHTML(row.col3) || '-'}</td>
                    </tr>
                `;
            });

            html += `</tbody></table></div>`;
        }

        // Раздел 2: Опции
        const optionRows = getTableData('option');
        if (optionRows.length > 0) {
            html += `
                <div class="preview-section">
                    <h2>${config.optionTitle}</h2>
                    <table class="preview-table">
                        <thead>
                            <tr>
                                <th width="25%">Опция</th>
                                <th width="45%">Описание</th>
                                <th width="30%">Цена</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            optionRows.forEach(row => {
                html += `
                    <tr>
                        <td>${escapeHTML(row.col1) || '-'}</td>
                        <td>${escapeHTML(row.col2).replace(/\n/g, '<br>') || '-'}</td>
                        <td>${escapeHTML(row.col3) || '-'}</td>
                    </tr>
                `;
            });

            html += `</tbody></table></div>`;
        }

        // Раздел 3: Стоимость
        const mainCost = document.getElementById('main-cost').value;
        const optionsCost = document.getElementById('options-cost').value;
        const totalCost = document.getElementById('total-cost').value;

        if (mainCost || optionsCost || totalCost) {
            html += `
                <div class="preview-section">
                    <h2>Стоимость</h2>
                    <table class="preview-table">
                        <tbody>
                            ${mainCost ? `<tr><td><strong>Стоимость основных услуг:</strong></td><td>${formatCurrency(mainCost)}</td></tr>` : ''}
                            ${optionsCost ? `<tr><td><strong>Стоимость опций:</strong></td><td>${formatCurrency(optionsCost)}</td></tr>` : ''}
                            ${totalCost ? `<tr><td><strong>Итоговая стоимость:</strong></td><td style="font-weight: bold; font-size: 1.1em;">${formatCurrency(totalCost)}</td></tr>` : ''}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // Раздел 4: Сроки
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        if (startDate || endDate) {
            html += `
                <div class="preview-section">
                    <h2>Сроки выполнения работ</h2>
                    <table class="preview-table">
                        <tbody>
                            ${startDate ? `<tr><td><strong>Дата начала работ:</strong></td><td>${formatDate(startDate)}</td></tr>` : ''}
                            ${endDate ? `<tr><td><strong>Дата окончания работ:</strong></td><td>${formatDate(endDate)}</td></tr>` : ''}
                        </tbody>
                    </table>
                </div>
            `;
        }

        // Дополнительные условия
        if (additionalConditions.trim()) {
            html += `
                <div class="preview-section">
                    <h2>Дополнительные условия</h2>
                    <p>${escapeHTML(additionalConditions).replace(/\n/g, '<br>')}</p>
                </div>
            `;
        }

        // Подписи
        html += generateSignaturesHTML();

        html += `</div>`;
        return html;
    }

    // Генерация HTML для подписей
    function generateSignaturesHTML() {
        const executorPosition = document.getElementById('executor-position').value || 'Должность';
        const executorName = document.getElementById('executor-name').value || 'ФИО';
        const executorSignature = document.getElementById('executor-signature').value || '(подпись)';
        
        const clientPosition = document.getElementById('client-position').value || 'Должность';
        const clientFullname = document.getElementById('client-fullname').value || 'ФИО';
        const clientSignature = document.getElementById('client-signature').value || '(подпись)';

        return `
            <div class="signatures-preview">
                <div class="signature-preview-block">
                    <h3>Исполнитель</h3>
                    <p>${escapeHTML(executorPosition)}</p>
                    <p>${escapeHTML(executorName)}</p>
                    <div class="signature-line"></div>
                    <p>${escapeHTML(executorSignature)}</p>
                </div>
                
                <div class="signature-preview-block">
                    <h3>Заказчик</h3>
                    <p>${escapeHTML(clientPosition)}</p>
                    <p>${escapeHTML(clientFullname)}</p>
                    <div class="signature-line"></div>
                    <p>${escapeHTML(clientSignature)}</p>
                </div>
            </div>
        `;
    }

    // Получение данных из таблицы
    function getTableData(type) {
        const tableBody = type === 'task' ? taskTableBody : optionTableBody;
        const rows = tableBody.querySelectorAll('tr');
        const data = [];

        rows.forEach(row => {
            const inputs = row.querySelectorAll('input, textarea');
            const col1 = inputs[0].value.trim();
            const col2 = inputs[1].value.trim();
            const col3 = inputs[2].value.trim();

            if (col1 || col2 || col3) {
                data.push({ col1, col2, col3 });
            }
        });

        return data;
    }

    // Генерация PDF
    function generatePDF() {
        if (!validateData()) {
            alert('Добавьте данные в таблицы перед созданием PDF.');
            return;
        }

        // Показываем индикатор загрузки
        previewModal.style.display = 'flex';
        previewContent.innerHTML = '<div style="text-align: center; padding: 50px; font-size: 18px;">Генерация PDF... Пожалуйста, подождите.</div>';

        setTimeout(() => {
            const previewHTML = generatePreviewHTML();
            previewContent.innerHTML = previewHTML;

            // Ждем отрисовки контента
            setTimeout(() => {
                html2canvas(previewContent, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    backgroundColor: '#ffffff',
                    width: previewContent.scrollWidth,
                    height: previewContent.scrollHeight,
                    scrollX: 0,
                    scrollY: 0
                }).then(canvas => {
                    const imgData = canvas.toDataURL('image/jpeg', 0.95);
                    const { jsPDF } = window.jspdf;
                    const doc = new jsPDF({
                        orientation: 'portrait',
                        unit: 'mm',
                        format: 'a4'
                    });

                    const pageWidth = doc.internal.pageSize.getWidth();
                    const pageHeight = doc.internal.pageSize.getHeight();
                    
                    const imgWidth = pageWidth - 20;
                    const imgHeight = (canvas.height * imgWidth) / canvas.width;
                    
                    let heightLeft = imgHeight;
                    let position = 10;
                    let pageNumber = 1;

                    // Добавляем первую страницу
                    doc.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    // Добавляем остальные страницы если нужно
                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight + 10;
                        doc.addPage();
                        pageNumber++;
                        doc.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    // Закрываем модальное окно
                    previewModal.style.display = 'none';

                    // Сохраняем PDF
                    const docType = docTypeSelect.value;
                    const fileName = `${documentTypes[docType].title.toLowerCase().replace(/\s+/g, '-')}-pzf-studio.pdf`;
                    doc.save(fileName);

                }).catch(error => {
                    console.error('Ошибка при создании PDF:', error);
                    previewModal.style.display = 'none';
                    alert('Ошибка при создании PDF. Попробуйте еще раз.');
                });
            }, 500);
        }, 500);
    }

    // Валидация данных
    function validateData() {
        const taskData = getTableData('task');
        const optionData = getTableData('option');
        const additionalConditions = document.getElementById('additional-conditions').value.trim();
        const mainCost = document.getElementById('main-cost').value;
        const optionsCost = document.getElementById('options-cost').value;
        const totalCost = document.getElementById('total-cost').value;
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;

        return taskData.length > 0 || optionData.length > 0 || additionalConditions !== '' || 
               mainCost !== '' || optionsCost !== '' || totalCost !== '' || startDate !== '' || endDate !== '';
    }

    // Экранирование HTML
    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Форматирование валюты
    function formatCurrency(amount) {
        if (!amount) return '-';
        const number = parseFloat(amount);
        return new Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 2
        }).format(number);
    }

    // Форматирование даты
    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    // Запуск инициализации
    init();
});