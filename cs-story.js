window.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const clicksound = document.getElementById('ui_clickrelease');
    const sounds = document.getElementById('valve-intro');
    const logo = document.querySelector('.valve-logo');
    const h1 = document.querySelector('h1');
    const buttons = document.querySelectorAll('button');

    const contentElements = document.querySelectorAll(
        'p1, p2, p3, p4, .image1, .image2, .image3, .Cr1, .Cr2'
    );


    // =====================================================
    // SESSION STORAGE
    // =====================================================

    const introPlayed =
        sessionStorage.getItem('cs_intro_played');

    const savedBackground =
        sessionStorage.getItem('photobackground1');

    const savedScroll =
        sessionStorage.getItem('cs_scroll');


    // =====================================================
    // BACKGROUND
    // =====================================================

    const defaultBackground =
        'images/photobackground1.jpg';

    const backgroundMap = {
        'P1': 'images/photobackground.jpg',
        'P2': 'images/background_valve.jpg',
        'P3': 'images/background_cs16.jpg',
        'P4': 'images/background_modern.jpg'
    };


    function setBackground(image) {

        if (!image) {
            image = defaultBackground;
        }

        document.body.style.backgroundImage =
            `url('${image}')`;

        document.body.style.backgroundSize =
            'cover';

        document.body.style.backgroundRepeat =
            'no-repeat';

        document.body.style.backgroundPosition =
            'center';

        document.body.style.backgroundAttachment =
            'fixed';

        // Запоминаем фон
        sessionStorage.setItem(
            'cs_background',
            image
        );
    }


    // =====================================================
    // CLICK SOUND
    // =====================================================

    function playClickSound() {

        if (!clicksound) {
            console.log(
                'Не найден audio #ui_clickrelease'
            );
            return;
        }

        clicksound.currentTime = 0;
        clicksound.volume = 1.0;

        const promise = clicksound.play();

        if (promise !== undefined) {

            promise.catch(error => {

                console.log(
                    'Помилка звуку кнопки:',
                    error
                );

            });

        }
    }


    // =====================================================
    // BUTTON SOUND
    // =====================================================

    buttons.forEach(button => {

        button.addEventListener('click', () => {

            playClickSound();

        });

    });


    // =====================================================
    // RESTORE SAVED PAGE
    // =====================================================

    if (introPlayed === 'true') {

        // Останавливаем Intro
        if (sounds) {

            sounds.pause();
            sounds.currentTime = 0;

        }


        // Восстанавливаем фон
        if (savedBackground) {

            setBackground(savedBackground);

        } else {

            setBackground(defaultBackground);

        }


        // Показываем контент
        if (h1) {

            h1.style.opacity = '1';

        }

        contentElements.forEach(el => {

            el.style.opacity = '1';

        });

        buttons.forEach(btn => {

            btn.style.opacity = '1';

        });


        // Не даём элементам плавно прыгать
        document.body.classList.add(
            'intro-done'
        );


        // Запускаем смену фона
        initBackgroundChanger();


        // =================================================
        // ВОССТАНОВЛЕНИЕ SCROLL
        // =================================================

        if (savedScroll !== null) {

            requestAnimationFrame(() => {

                requestAnimationFrame(() => {

                    window.scrollTo(
                        0,
                        Number(savedScroll)
                    );

                });

            });

        }


        return;
    }


    // =====================================================
    // FIRST VISIT — INTRO
    // =====================================================

    if (sounds) {

        sounds.src =
            'sounds/valve-intro.mp3';

    }


    // =====================================================
    // INTRO CONTAINER
    // =====================================================

    const container =
        document.createElement('div');

    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';

    container.style.backgroundColor =
        '#000000';

    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    container.style.zIndex = '9999';

    document.body.appendChild(
        container
    );


    // =====================================================
    // CLICK PROMPT
    // =====================================================

    const clickPrompt =
        document.createElement('div');

    clickPrompt.innerText =
        'Натисніть в будь-якому місці, щоб продовжити...';

    clickPrompt.style.position =
        'absolute';

    clickPrompt.style.bottom =
        '40px';

    clickPrompt.style.color =
        '#383d32';

    clickPrompt.style.fontFamily =
        'monospace';

    clickPrompt.style.fontSize =
        '14px';

    clickPrompt.style.letterSpacing =
        '2px';

    container.appendChild(
        clickPrompt
    );


    // =====================================================
    // HIDE CONTENT
    // =====================================================

    if (h1) {

        h1.style.opacity = '0';

    }

    buttons.forEach(btn => {

        btn.style.opacity = '0';

    });

    contentElements.forEach(el => {

        el.style.opacity = '0';

    });


    // =====================================================
    // VALVE LOGO
    // =====================================================

    if (logo) {

        container.appendChild(
            logo
        );

        logo.style.display =
            'none';

        logo.style.backgroundColor =
            '#f74843';

        logo.style.color =
            '#000000';

        logo.style.fontFamily =
            'Oswald, sans-serif';

        logo.style.fontSize =
            '55px';

        logo.style.fontWeight =
            '900';

        logo.style.padding =
            '12px 25px 14px 28px';

        logo.style.letterSpacing =
            '-3px';

        logo.style.whiteSpace =
            'nowrap';


        const valveE =
            logo.querySelector(
                '.valve-e'
            );


        if (valveE) {

            valveE.style.fontSize =
                '36px';

            valveE.style.display =
                'inline-block';

            valveE.style.marginLeft =
                '2px';

            valveE.style.transform =
                'translateY(-6px)';

        }

    }


    document.body.style.transition =
        'background-image 1.2s ease-in-out';


    // =====================================================
    // RUN INTRO
    // =====================================================

    const runIntro = () => {

        if (
            container.hasAttribute(
                'data-started'
            )
        ) {

            return;

        }


        container.setAttribute(
            'data-started',
            'true'
        );


        // Запоминаем Intro
        sessionStorage.setItem(
            'cs_intro_played',
            'true'
        );


        clickPrompt.style.display =
            'none';


        // =================================================
        // SHOW LOGO
        // =================================================

        if (logo) {

            logo.style.display =
                'inline-flex';

            logo.style.opacity =
                '0';

            logo.style.transform =
                'scale(0.95)';

            logo.style.transition =
                'opacity 2s ease, transform 2s ease';


            setTimeout(() => {

                logo.style.opacity =
                    '1';

                logo.style.transform =
                    'scale(1)';

            }, 50);

        }


        // =================================================
        // INTRO SOUND
        // =================================================

        if (sounds) {

            sounds.muted = false;
            sounds.volume = 1.0;


            sounds.play().catch(() => {

                console.log(
                    'MP3 не підійшов, пробуєм WAV...'
                );


                sounds.src =
                    'sounds/valve-intro.wav';


                sounds.play().catch(() => {

                    console.log(
                        'Файл Intro не знайден'
                    );

                });

            });


            // =================================================
            // FADE OUT
            // =================================================

            setTimeout(() => {

                let fadeOutInterval =
                    setInterval(() => {

                        if (
                            sounds.volume > 0.1
                        ) {

                            sounds.volume -=
                                0.1;

                        } else {

                            sounds.pause();

                            clearInterval(
                                fadeOutInterval
                            );

                        }

                    }, 100);

            }, 8000);

        }


        // =================================================
        // END INTRO
        // =================================================

        setTimeout(() => {

            setBackground(
                defaultBackground
            );


            container.style.transition =
                'opacity 1s ease, visibility 1s ease';

            container.style.opacity =
                '0';

            container.style.visibility =
                'hidden';


            if (h1) {

                h1.style.opacity =
                    '1';

                h1.style.transition =
                    'opacity 1.5s ease';

            }


            contentElements.forEach(el => {

                el.style.opacity =
                    '1';

                el.style.transition =
                    'opacity 1.5s ease';

            });


            buttons.forEach(btn => {

                btn.style.opacity =
                    '1';

                btn.style.transition =
                    'opacity 1.5s ease';

            });


            document.body.classList.add(
                'intro-done'
            );


            initBackgroundChanger();


        }, 8000);


        // Удаляем обработчики
        window.removeEventListener(
            'touchstart',
            runIntro
        );

        window.removeEventListener(
            'click',
            runIntro
        );

        window.removeEventListener(
            'keydown',
            runIntro
        );

    };


    // =====================================================
    // START INTRO ON USER ACTION
    // =====================================================

    window.addEventListener(
        'touchstart',
        runIntro,
        { once: true }
    );

    window.addEventListener(
        'click',
        runIntro,
        { once: true }
    );

    window.addEventListener(
        'keydown',
        runIntro,
        { once: true }
    );


    // =====================================================
    // BACKGROUND CHANGER
    // =====================================================

    function initBackgroundChanger() {

        const observerOptions = {

            root: null,
            threshold: 0.2

        };


        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const tagName =
                                entry.target.tagName;


                            if (
                                backgroundMap[tagName]
                            ) {

                                const newBackground =
                                    backgroundMap[tagName];


                                setBackground(
                                    newBackground
                                );

                            }

                        }

                    });

                },
                observerOptions
            );


        document
            .querySelectorAll(
                'p1, p2, p3, p4'
            )
            .forEach(p => {

                observer.observe(p);

            });

    }


    // =====================================================
    // SAVE SCROLL POSITION
    // =====================================================

    let scrollTimeout;


    window.addEventListener(
        'scroll',
        () => {

            clearTimeout(
                scrollTimeout
            );


            scrollTimeout =
                setTimeout(() => {

                    sessionStorage.setItem(
                        'cs_scroll',
                        window.scrollY
                    );

                }, 100);

        }
    );


    // =====================================================
    // SAVE BEFORE LEAVING
    // =====================================================

    window.addEventListener(
        'beforeunload',
        () => {

            sessionStorage.setItem(
                'cs_scroll',
                window.scrollY
            );

        }
    );

});