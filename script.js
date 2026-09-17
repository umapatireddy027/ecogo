let angle = 0;
let autoSpin = false;
let spinTimer = null;
let dragging = false;
let lastX = 0;

const viewerStage = document.getElementById('viewerStage');
const spinBottle = document.getElementById('spinBottle');
const angleRange = document.getElementById('angleRange');

function renderBottle(){
  if(!spinBottle) return;
  spinBottle.style.transform = `rotateY(${angle}deg)`;
  if(angleRange) angleRange.value = ((angle % 360) + 360) % 360;
}
function rotateBottle(delta){
  angle = (angle + delta + 360) % 360;
  renderBottle();
}
if(viewerStage){
  viewerStage.addEventListener('pointerdown', e=>{
    dragging=true; lastX=e.clientX; viewerStage.setPointerCapture(e.pointerId);
  });
  viewerStage.addEventListener('pointermove', e=>{
    if(!dragging) return;
    angle = (angle + (e.clientX-lastX)*0.7 + 360) % 360;
    lastX=e.clientX; renderBottle();
  });
  viewerStage.addEventListener('pointerup', ()=>dragging=false);
  viewerStage.addEventListener('pointercancel', ()=>dragging=false);
}
if(angleRange){
  angleRange.addEventListener('input', e=>{ angle=Number(e.target.value); renderBottle(); });
}
function toggleAutoSpin(){
  autoSpin=!autoSpin;
  const btn=document.getElementById('autoSpinBtn');
  if(autoSpin){
    btn.textContent='❚❚ Pause 360°';
    spinTimer=setInterval(()=>rotateBottle(3),30);
  }else{
    btn.textContent='▶ Auto 360°';
    clearInterval(spinTimer);
  }
}
function selectProduct(size){
  const bottleSize=document.getElementById('bottleSize');
  if(bottleSize) bottleSize.value=size;
  const quote=document.getElementById('quote');
  if(quote) quote.scrollIntoView({behavior:'smooth'});
}
function updatePreview(){
  const value=document.getElementById('brandName')?.value.trim();
  const brand=document.getElementById('spinBrand');
  if(brand) brand.textContent=value || 'YOUR BRAND';
}
function updateSize(){
  const size=document.getElementById('bottleSize').value;
  const label=document.getElementById('spinSize');
  if(label) label.textContent=size.toUpperCase();
}
function updateStyle(style){
  const label=document.querySelector('.spin-label');
  if(!label) return;
  if(style==='clean'){label.style.background='#fff';label.style.color='#174c3a'}
  if(style==='natural'){label.style.background='#f8f2df';label.style.color='#174c3a'}
  if(style==='premium'){label.style.background='#174c3a';label.style.color='#fff'}
}
function submitQuote(e){
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.target).entries());
  const text=`Hello EcoGo, I am ${data.name}. I need ${data.size || 'paper bottles'}, quantity ${data.quantity || 'to be confirmed'}. ${data.message || ''}`;
  window.open('https://wa.me/918919522552?text='+encodeURIComponent(text),'_blank');
}
renderBottle();
