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
  const updateCloudReveal = () => {
    const rect = cloudReveal.getBoundingClientRect();
    const viewportHeight = window.innerHeight || 1;
    const progress = Math.min(1, Math.max(0, (viewportHeight - rect.top) / (viewportHeight * 0.82)));
    cloudReveal.style.setProperty('--cloud-break', progress.toFixed(3));
  };

  updateCloudReveal();
  window.addEventListener('scroll', updateCloudReveal, { passive: true });
  window.addEventListener('resize', updateCloudReveal);
}
