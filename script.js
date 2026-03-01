// ===== ТЕМНАЯ ТЕМА =====
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Применяем сохраненную тему или светлую по умолчанию
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        // Если тема не сохранена или светлая, устанавливаем светлую
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }

    // Кнопка переключения темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            
            // Сохраняем выбор пользователя
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Обновляем иконку
            updateThemeIcon(isDark);
        });
    }

    // Функция обновления иконки темы
    function updateThemeIcon(isDark) {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (isDark) {
                    icon.className = 'fas fa-sun';
                    themeToggle.title = 'Светлая тема';
                } else {
                    icon.className = 'fas fa-moon';
                    themeToggle.title = 'Темная тема';
                }
            }
        }
    }
});

// ===== АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ =====
document.addEventListener('DOMContentLoaded', function() {
    // Добавляем класс fade-in всем карточкам
    const cards = document.querySelectorAll('.content-card, .project-card-full, .contact-item, .interest-simple-item, .hobby-simple-item');
    
    cards.forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Запускаем анимацию при загрузке
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('fade-in-visible');
        });
    }, 100);
});

// ===== АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ =====
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
});

// ===== ОБРАБОТКА ФОРМЫ ОБРАТНОЙ СВЯЗИ =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(contactForm);
            
            // Добавляем ключ доступа Web3Forms
            formData.append('access_key', 'b2b2f75e-8698-4fd6-822d-8b78adea8086');
            
            // Добавляем email получателя (куда придет письмо)
            formData.append('to', 'gleb06092005@gmail.com');
            
            // Настраиваем отправителя
            formData.append('from_name', 'Arbuzi Portfolio');
            
            // Создаем и показываем сообщение об отправке
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';
            submitBtn.disabled = true;
            
            try {
                // Отправляем данные на Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    // Показываем сообщение об успехе
                    showSuccessMessage();
                    
                    // Очищаем форму
                    contactForm.reset();
                } else {
                    alert('Ошибка при отправке. Пожалуйста, попробуйте еще раз.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Произошла ошибка. Проверьте подключение к интернету и попробуйте снова.');
            } finally {
                // Возвращаем кнопку в исходное состояние
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // Функция показа сообщения об успехе
    function showSuccessMessage() {
        // Проверяем, есть ли уже элемент с сообщением
        let successMsg = document.getElementById('success-message');
        
        // Если нет, создаем его
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.id = 'success-message';
            successMsg.className = 'success-message';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i><span>Ваше сообщение отправлено!</span>';
            document.body.appendChild(successMsg);
        }
        
        // Показываем сообщение
        successMsg.classList.add('show');
        
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 3000);
    }
});