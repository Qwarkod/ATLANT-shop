document.getElementById('phone').addEventListener('input', function(e) {
  const input = e.target;
  let value = input.value.replace(/\D/g, ''); // Видаляємо всі нецифрові символи

  if (value.length > 16) {
    value = '+380 ' +
      value.slice(3, 5) + ' ' +
      value.slice(5, 8) + ' ' +
      value.slice(8, 10) + ' ' +
      value.slice(10, 16);
  } else if (value.length > 3) {
    value = '+380 ' +
      value.slice(3, 5) + ' ' +
      value.slice(5, 8) + ' ' +
      value.slice(8, 16);
  } else if (value.length > 0) {
    value = '+380 ' + value.slice(3);
  } else {
    value = '+380';
  }

  input.value = value;
});



document.getElementById('orderForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const nameInput = document.getElementById('name');





  const phoneInput = document.getElementById('phone');
  const phoneValue = phoneInput.value.replace(/\D/g, ''); // Видаляє всі нецифрові символи

  if (nameInput.value.trim() === '') {
    alert('Заповніть поле!'); 
    return; // Перериваємо подальше виконання функції
  }



  // Перевірка на кількість цифр
  if (phoneValue.length < 11) {
    alert('Номер повинен мати 11 цифр');
    return; // Перериваємо подальше виконання функції
  }

  try {
    const response = await fetch('/sendTelegramMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, phone })
    });

    if (response.ok) {
      alert('Замовлення успішно відправлене!');
      e.preventDefault();
      window.location.href = './other/index.html';
    } else {
      alert('Сталася помилка при відправці замовлення.');
    }
  } catch (error) {
    console.error('Помилка:', error);
    alert('Не вдалося відправити замовлення.');
  }
});



