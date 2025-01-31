// Обработчик отправки формы регистрации
document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаем данные из формы
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Данные, которые будем отправлять на сервер
    const userData = {
        username: username,
        email: email,
        password: password
    };

    // Отправка данных на сервер (здесь указываем API серверного маршрута)
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('User successfully registered!');
            // Можно показать сообщение пользователю или перенаправить его на другую страницу
        } else {
            console.log('Error during registration:', data.message);
            // Показать ошибку пользователю
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Показать ошибку в случае проблем с сервером
    });

    // Очистка формы после отправки
    event.target.reset();
});
