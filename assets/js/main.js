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


// Auto-hide navigation
const header=document.querySelector("header");
let lastScrollY=window.scrollY;

window.addEventListener("scroll",()=>{
  const y=window.scrollY;

  if(y>20){
    header.classList.add("scrolled");
  }else{
    header.classList.remove("scrolled");
  }

  if(y>lastScrollY && y>100){
    header.classList.add("nav-hidden");
  }else{
    header.classList.remove("nav-hidden");
  }

  lastScrollY=y;
});
