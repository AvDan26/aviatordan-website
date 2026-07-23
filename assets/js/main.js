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

// Latest videos: add your YouTube API key and channel ID in video-config.js.
async function loadLatestVideos(){
  const grid=document.querySelector('#latest-videos');
  if(!grid) return;
  const cfg=window.AVDAN_VIDEO_CONFIG||{};
  if(!cfg.apiKey||!cfg.channelId){
    grid.innerHTML=`<a class="video-card glass" href="${cfg.channelUrl||'https://youtube.com/@aviatordan'}" target="_blank" rel="noopener"><div class="video-thumb"><div class="play">▶</div></div><div class="video-body"><h3>Latest AviatorDan uploads</h3><p>Open the channel to see the newest aviation videos.</p></div></a><div class="video-status">Automatic updates are ready once a YouTube API key and Channel ID are added to <strong>assets/js/video-config.js</strong>.</div>`;
    return;
  }
  try{
    const channelRes=await fetch(`https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${encodeURIComponent(cfg.channelId)}&key=${encodeURIComponent(cfg.apiKey)}`);
    if(!channelRes.ok) throw new Error('Channel request failed');
    const channelData=await channelRes.json();
    const uploads=channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
    if(!uploads) throw new Error('Uploads playlist not found');
    const listRes=await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploads}&maxResults=3&key=${encodeURIComponent(cfg.apiKey)}`);
    if(!listRes.ok) throw new Error('Videos request failed');
    const data=await listRes.json();
    grid.innerHTML=data.items.map(item=>{const s=item.snippet;const id=s.resourceId.videoId;const thumb=s.thumbnails?.maxres?.url||s.thumbnails?.high?.url||s.thumbnails?.medium?.url;return `<a class="video-card glass" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener"><div class="video-thumb" style="background-image:url('${thumb}');background-size:cover;background-position:center"><div class="play">▶</div></div><div class="video-body"><h3>${escapeHtml(s.title)}</h3><p>${escapeHtml((s.description||'').slice(0,110))}${(s.description||'').length>110?'…':''}</p></div></a>`}).join('');
  }catch(e){grid.innerHTML=`<div class="video-status">The latest videos could not load right now. <a href="${cfg.channelUrl}" target="_blank" rel="noopener">Watch on YouTube →</a></div>`;}
}
function escapeHtml(v){return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
loadLatestVideos();
