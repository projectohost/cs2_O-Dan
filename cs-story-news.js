const clicksound = document.getElementById('ui_clickrelease');
const spinner = document.getElementById('cs-spinner');
const hudDisplay = document.getElementById('cs-hud-display');
const sounds = document.getElementById('start-sound');

// Все кнопки на странице
const buttons = document.querySelectorAll('button');

// Находим строго те аудиофайлы,
// которые прописаны в HTML
const availableSounds =
    document.querySelectorAll('.random-sound');


let isSpinning = false;
let currentAngle = 0;


// ========================================
// РАДАР
// ========================================

spinner.addEventListener('click', () => {

    // Если радар уже сканирует,
    // повторно нажать нельзя
    if (isSpinning) return;


    isSpinning = true;


    // Меняем текст HUD
    hudDisplay.innerText =
        'SCANNING...';


    // Возвращаем зелёный цвет
    hudDisplay.style.color =
        '#33ff33';


    // ========================================
    // СТАРТОВЫЙ ЗВУК
    // ========================================

    if (sounds) {

        sounds.currentTime =
            0;

        sounds.play().catch(error => {

            console.log(
                'Ошибка стартового звука:',
                error
            );

        });

    }


    // ========================================
    // СКОРОСТЬ РАДАРА
    // ========================================

    let speed =
        Math.random() * 20 + 35;


    const friction =
        0.96;


    // ========================================
    // АНИМАЦИЯ
    // ========================================

    function animate() {

        currentAngle += speed;


        spinner.style.transform =
            `rotate(${currentAngle}deg)`;


        // Постепенное торможение
        speed *= friction;


        if (speed > 0.1) {

            requestAnimationFrame(
                animate
            );

        } else {

            // Радар остановился
            isSpinning = false;


            // Запускаем случайный звук
            playExistingHtmlSound();

        }

    }


    animate();

});


// ========================================
// СЛУЧАЙНЫЙ HTML SOUND
// ========================================

function playExistingHtmlSound() {

    // Если аудио нет
    if (availableSounds.length === 0) {

        console.log(
            'Не найдено ни одного .random-sound'
        );

        return;

    }


    // ========================================
    // ВЫБИРАЕМ СЛУЧАЙНЫЙ AUDIO
    // ========================================

    const randomIndex =
        Math.floor(
            Math.random() *
            availableSounds.length
        );


    const selectedAudio =
        availableSounds[randomIndex];


    // ========================================
    // ПРОИГРЫВАЕМ
    // ========================================

    selectedAudio.currentTime =
        0;


    selectedAudio.play().catch(error => {

        console.log(
            'Ошибка воспроизведения random sound:',
            error
        );

    });


    // ========================================
    // ПОЛУЧАЕМ TEXT
    // ========================================

    const linkedText =
        selectedAudio.getAttribute(
            'data-text'
        );


    // ========================================
    // ПОКАЗЫВАЕМ TEXT НА HUD
    // ========================================

    hudDisplay.innerText =
        linkedText || '';

}


// ========================================
// ЗВУК КНОПОК
// ========================================

function playClickSound() {

    if (!clicksound) {

        console.log(
            'Не найден audio #ui_clickrelease'
        );

        return;

    }


    clicksound.currentTime =
        0;


    clicksound.volume =
        1.0;


    const promise =
        clicksound.play();


    if (promise !== undefined) {

        promise.catch(error => {

            console.log(
                'Помилка звуку кнопки:',
                error
            );

        });

    }

}


// ========================================
// ПОДКЛЮЧАЕМ ЗВУК КО ВСЕМ BUTTON
// ========================================

buttons.forEach(button => {

    button.addEventListener(
        'click',
        playClickSound
    );

});