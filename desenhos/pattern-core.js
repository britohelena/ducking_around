/* Motor partilhado dos padrões de ponto cruz.
 * Cada desenho (data/*.js) chama registerPattern({...}); as páginas e a galeria
 * usam PatternCore para calcular totais e desenhar o gráfico.
 *
 * Formato de um desenho:
 *   id, title, blurb, grid[] ("." = sem ponto), floss{chave:{dmc,name,hex,sym}},
 *   notes[[titulo,texto]], howto[] (opcional), storageKey (opcional)
 */
window.PATTERNS = window.PATTERNS || [];
function registerPattern(p){ window.PATTERNS.push(p); }

const PatternCore = (function(){
  const SYMFONT = '"Segoe UI Symbol","DejaVu Sans","Noto Sans Symbols2","Arial Unicode MS",Arial,sans-serif';

  function lum(hex){const n=parseInt(hex.slice(1),16);const r=n>>16,g=(n>>8)&255,b=n&255;return (0.299*r+0.587*g+0.114*b)/255;}
  function rgba(hex,a){const n=parseInt(hex.slice(1),16);return `rgba(${n>>16},${(n>>8)&255},${n&255},${a})`;}
  function shade(hex,f){const n=parseInt(hex.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;
    const t=f<0?0:255,p=Math.abs(f);r=Math.round((t-r)*p+r);g=Math.round((t-g)*p+g);b=Math.round((t-b)*p+b);
    return `rgb(${r},${g},${b})`;}

  // Acrescenta cols/rows/counts/total/order/ncol ao desenho (uma só vez)
  function prepare(P){
    if (P.cols) return P;
    P.cols = P.grid[0].length; P.rows = P.grid.length;
    P.counts = {}; P.total = 0;
    for (const r of P.grid) for (const k of r) if (k !== ".") { P.counts[k] = (P.counts[k]||0)+1; P.total++; }
    P.order = Object.keys(P.floss).filter(k=>P.counts[k]).sort((a,b)=>P.counts[b]-P.counts[a]);
    P.ncol = P.order.length;
    return P;
  }

  // Um ponto cruz completo: "/" e depois "\" com um brilho suave
  function drawCross(c, x, y, s, hex, dim){
    const p = s*.11, w = Math.max(1.2, s*.30);
    c.save();
    c.globalAlpha = dim ? .15 : 1;
    c.lineCap = "round";
    const seg = (x1,y1,x2,y2,col,lw)=>{ c.strokeStyle=col; c.lineWidth=lw; c.beginPath(); c.moveTo(x+x1,y+y1); c.lineTo(x+x2,y+y2); c.stroke(); };
    seg(p,s-p,s-p,p, shade(hex,-.22), w);
    seg(p,s-p,s-p,p, hex, w*.72);
    seg(p,p,s-p,s-p, shade(hex,-.12), w);
    seg(p,p,s-p,s-p, hex, w*.72);
    seg(p+s*.04,p+s*.02,s-p-s*.06,s-p-s*.08, shade(hex,.35), Math.max(.8,w*.18));
    c.restore();
  }

  /* opts: {cell, mode(color|symbol|both|tint|preview), grid, coord, iso, done, margin, dpr, heavy, fs, centerMarks} */
  function render(P, c, opts){
    prepare(P);
    const COLS = P.cols, ROWS = P.rows, GRID = P.grid, FLOSS = P.floss;
    const cell = opts.cell, m = opts.margin;
    const W = COLS*cell + m*2, H = ROWS*cell + m*2;
    const dpr = opts.dpr || 1;
    c.canvas.width = Math.round(W*dpr); c.canvas.height = Math.round(H*dpr);
    c.setTransform(dpr,0,0,dpr,0,0);
    c.fillStyle = "#fff"; c.fillRect(0,0,W,H);
    c.save(); c.translate(m,m);

    const preview = opts.mode === "preview";
    if (preview){
      c.fillStyle = "#f4f6f9"; c.fillRect(0,0,COLS*cell,ROWS*cell);
      if (cell >= 8){
        c.fillStyle = "rgba(90,100,120,.28)";
        const r = Math.max(.6, cell*.055);
        for (let y=0;y<=ROWS;y++) for (let x=0;x<=COLS;x++){ c.beginPath(); c.arc(x*cell,y*cell,r,0,6.2832); c.fill(); }
      }
    }

    for (let y=0;y<ROWS;y++){
      for (let x=0;x<COLS;x++){
        const k = GRID[y][x]; if (k === ".") continue;
        const f = FLOSS[k]; const px = x*cell, py = y*cell;
        const dim = opts.iso && opts.iso !== k;
        if (preview){
          drawCross(c, px, py, cell, f.hex, dim);
        } else {
          if (opts.mode === "color" || opts.mode === "both"){
            c.fillStyle = dim ? rgba(f.hex,.18) : f.hex; c.fillRect(px,py,cell,cell);
          } else if (opts.mode === "tint"){
            c.fillStyle = dim ? rgba(f.hex,.08) : rgba(f.hex, lum(f.hex)>.97?0:.42); c.fillRect(px,py,cell,cell);
          }
          if (opts.mode !== "color" && cell >= 9){
            if (dim) c.globalAlpha = .18;
            c.fillStyle = (opts.mode==="both") ? (lum(f.hex) > .6 ? "#111" : "#fff") : "#111";
            c.font = `${Math.round(cell*.7)}px ${SYMFONT}`; c.textAlign = "center"; c.textBaseline = "middle";
            c.fillText(f.sym, px+cell/2, py+cell/2+cell*.04);
            c.globalAlpha = 1;
          }
        }
        if (opts.done && opts.done.has(y*COLS+x)){
          c.fillStyle = "rgba(255,255,255,.65)"; c.fillRect(px,py,cell,cell);
          c.strokeStyle = "#2a8a4a"; c.lineWidth = Math.max(1.5,cell*.1); c.beginPath();
          c.moveTo(px+cell*.2,py+cell*.55); c.lineTo(px+cell*.42,py+cell*.78); c.lineTo(px+cell*.8,py+cell*.25); c.stroke();
        }
      }
    }

    if (opts.grid && (!preview || cell>=14)){
      c.lineWidth = 1;
      if (cell >= 8){
        c.strokeStyle = preview ? "rgba(0,0,0,.10)" : "#c4c9d1"; c.beginPath();
        for (let x=0;x<=COLS;x++){ if (x%5===0) continue; c.moveTo(Math.round(x*cell)+.5,0); c.lineTo(Math.round(x*cell)+.5,ROWS*cell); }
        for (let y=0;y<=ROWS;y++){ if (y%5===0) continue; c.moveTo(0,Math.round(y*cell)+.5); c.lineTo(COLS*cell,Math.round(y*cell)+.5); }
        c.stroke();
      }
      c.strokeStyle = preview ? "rgba(0,0,0,.28)" : "#7a8190"; c.beginPath();
      for (let x=0;x<=COLS;x+=5){ if (x%10===0) continue; c.moveTo(Math.round(x*cell)+.5,0); c.lineTo(Math.round(x*cell)+.5,ROWS*cell); }
      for (let y=0;y<=ROWS;y+=5){ if (y%10===0) continue; c.moveTo(0,Math.round(y*cell)+.5); c.lineTo(COLS*cell,Math.round(y*cell)+.5); }
      c.stroke();
      c.strokeStyle = "#111"; c.lineWidth = opts.heavy || (cell>=14?2:1.4); c.beginPath();
      for (let x=0;x<=COLS;x+=10){ c.moveTo(x*cell,0); c.lineTo(x*cell,ROWS*cell); }
      for (let y=0;y<=ROWS;y+=10){ c.moveTo(0,y*cell); c.lineTo(COLS*cell,y*cell); }
      c.stroke();
    }
    c.strokeStyle = "#111"; c.lineWidth = 1.5; c.strokeRect(0,0,COLS*cell,ROWS*cell);

    if (opts.coord){
      const fs = opts.fs || Math.max(9, Math.min(15, Math.round(cell*.55)));
      c.fillStyle = "#111"; c.font = `600 ${fs}px "Segoe UI",Arial,sans-serif`;
      c.textAlign = "center"; c.textBaseline = "middle";
      const lab = (n,x,y)=>c.fillText(String(n),x,y);
      const g = Math.round(m/2);
      for (let n=10;n<=COLS;n+=10){ lab(n,n*cell,-g); lab(n,n*cell,ROWS*cell+g); }
      for (let n=10;n<=ROWS;n+=10){ lab(n,-g,n*cell); lab(n,COLS*cell+g,n*cell); }
      lab(1, cell/2, -g); lab(1,-g,cell/2);
      c.strokeStyle = "#111"; c.lineWidth = 1; c.beginPath();
      const t = Math.max(3,cell*.22);
      for (let x=0;x<=COLS;x+=5){ c.moveTo(x*cell,0); c.lineTo(x*cell,-t); c.moveTo(x*cell,ROWS*cell); c.lineTo(x*cell,ROWS*cell+t); }
      for (let y=0;y<=ROWS;y+=5){ c.moveTo(0,y*cell); c.lineTo(-t,y*cell); c.moveTo(COLS*cell,y*cell); c.lineTo(COLS*cell+t,y*cell); }
      c.stroke();
    }
    if (opts.centerMarks){
      c.fillStyle = "#355A3F";
      const cx = (COLS/2)*cell, cy = (ROWS/2)*cell, s = cell*.55;
      c.beginPath(); c.moveTo(cx,-2); c.lineTo(cx-s/2,-2-s); c.lineTo(cx+s/2,-2-s); c.fill();
      c.beginPath(); c.moveTo(cx,ROWS*cell+2); c.lineTo(cx-s/2,ROWS*cell+2+s); c.lineTo(cx+s/2,ROWS*cell+2+s); c.fill();
      c.beginPath(); c.moveTo(-2,cy); c.lineTo(-2-s,cy-s/2); c.lineTo(-2-s,cy+s/2); c.fill();
      c.beginPath(); c.moveTo(COLS*cell+2,cy); c.lineTo(COLS*cell+2+s,cy-s/2); c.lineTo(COLS*cell+2+s,cy+s/2); c.fill();
    }
    c.restore();
    return {w:W,h:H};
  }

  return { prepare, render, lum };
})();
