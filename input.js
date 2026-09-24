export class Input {
  constructor(canvas, onPause) {
    this.keys = new Set(); this.mouse = { x: 0, y: 0 }; this.mouseDown = false;
    this.move = { x: 0, y: 0 }; this.aim = { x: 0, y: 0 }; this.fire = false; this.ultimate = false;
    this.sticks = { move: null, aim: null };
    window.addEventListener('keydown', e => {
      this.keys.add(e.code);
      if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault();
      if (e.code === 'Escape') onPause();
    });
    window.addEventListener('keyup', e => this.keys.delete(e.code));
    canvas.addEventListener('pointermove', e => { const r=canvas.getBoundingClientRect(); this.mouse={x:e.clientX-r.left,y:e.clientY-r.top}; });
    canvas.addEventListener('pointerdown', e => { if(e.target===canvas && e.button===0) this.mouseDown=true; });
    window.addEventListener('pointerup', e => { if(e.button===0) this.mouseDown=false; });
    this.bindStick('move', document.querySelector('#move-stick'));
    this.bindStick('aim', document.querySelector('#aim-stick'));
    document.querySelector('#fire-btn').addEventListener('pointerdown',e=>{e.preventDefault();this.fire=true;});
    for(const ev of ['pointerup','pointercancel','pointerleave']) document.querySelector('#fire-btn').addEventListener(ev,()=>this.fire=false);
    document.querySelector('#ult-btn').addEventListener('pointerdown',e=>{e.preventDefault();this.ultimate=true;});
  }
  bindStick(name, el) {
    const update=e=>{const r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;let x=(e.clientX-cx)/(r.width*.38),y=(e.clientY-cy)/(r.height*.38);const l=Math.hypot(x,y);if(l>1){x/=l;y/=l;}this[name]={x,y};el.style.setProperty('--sx',`${x*30}px`);el.style.setProperty('--sy',`${y*30}px`);};
    el.addEventListener('pointerdown',e=>{e.preventDefault();el.setPointerCapture(e.pointerId);this.sticks[name]=e.pointerId;update(e);});
    el.addEventListener('pointermove',e=>{if(this.sticks[name]===e.pointerId)update(e);});
    const end=e=>{if(this.sticks[name]===e.pointerId){this.sticks[name]=null;this[name]={x:0,y:0};el.style.setProperty('--sx','0px');el.style.setProperty('--sy','0px');}};
    el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
  }
  get movement(){let x=(this.keys.has('KeyD')?1:0)-(this.keys.has('KeyA')?1:0), y=(this.keys.has('KeyW')?1:0)-(this.keys.has('KeyS')?1:0);if(Math.hypot(this.move.x,this.move.y)>.08){x=this.move.x;y=-this.move.y;}return{x,y};}
  get firing(){return this.mouseDown||this.fire;}
  get ultimatePressed(){const v=this.keys.has('Space')||this.ultimate;this.ultimate=false;return v;}
}
