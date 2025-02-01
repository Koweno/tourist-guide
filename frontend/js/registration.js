// js/registration.js
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("registrationModal");
    const registerBtn = document.getElementById("registerBtn");
    const closeBtn = document.querySelector("#registrationModal .close");
    const registrationForm = document.getElementById("registration-form");
    
    // Флаг регистрации (в реальном проекте можно использовать localStorage или сессию)
    let isRegistered = false;
    
    // Функция открытия модального окна
    function openModal() {
      modal.style.display = "block";
    }
    
    // Функция закрытия модального окна
    function closeModal() {
      modal.style.display = "none";
    }
    
    // Если пользователь не зарегистрирован, открываем модальное окно автоматически
    if (!isRegistered) {
      openModal();
    }
    
    // Обработчик клика по кнопке регистрации в шапке
    registerBtn.addEventListener("click", function() {
      if (!isRegistered) {
        openModal();
      } else {
        alert("Вы уже зарегистрированы!");
      }
    });
    
    // Закрытие модального окна по клику на крестик, только если пользователь зарегистрирован
    closeBtn.addEventListener("click", function() {
      if (!isRegistered) {
        alert("Пожалуйста, зарегистрируйтесь, чтобы продолжить.");
      } else {
        closeModal();
      }
    });
    
    // Закрытие окна при клике вне его содержимого, если пользователь уже зарегистрирован
    window.addEventListener("click", function(event) {
      if (event.target === modal && isRegistered) {
        closeModal();
      }
    });
    
    // Обработка отправки формы регистрации
    registrationForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const username = registrationForm.username.value;
      const email = registrationForm.email.value;
      const password = registrationForm.password.value;
      
      // Здесь можно выполнить AJAX‑запрос на сервер для регистрации (например, через Server.registerUser)
      console.log("Регистрация:", { username, email, password });
      
      // Имитация успешной регистрации
      isRegistered = true;
      alert("Регистрация прошла успешно!");
      registrationForm.reset();
      closeModal();
    });
  });
  