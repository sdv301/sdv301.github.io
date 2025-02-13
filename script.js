// Функция для создания нового цветка
function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');

    // Случайная позиция слева
    flower.style.left = `${Math.random() * 100}%`;

    // Случайная скорость падения
    flower.style.animationDuration = `${Math.random() * 3 + 3}s`;

    // Случайный размер
    const size = Math.random() * 10 + 15; // Размер от 15 до 25 пикселей
    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    // Случайное изображение цветка
    const flowers = [
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/blossom_1f490.png',
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/rosette_1f3f5.png',
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/tulip_1f337.png',
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/wilted-flower_1f940.png',
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/325/hibiscus_1f33a.png'
    ];
    flower.style.backgroundImage = `url(${flowers[Math.floor(Math.random() * flowers.length)]})`;

    // Добавляем цветок на страницу
    document.body.appendChild(flower);

    // Удаляем цветок после завершения анимации
    setTimeout(() => {
        flower.remove();
    }, 8000); // 8 секунд = максимальная длительность анимации
}

// Создаём новый цветок каждые 300 миллисекунд
setInterval(createFlower, 300);
