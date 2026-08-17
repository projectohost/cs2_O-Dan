window.addEventListener('DOMContentLoaded', () => {
  const clicksound = document.getElementById('ui_clickrelease');
  const sounds = document.getElementById('valve-intro');
  const logo = document.querySelector('.valve-logo');
  const h1 = document.querySelector('h1');
  const buttons = document.querySelectorAll('button');

  const contentElements = document.querySelectorAll('p1, p2, p3, p4, .image1, .image2');

  if (sounds) {
    sounds.src = 'sounds/valve-intro.mp3'; 
  }

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '0'; container.style.left = '0';
  container.style.width = '100vw'; container.style.height = '100vh';
  container.style.backgroundColor = '#000000';
  container.style.display = 'flex'; container.style.alignItems = 'center'; container.style.justifyContent = 'center';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const clickPrompt = document.createElement('div');
  clickPrompt.innerText = 'Натисніть в будь-якому місці, щоб продовжити...';
  clickPrompt.style.position = 'absolute';
  clickPrompt.style.bottom = '40px';
  clickPrompt.style.color = '#383d32';
  clickPrompt.style.fontFamily = 'monospace';
  clickPrompt.style.fontSize = '14px';
  clickPrompt.style.letterSpacing = '2px';
  container.appendChild(clickPrompt);

  if (h1) h1.style.opacity = '0';
  buttons.forEach(btn => btn.style.opacity = '0');
  contentElements.forEach(el => el.style.opacity = '0');

  if (logo) {
    container.appendChild(logo);
    logo.style.display = 'none'; 
    logo.style.backgroundColor = '#f74843';
    logo.style.color = '#000000';
    logo.style.fontFamily = "'Arial Black', 'Impact', sans-serif";
    logo.style.fontSize = '55px';
    logo.style.fontWeight = '900';
    logo.style.padding = '12px 25px 14px 28px';
    logo.style.letterSpacing = '-3px';
    logo.style.whiteSpace = 'nowrap';
    
    const valveE = logo.querySelector('.valve-e');
    if (valveE) {
      valveE.style.fontSize = '36px';
      valveE.style.display = 'inline-block';
      valveE.style.marginLeft = '2px';
      valveE.style.transform = 'translateY(-6px)';
    }
  }

  document.body.style.transition = "background-image 1.2s ease-in-out";

  const runIntro = () => {
    if (container.hasAttribute('data-started')) return;
    container.setAttribute('data-started', 'true');
    clickPrompt.style.display = 'none';

    if (logo) {
      logo.style.display = 'inline-flex';
      logo.style.opacity = '0';
      logo.style.transform = 'scale(0.95)';
      logo.style.transition = 'opacity 2s ease, transform 2s ease';
      setTimeout(() => {
        logo.style.opacity = '1';
        logo.style.transform = 'scale(1)';
      }, 50);
    }
    
    if (sounds) {
      sounds.muted = false;
      sounds.volume = 1.0;
      
      sounds.play().catch(err => {
        console.log("MP3 не підійшов, пробуєм WAV...");
        sounds.src = 'sounds/valve-intro.wav';
        sounds.play().catch(e => console.log("Файл інтро не знайден"));
      });

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
      document.body.style.backgroundImage = "url('images/photobackground1.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
      document.body.style.backgroundAttachment = "fixed";

      container.style.opacity = '0';
      container.style.visibility = 'hidden';
      container.style.transition = 'opacity 1s ease, visibility 1s ease';
      
      if (h1) { h1.style.opacity = '1'; h1.style.transition = 'opacity 1.5s ease'; }
      contentElements.forEach(el => { el.style.opacity = '1'; el.style.transition = 'opacity 1.5s ease'; });
      buttons.forEach(btn => { btn.style.opacity = '1'; btn.style.transition = 'opacity 1.5s ease'; });
      document.body.classList.add('intro-done');

      initBackgroundChanger();
    }, 8000);

    window.removeEventListener('touchstart', runIntro);
    window.removeEventListener('click', runIntro);
    window.removeEventListener('keydown', runIntro);
  };

  window.addEventListener('touchstart', runIntro, { once: true });
  window.addEventListener('click', runIntro, { once: true });
  window.addEventListener('keydown', runIntro, { once: true });

  buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (clickSound) {
            clickSound.currentTime = 0; 
            clickSound.play().catch(error => {
                console.log("Браузер заблокував звук кліка:", error);
            });
        }
    });
  });

  function initBackgroundChanger() {
    const backgroundMap = {
        'P1': 'images/photobackground.jpg',
        'P2': 'images/background_valve.jpg',
        'P3': 'images/background_cs16.jpg',
        'P4': 'images/background_modern.jpg'
    };

    const observerOptions = {
        root: null,
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const tagName = entry.target.tagName;
                if (backgroundMap[tagName]) {
                    document.body.style.backgroundImage = `url('${backgroundMap[tagName]}')`;
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('p1, p2, p3, p4').forEach(p => observer.observe(p));
  }
});
