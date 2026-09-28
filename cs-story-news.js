const clicksound = document.getElementById('ui_clickrelease');
const spinner = document.getElementById('cs-spinner');
const hudDisplay = document.getElementById('cs-hud-display');
const sounds = document.getElementById('start-sound');

const buttons = document.querySelectorAll('button');

const availableSounds =
    document.querySelectorAll('.random-sound');


let isSpinning = false;
let currentAngle = 0;

spinner.addEventListener('click', () => {

    if (isSpinning) return;

    isSpinning = true;

    hudDisplay.innerText =
        'SCANNING...';

    hudDisplay.style.color =
        '#33ff33';

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

    let speed =
        Math.random() * 20 + 35;

    const friction =
        0.96;

    function animate() {

        currentAngle += speed;


        spinner.style.transform =
            `rotate(${currentAngle}deg)`;

        speed *= friction;


        if (speed > 0.1) {

            requestAnimationFrame(
                animate
            );

        } else {

            isSpinning = false;

            playExistingHtmlSound();

        }

    }


    animate();

});

function playExistingHtmlSound() {

    if (availableSounds.length === 0) {

        console.log(
            'Не найдено ни одного .random-sound'
        );

        return;

    }

    const randomIndex =
        Math.floor(
            Math.random() *
            availableSounds.length
        );


    const selectedAudio =
        availableSounds[randomIndex];

    selectedAudio.currentTime =
        0;


    selectedAudio.play().catch(error => {

        console.log(
            'Помилка проїгрування random sound:',
            error
        );

    });

    const linkedText =
        selectedAudio.getAttribute(
            'data-text'
        );

    hudDisplay.innerText =
        linkedText || '';

}

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

buttons.forEach(button => {

    button.addEventListener(
        'click',
        playClickSound
    );

});