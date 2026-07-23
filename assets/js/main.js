const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  if (!menuButton || !navLinks) return;
  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
}

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const willOpen = !navLinks.classList.contains('is-open');
    navLinks.classList.toggle('is-open', willOpen);
    menuButton.setAttribute('aria-expanded', String(willOpen));
    document.body.classList.toggle('menu-open', willOpen);
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (
      navLinks.classList.contains('is-open') &&
      !navLinks.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
document.querySelectorAll('.nav-links a, .desktop-nav a').forEach((link) => {
  const targetPath = new URL(link.href, window.location.origin).pathname.replace(/\/+$/, '') || '/';
  if (targetPath === currentPath) {
    link.setAttribute('aria-current', 'page');
  }
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clouds = Array.from(document.querySelectorAll('.cloud'));

if (!reduceMotion && clouds.length) {
  let ticking = false;

  const updateClouds = () => {
    const scrollY = window.scrollY;
    clouds.forEach((cloud, index) => {
      const depth = Number(cloud.dataset.depth || 0.04);
      const drift = Math.sin((scrollY + index * 170) / 760) * (12 + index * 4);
      cloud.style.translate = `${drift}px ${scrollY * depth}px`;
    });
    ticking = false;
  };

  const requestCloudUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateClouds);
      ticking = true;
    }
  };

  updateClouds();
  window.addEventListener('scroll', requestCloudUpdate, { passive: true });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}


// Stable auto-hiding navigation for desktop and mobile
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  let previousY = Math.max(window.scrollY, 0);
  let distance = 0;
  let framePending = false;

  const hideAfterY = 110;
  const movementThreshold = 14;

  const renderHeader = () => {
    const currentY = Math.max(window.scrollY, 0);
    const movement = currentY - previousY;
    const menuOpen = document.body.classList.contains('menu-open');

    if (movement === 0) {
      framePending = false;
      return;
    }

    if (Math.sign(movement) !== Math.sign(distance)) {
      distance = 0;
    }

    distance += movement;

    if (currentY <= 10 || menuOpen) {
      siteHeader.classList.remove('nav-hidden');
      distance = 0;
    } else if (currentY > hideAfterY && distance >= movementThreshold) {
      siteHeader.classList.add('nav-hidden');
      distance = 0;
    } else if (distance <= -movementThreshold) {
      siteHeader.classList.remove('nav-hidden');
      distance = 0;
    }

    previousY = currentY;
    framePending = false;
  };

  const queueHeaderUpdate = () => {
    if (!framePending) {
      window.requestAnimationFrame(renderHeader);
      framePending = true;
    }
  };

  window.addEventListener('scroll', queueHeaderUpdate, { passive: true });

  window.addEventListener('orientationchange', () => {
    siteHeader.classList.remove('nav-hidden');
    previousY = Math.max(window.scrollY, 0);
    distance = 0;
  });

  window.addEventListener('pageshow', () => {
    siteHeader.classList.remove('nav-hidden');
    previousY = Math.max(window.scrollY, 0);
    distance = 0;
  });
}


const cloudReveal = document.querySelector('.cloud-reveal');

if (cloudReveal) {
  let currentCloudProgress = 0;
  let targetCloudProgress = 0;
  let cloudAnimationFrame = 0;

  const setCloudTarget = () => {
    const viewportHeight = Math.max(window.innerHeight, 1);
    targetCloudProgress = Math.min(1, Math.max(0, window.scrollY / (viewportHeight * 0.72)));

    if (!cloudAnimationFrame) {
      cloudAnimationFrame = window.requestAnimationFrame(animateCloudReveal);
    }
  };

  const animateCloudReveal = () => {
    currentCloudProgress += (targetCloudProgress - currentCloudProgress) * 0.14;

    if (Math.abs(targetCloudProgress - currentCloudProgress) < 0.001) {
      currentCloudProgress = targetCloudProgress;
    }

    const eased = currentCloudProgress * currentCloudProgress * (3 - (2 * currentCloudProgress));
    cloudReveal.style.setProperty('--cloud-break', eased.toFixed(4));

    if (currentCloudProgress !== targetCloudProgress) {
      cloudAnimationFrame = window.requestAnimationFrame(animateCloudReveal);
    } else {
      cloudAnimationFrame = 0;
    }
  };

  setCloudTarget();
  window.addEventListener('scroll', setCloudTarget, { passive: true });
  window.addEventListener('resize', setCloudTarget, { passive: true });
}


const aboutSlideshow = document.querySelector('[data-about-slideshow]');

if (aboutSlideshow) {
  const slides = Array.from(aboutSlideshow.querySelectorAll('.about-slide'));
  const dots = Array.from(aboutSlideshow.querySelectorAll('.about-slide-dot'));
  const slideArea = aboutSlideshow.querySelector('[data-slides]');
  let activeSlide = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let autoplayTimer = 0;

  const showAboutSlide = (index, restartAutoplay = true) => {
    activeSlide = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === activeSlide);
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeSlide;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', String(isActive));
    });

    if (restartAutoplay) {
      startAboutAutoplay();
    }
  };

  const startAboutAutoplay = () => {
    window.clearInterval(autoplayTimer);

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      autoplayTimer = window.setInterval(() => {
        showAboutSlide(activeSlide + 1, false);
      }, 5200);
    }
  };

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      showAboutSlide(Number(dot.dataset.slideIndex));
    });
  });

  slideArea.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  slideArea.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - touchStartX;
    const distanceY = touch.clientY - touchStartY;

    if (Math.abs(distanceX) > 45 && Math.abs(distanceX) > Math.abs(distanceY)) {
      showAboutSlide(activeSlide + (distanceX < 0 ? 1 : -1));
    }
  }, { passive: true });

  aboutSlideshow.addEventListener('mouseenter', () => {
    window.clearInterval(autoplayTimer);
  });

  aboutSlideshow.addEventListener('mouseleave', startAboutAutoplay);
  startAboutAutoplay();
}
