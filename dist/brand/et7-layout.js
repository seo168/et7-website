(()=>{
function layout(){
 const logo=document.querySelector('img[alt="ET7 logo"]');
 const header=logo?.closest('.fixed');
 if(header){header.setAttribute('data-et7-header','');header.querySelectorAll('[data-et7-brand]').forEach(e=>e.removeAttribute('data-et7-brand'));let brand=logo.parentElement;if(brand)brand.setAttribute('data-et7-brand','');document.documentElement.style.setProperty('--et7-header-height',`${Math.ceil(header.getBoundingClientRect().height)}px`)}
 // Keep the single ET7 app card and remove the inherited launch countdown.
 document.querySelectorAll('.aw9-platform-row').forEach(row=>{const img=row.querySelector('img');if(img&&!/^ET7(?:\.COM)?$/i.test(img.alt)){row.remove();return}row.classList.remove('aw9-platform-coming');row.querySelectorAll('.aw9-platform-countdown').forEach(e=>e.remove());const play=row.querySelector('.aw9-platform-play');if(play)play.setAttribute('data-et7-download','')});
 if(!document.querySelector('.et7-reference-note')){const note=document.createElement('div');note.className='et7-reference-note';note.textContent='Design reference / डिज़ाइन संदर्भ: Banner artwork and promotional examples are copied from AW9. Bonus, rating, testimonial and licensing details are not verified ET7 claims.';document.querySelector('main')?.append(note)}
}
let pending=false;const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;layout()})}};new MutationObserver(schedule).observe(document.getElementById('app'),{childList:true,subtree:true});window.addEventListener('resize',schedule);layout();
})();
