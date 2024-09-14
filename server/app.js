const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.json());

// Статичні файли (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

const TELEGRAM_TOKEN = '7493705509:AAEhDhjL6KNL9AKx38i5WfHnSiCQL1-ktNk';
const TELEGRAM_CHAT_ID = '1295584711';

app.post('/sendTelegramMessage', async (req, res) => {
  const { name, phone } = req.body;
  console.log('Отримано дані з форми:', name, phone);  // Виведення даних у консоль

  const message = `<b><u>Є новий заказ!</u></b>\n\n<b>Ім'я:</b> ${name}\n<b>Телефон:</b> ${phone}`;
  
  try {
    // Відправка повідомлення в Telegram
    const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML' 
    });
    console.log('Повідомлення успішно відправлено в Telegram:', response.data);

    res.status(200).send('Повідомлення успішно відправлене');
  } catch (error) {
    console.error('Помилка при відправці до Telegram:', error.response ? error.response.data : error.message);
    res.status(500).send('Помилка при відправці повідомлення');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});
