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

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  const target = link.getAttribute('href');
  if ((currentFile === 'index.html' && target === 'index.html') || target === currentFile) {
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


// Premium auto-hiding navigation
const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
  let lastScrollY = window.scrollY;
  let accumulatedDelta = 0;
  let ticking = false;

  const hideAfter = 120;
  const directionThreshold = 18;

  const updateNavigation = () => {
    const currentScrollY = Math.max(window.scrollY, 0);
    const delta = currentScrollY - lastScrollY;

    if (Math.sign(delta) !== Math.sign(accumulatedDelta)) {
      accumulatedDelta = 0;
    }

    accumulatedDelta += delta;

    const menuIsOpen = document.body.classList.contains('menu-open');

    if (currentScrollY <= 12 || menuIsOpen) {
      siteHeader.classList.remove('nav-hidden');
      accumulatedDelta = 0;
    } else if (
      currentScrollY > hideAfter &&
      accumulatedDelta > directionThreshold
    ) {
      siteHeader.classList.add('nav-hidden');
      accumulatedDelta = 0;
    } else if (accumulatedDelta < -directionThreshold) {
      siteHeader.classList.remove('nav-hidden');
      accumulatedDelta = 0;
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavigation);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener('pageshow', () => {
    lastScrollY = window.scrollY;
    siteHeader.classList.remove('nav-hidden');
  });
}
