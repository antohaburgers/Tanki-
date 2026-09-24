import { CONFIG } from './config.js';
import { Input } from './input.js';
import { Game } from './game.js';

const canvas=document.querySelector('#game');
const $=s=>document.querySelector(s);
const screens=[$('#menu'),$('#upgrade-screen'),$('#pause-screen'),$('#end-screen')];
const ui={
  hideAll(){screens.forEach(x=>x.classList.add('hidden'));$('#hud').classList.remove('hidden');},
  showMenu(){screens.forEach(x=>x.classList.add('hidden'));$('#menu').classList.remove('hidden');$('#hud').classList.add('hidden');},
  waveBanner(n){this.toast(`ВОЛНА ${n} / ${CONFIG.waves.length}`);},
  bossToast(){setTimeout(()=>this.toast('ТЯЖЁЛЫЙ ШТУРМОВОЙ ТАНК'),500);},
  toast(t){const e=$('#toast');e.textContent=t;e.classList.remove('hidden');e.style.animation='none';void e.offsetWidth;e.style.animation='';setTimeout(()=>e.classList.add('hidden'),1550);},
  updateHud(g){$('#wave-num').textContent=`${g.wave} / ${CONFIG.waves.length}`;$('#hp-text').textContent=`${Math.ceil(g.player.hp)} / ${Math.ceil(g.player.maxHp)}`;$('#hp-bar').style.width=`${Math.max(0,g.player.hp/g.player.maxHp*100)}%`;$('#hp-bar').style.background=g.player.hp/g.player.maxHp<.3?'#e65f45':'#d4e28a';$('#enemy-count').textContent=g.enemies.length+g.spawnQueue;$('#kill-count').textContent=g.kills;$('#ult-progress').style.width=`${Math.min(100,g.ultKills/CONFIG.ultimate.killsRequired*100)}%`;$('#ult-btn').classList.toggle('ready',g.ultKills>=CONFIG.ultimate.killsRequired);},
  showUpgrades(items){screens.forEach(x=>x.classList.add('hidden'));$('#hud').classList.add('hidden');$('#upgrade-screen').classList.remove('hidden');$('#upgrade-cards').replaceChildren(...items.map((u,i)=>{const b=document.createElement('button');b.className='upgrade-card';b.innerHTML=`<span class="rarity">${u.rarity}</span><strong>${u.name}</strong><span>${u.desc}</span>`;b.addEventListener('click',()=>game.chooseUpgrade(i));return b;}));game.upgrades=items;},
  showPause(){screens.forEach(x=>x.classList.add('hidden'));$('#pause-screen').classList.remove('hidden');},
  showEnd(victory,g){screens.forEach(x=>x.classList.add('hidden'));$('#hud').classList.add('hidden');$('#end-screen').classList.remove('hidden');$('#end-eyebrow').textContent=victory?'МИССИЯ ВЫПОЛНЕНА':'ЗАБЕГ ОКОНЧЕН';$('#end-title').textContent=victory?'ПОБЕДА':'ТАНК УНИЧТОЖЕН';$('#end-stats').innerHTML=`<div><b>${g.wave} / 3</b>ВОЛНА</div><div><b>${g.kills}</b>УБИЙСТВА</div><div><b>${g.ults}</b>УЛЬТЫ</div>`;}
};
const input=new Input(canvas,()=>game?.togglePause());
const game=new Game(canvas,input,ui);
function resize(){const dpr=Math.min(window.devicePixelRatio||1,2),w=canvas.clientWidth,h=canvas.clientHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);game.ctx.setTransform(dpr,0,0,dpr,0,0);}
window.addEventListener('resize',resize);resize();
$('#start-btn').addEventListener('click',()=>game.start());$('#retry-btn').addEventListener('click',()=>game.start());$('#pause-restart').addEventListener('click',()=>game.start());$('#resume-btn').addEventListener('click',()=>game.togglePause());$('#pause-btn').addEventListener('click',()=>game.togglePause());$('#menu-btn').addEventListener('click',()=>{game.state='menu';ui.showMenu();});
function loop(ts){const dt=Math.min((ts-game.last)/1000||0,1/30);game.last=ts;if(game.state==='playing')game.update(dt);game.render();if(CONFIG.debug){$('#debug').classList.remove('hidden');$('#debug').textContent=`${Math.round(1/dt)} FPS | enemies ${game.enemies.length} | shots ${game.shots.length} | particles ${game.particles.length} | wave ${game.wave} | ${game.state}`;}requestAnimationFrame(loop);}requestAnimationFrame(loop);
ui.showMenu();
