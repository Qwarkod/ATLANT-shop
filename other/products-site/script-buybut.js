document.getElementById('buy').addEventListener('click', function(e) {
    e.preventDefault(); // Скасувати стандартну поведінку форми
    window.location.href = 'http://localhost:3000'; // Перенаправлення на інший сайт
    console.log('YES');
});