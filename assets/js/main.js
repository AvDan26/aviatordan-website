const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));});

document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks?.classList.remove('open')));

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const clouds=[...document.querySelectorAll('.cloud')];
let ticking=false;
function updateSky(){const y=window.scrollY; clouds.forEach((c,i)=>c.style.transform=`translate3d(${(i%2?1:-1)*y*(.018+i*.006)}px,${y*(.04+i*.012)}px,0)`); ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateSky);ticking=true;}},{passive:true});
