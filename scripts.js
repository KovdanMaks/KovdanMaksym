// Зберігання інформації про ОС та браузер
const browserInfo = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
};
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));

// Дочекайся завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    const infoContainer = document.getElementById('storage-info');
    const storedInfo = JSON.parse(localStorage.getItem('browserInfo'));
    if (storedInfo) {
        infoContainer.textContent = `ОС: ${storedInfo.platform}, Браузер: ${storedInfo.userAgent}, Мова: ${storedInfo.language}`;
    }

    // Завантаження коментарів
    fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then(response => response.json())
        .then(comments => {
            const commentList = document.getElementById('comments');
            comments.forEach(comment => {
                const li = document.createElement('li');
                li.textContent = `${comment.name}: ${comment.body}`;
                commentList.appendChild(li);
            });
        });

    // Відкриття модального вікна
    const openModalBtn = document.getElementById('open-modal');
    const modal = document.getElementById('feedback-modal');
    if (openModalBtn && modal) {
        openModalBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    // Перемикання теми вручну
    const toggleThemeBtn = document.getElementById('toggle-theme');
    if (toggleThemeBtn) {
        toggleThemeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    }

    // Автоматична темна тема
    const hour = new Date().getHours();
    if (hour < 7 || hour >= 21) {
        document.body.classList.add('dark');
    }

    // Показ модального через 5 сек
    setTimeout(() => {
        if (modal) {
            modal.classList.remove('hidden');
        }
    }, 60000);
});