window.addEventListener('DOMContentLoaded', () => {
  const sound = document.getElementById('intro-sound');
  const logo = document.querySelector('.valve-logo');
  const h1 = document.querySelector('h1');
  const p = document.querySelector('p');
  const buttons = document.querySelectorAll('button');

  // Указываем точный путь к звуку
  if (sound) {
    sound.src = 'sounds/valve-intro.mp3'; 
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
    if (sound) {
      sound.muted = false;
      sound.volume = 1.0;
      
      sound.play().catch(err => {
        console.log("MP3 не подошел, пробуем WAV...");
        sound.src = 'sounds/valve-intro.wav';
        sound.play().catch(e => console.log("Файл не найден"));
      });

      // Плавное затухание звука на 8.5 секунде
      setTimeout(() => {
        let fadeOutInterval = setInterval(() => {
          if (sound.volume > 0.1) {
            sound.volume -= 0.1;
          } else {
            sound.pause();
            clearInterval(fadeOutInterval);
          }
        }, 100);
      }, 8500);
    }

    // Через 10 секунд плавно открываем сайт
    setTimeout(() => {
      // ИСПРАВЛЕНО: Принудительно устанавливаем картинку на фон body прямо из JS, чтобы обойти баг file:///
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
      
      // Добавляем класс для CSS, если он там используется
      document.body.classList.add('intro-done');
    }, 10000);

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
});
