const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5500' 
}));

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/tourist-guide', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Схема пользователя
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Модель пользователя
const User = mongoose.model('User', userSchema);

// Валидация данных с помощью Joi
const validateUser = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
};

// Обработчик POST запроса на /api/register
app.post('/api/register', async (req, res) => {
    // Валидация данных из формы
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    // Проверка, существует ли уже пользователь с таким email или именем
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).send({ message: 'Email already in use.' });

    const usernameExists = await User.findOne({ username: req.body.username });
    if (usernameExists) return res.status(400).send({ message: 'Username already taken.' });

    // Хеширование пароля
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Создание нового пользователя
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    // Сохранение пользователя в базе данных
    try {
        await user.save();
        res.status(201).send({ message: 'User successfully registered!' });
    } catch (err) {
        res.status(500).send({ message: 'Error saving user to the database.' });
    }
});

// Статичные файлы (фронтенд)
app.use(express.static(path.join(__dirname, '../frontend')));

// Обработчик главной страницы (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Запуск сервера
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// js/server.js
const Server = (function() {
    return {
      registerUser: function(data) {
        // Здесь можно выполнить AJAX‑запрос на регистрацию пользователя.
        // Ниже имитация задержки и успешного ответа от сервера.
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log("Пользователь зарегистрирован на сервере:", data);
            resolve({ success: true, message: "Регистрация успешна" });
          }, 500);
        });
      }
    };
  })();
  