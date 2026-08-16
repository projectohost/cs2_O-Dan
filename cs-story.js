window.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('myButton');
  const clickSound = document.getElementById('ui_clickrelease'); // ИСПРАВЛЕНО: Переименовано во избежание дублирования
  const sounds = document.getElementById('valve-intro');
  const logo = document.querySelector('.valve-logo');
  const h1 = document.querySelector('h1');
  const p = document.querySelector('p');
  const buttons = document.querySelectorAll('button'); // Теперь это объявление работает корректно

  // Указываем точный путь к звуку
  if (sounds) {
    sounds.src = 'sounds/valve-intro.mp3'; 
  }

  // 1. Создаем черный экран заставки прямо через JS
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0'; container.style.left = '0';
  container.style.width = '100vw'; container.style.height = '100vh';
  container.style.backgroundColor = '#000000';
  container.style.display = 'flex'; container.style.alignItems = 'center'; container.style.justifyContent = 'center';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  // 2. Изначально полностью скрываем контент сайта на заднем плане
  if (h1) h1.style.opacity = '0';
  if (p) p.style.opacity = '0';
  buttons.forEach(btn => btn.style.opacity = '0');

  // 3. Стилизуем ваши буквы VALVE
  if (logo) {
    container.appendChild(logo);
    logo.style.display = 'none'; 
    logo.style.backgroundColor = '#f74843';
    logo.style.color = '#000000';
    logo.style.fontFamily = "'Arial Black', 'Impact', sans-serif";
    logo.style.fontSize = '55px';
    logo.style.fontWeight = '900';
    logo.style.padding = '12px 25px 14px 28px';
    logo.style.letterSpacing = '-2px';
    logo.style.whiteSpace = 'nowrap';
    
    const valveE = logo.querySelector('.valve-e');
    if (valveE) {
      valveE.style.fontSize = '34px';
      valveE.style.display = 'inline-block';
      valveE.style.marginLeft = '4px';
      valveE.style.transform = 'translateY(-7px)';
    }
  }

  // Главная функция запуска заставки
  const runIntro = () => {
    if (container.hasAttribute('data-started')) return;
    container.setAttribute('data-started', 'true');

    // Мгновенный показ и плавное проявление логотипа VALVE
    if (logo) {
      logo.style.display = 'inline-flex';
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0.9)';
      logo.style.transition = 'opacity 2s ease, transform 2s ease';
      setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)';
      }, 50);
    }
    
    // Мгновенный запуск звука
    if (sounds) {
      sounds.muted = false;
      sounds.volume = 1.0;
      
      sounds.play().catch(err => {
        console.log("MP3 не подошел, пробуем WAV...");
        sounds.src = 'sounds/valve-intro.wav';
        sounds.play().catch(e => console.log("Файл не найден"));
      });

      // ИСПРАВЛЕНО: Плавное затухание звука интро (sounds вместо sound) на 6.5 секунде
      setTimeout(() => {
        let fadeOutInterval = setInterval(() => {
          if (sounds.volume > 0.1) {
            sounds.volume -= 0.1;
          } else {
            sounds.pause();
            clearInterval(fadeOutInterval);
          }
        }, 100);
      }, 8000); 
    }
    setTimeout(() => {
      document.body.style.backgroundImage = "url('images/photobackground.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundAttachment = "fixed";
      document.body.style.transition = "background-image 2s ease-in-out";

      // Плавно убираем заставку
      container.style.opacity = '0';
      container.style.visibility = 'hidden';
      container.style.transition = 'opacity 1s ease, visibility 1s';
      
      // Проявляем контент сайта
      if (h1) { h1.style.opacity = '1'; h1.style.transition = 'opacity 2s ease'; }
      if (p) { p.style.opacity = '1'; p.style.transition = 'opacity 2s ease'; }
      buttons.forEach(btn => { btn.style.opacity = '1'; btn.style.transition = 'opacity 2s ease'; });
      document.body.classList.add('intro-done');
    }, 8000);

    // Снимаем слежку за действиями
    window.removeEventListener('mousemove', runIntro);
    window.removeEventListener('wheel', runIntro);
    window.removeEventListener('touchstart', runIntro);
    window.removeEventListener('click', runIntro);
    window.removeEventListener('keydown', runIntro);
  };

  // Ждем ЛЮБОГО действия игрока для мгновенного старта
  window.addEventListener('mousemove', runIntro, { once: true });
  window.addEventListener('wheel', runIntro, { once: true });
  window.addEventListener('touchstart', runIntro, { once: true });
  window.addEventListener('click', runIntro, { once: true });
  window.addEventListener('keydown', runIntro, { once: true });

  // ИСПРАВЛЕНО: Теперь используется верное имя переменной clickSound
  if (button && clickSound) {
    button.addEventListener('click', () => {
      clickSound.currentTime = 0; // Возвращает звук в начало, если кликают быстро
      clickSound.play().catch(error => {
        console.log("Браузер заблокировал автовоспроизведение:", error);
      });
    });
  }
});
