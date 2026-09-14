const spinner = document.getElementById('cs-spinner');
const hudDisplay = document.getElementById('cs-hud-display');
const startSound = document.getElementById('start-sound');

// Находим строго те аудиофайлы, которые вы прописали в самом HTML
const availableSounds = document.querySelectorAll('.random-sound');

let isSpinning = false; 
let currentAngle = 0;   

spinner.addEventListener('click', () => {
    // Если радар уже сканирует, повторно нажать нельзя до полной остановки
    if (isSpinning) return; 
    
    isSpinning = true;
    hudDisplay.innerText = 'SCANNING...';
    hudDisplay.style.color = '#33ff33'; // Возвращаем стандартный зеленый цвет HUD

    // Проигрываем стартовый клик
    startSound.currentTime = 0;
    startSound.play(); 

    // Задаем случайную начальную скорость кручения радара
    let speed = Math.random() * 20 + 35; 
    const friction = 0.96; // Эффект плавного торможения

    function animate() {
        currentAngle += speed;
        spinner.style.transform = `rotate(${currentAngle}deg)`;
        
        speed *= friction; // Постепенно замедляем вращение

        if (speed > 0.1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            // Радар остановился — JS определяет, какой тег запустить и какой текст показать
            playExistingHtmlSound();
        }
    }

    animate();
});

function playExistingHtmlSound() {
    if (availableSounds.length === 0) return;

    // 1. Выбираем случайный аудио-тег ИЗ ТЕХ, ЧТО УЖЕ ЕСТЬ в вашем HTML
    const randomIndex = Math.floor(Math.random() * availableSounds.length);
    const selectedAudio = availableSounds[randomIndex];

    // 2. Запускаем воспроизведение именно этого HTML-тега
    selectedAudio.currentTime = 0;
    selectedAudio.play();

    // 3. JS считывает привязанный к тегу текст из атрибута data-text
    const linkedText = selectedAudio.getAttribute('data-text');

    // 4. Показываем считанный текст на зеленом табло радара
    hudDisplay.innerText = linkedText;
}
