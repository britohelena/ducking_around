/* Interface da página de um desenho: usa o desenho indicado em <body data-pattern="id"> */
(function(){
  const P = PatternCore.prepare(window.PATTERNS.find(p=>p.id===document.body.dataset.pattern));
  const { cols:COLS, rows:ROWS, grid:GRID, floss:FLOSS, counts, total:TOTAL, order:ORDER, ncol:NCOL } = P;
  const $ = id => document.getElementById(id);
  const lum = PatternCore.lum;

  const cmOf = (n,ct)=>(n/ct*2.54).toFixed(1).replace(".",",");
  const inOf = (n,ct)=>(n/ct).toFixed(1).replace(".",",");
  const KEY = P.storageKey || ("ponto-cruz-" + P.id);

  const cv = $("cv"), ctx = cv.getContext("2d");
  const state = { mode:"color", cell:22, grid:true, coord:true, iso:null, track:false };
  let done = new Set();
  try{ const s = localStorage.getItem(KEY); if(s) done = new Set(JSON.parse(s)); }catch(e){}

  const HOWTO = P.howto || [
    "Aida 14 ct, com margem de uns 8 pontos à volta; 2 fios de mouliné.",
    "Começa pelo centro (setas) e conta a partir daí. Cada quadrado = 1 ponto cruz completo."
  ];

  /* ---------------------------------------------------------------- legenda */
  function legendHTML(){
    let h = `<thead><tr><th>Símb.</th><th>DMC</th><th>Cor</th><th class="num">Pontos</th><th class="num">%</th></tr></thead><tbody>`;
    for (const k of ORDER){
      const f = FLOSS[k];
      const sw = `<span class="sw" style="background:${f.hex};color:${lum(f.hex)>.6?'#111':'#fff'}">${f.sym}</span>`;
      h += `<tr class="row" data-k="${k}"><td>${sw}</td><td><b>${f.dmc}</b></td><td>${f.name}</td>`+
           `<td class="num">${counts[k]}</td><td class="num">${(counts[k]*100/TOTAL).toFixed(1).replace(".",",")}</td></tr>`;
    }
    h += `</tbody><tfoot><tr><td colspan="3">Total de pontos</td><td class="num">${TOTAL}</td><td class="num">100</td></tr></tfoot>`;
    return h;
  }
  const notesHTML = ()=> "<ul>"+P.notes.map(n=>`<li><b>${n[0]}:</b> ${n[1]}</li>`).join("")+"</ul>";
  const howtoHTML = ()=> "<ul>"+HOWTO.map(t=>`<li>${t}</li>`).join("")+"</ul>";
  function factsHTML(){
    return `<dt>Grelha</dt><dd>${COLS} de largura × ${ROWS} de altura</dd>`+
      `<dt>Total de pontos</dt><dd>${TOTAL}</dd>`+
      `<dt>Cores</dt><dd>${NCOL} DMC (sem misturas)</dd>`+
      `<dt>Tecido (sugerido)</dt><dd>Aida 14 ct → ${inOf(COLS,14)} × ${inOf(ROWS,14)} pol (${cmOf(COLS,14)} × ${cmOf(ROWS,14)} cm)<br>Aida 16 ct → ${cmOf(COLS,16)} × ${cmOf(ROWS,16)} cm</dd>`+
      `<dt>Fios</dt><dd>2 de 6 por quadrado de Aida</dd>`+
      `<dt>Pontos especiais</dt><dd>Nenhum (sem pesponto nem nós franceses)</dd>`;
  }

  /* ------------------------------------------------------------------- UI */
  const IDLE = "Passa o rato num ponto para ver as coordenadas · clica numa linha da legenda para isolar uma cor · Ctrl + roda para ampliar";
  const marginFor = ()=> state.coord?Math.max(22,Math.round(state.cell*.9)):6;
  function updateProgress(){
    const n = done.size;
    $("pb").style.width = (n/TOTAL*100)+"%";
    $("pt").textContent = `${n} de ${TOTAL} pontos (${Math.round(n/TOTAL*100)}%)`;
  }
  function redraw(){
    const dpr = Math.max(1,window.devicePixelRatio||1);
    PatternCore.render(P, ctx,{cell:state.cell,mode:state.mode,grid:state.grid,coord:state.coord,iso:state.iso,done:done,
                margin:marginFor(),dpr:dpr,centerMarks:state.coord});
    cv.style.width = (cv.width/dpr)+"px"; cv.style.height = (cv.height/dpr)+"px";
    $("zVal").textContent = state.cell+" px";
    $("zoom").value = state.cell;
    updateProgress();
  }
  function setZoom(z){ state.cell = Math.max(6,Math.min(64,Math.round(z))); redraw(); }

  $("modeSeg").addEventListener("click",e=>{
    const b = e.target.closest("button"); if(!b) return;
    state.mode = b.dataset.mode;
    [...document.querySelectorAll("#modeSeg button")].forEach(x=>x.classList.toggle("on",x===b));
    redraw();
  });
  $("zoom").addEventListener("input",e=>setZoom(+e.target.value));
  $("zIn").onclick = ()=>setZoom(state.cell+2);
  $("zOut").onclick = ()=>setZoom(state.cell-2);
  $("zFit").onclick = ()=>{
    const sc = $("scroll"), m = marginFor();
    const z = Math.min((sc.clientWidth-40)/(COLS+2*m/state.cell), (sc.clientHeight-40)/(ROWS+2*m/state.cell));
    setZoom(Math.floor(z));
  };
  $("chkGrid").onchange = e=>{state.grid=e.target.checked;redraw();};
  $("chkCoord").onchange = e=>{state.coord=e.target.checked;redraw();};
  $("chkTrack").onchange = e=>{state.track=e.target.checked;cv.style.cursor=state.track?"pointer":"default";};
  $("scroll").addEventListener("wheel",e=>{
    if(!e.ctrlKey) return; e.preventDefault(); setZoom(state.cell + (e.deltaY<0?2:-2));
  },{passive:false});
  window.addEventListener("keydown",e=>{
    if(e.target.tagName==="INPUT"&&e.target.type!=="checkbox") return;
    if(e.key==="+"||e.key==="=") setZoom(state.cell+2);
    if(e.key==="-"||e.key==="_") setZoom(state.cell-2);
  });

  function cellAt(e){
    const r = cv.getBoundingClientRect(), m = marginFor();
    return [Math.floor((e.clientX-r.left-m)/state.cell), Math.floor((e.clientY-r.top-m)/state.cell)];
  }
  const st = $("status"); st.textContent = IDLE;
  cv.addEventListener("mousemove",e=>{
    const [x,y] = cellAt(e);
    if (x<0||y<0||x>=COLS||y>=ROWS){ st.textContent = IDLE; return; }
    const k = GRID[y][x];
    st.textContent = `Ponto coluna ${x+1}, linha ${y+1} — ` + (k==="."?"sem ponto (tecido livre)":`${FLOSS[k].sym}  DMC ${FLOSS[k].dmc} ${FLOSS[k].name}`);
  });
  cv.addEventListener("mouseleave",()=>{ st.textContent = IDLE; });
  cv.addEventListener("click",e=>{
    if(!state.track) return;
    const [x,y] = cellAt(e);
    if (x<0||y<0||x>=COLS||y>=ROWS||GRID[y][x]===".") return;
    const id = y*COLS+x; done.has(id)?done.delete(id):done.add(id);
    try{ localStorage.setItem(KEY,JSON.stringify([...done])); }catch(_){}
    redraw();
  });
  $("reset").onclick = ()=>{
    done.clear(); try{ localStorage.removeItem(KEY); }catch(_){}
    redraw();
  };
  $("legend").addEventListener("click",e=>{
    const tr = e.target.closest("tr.row"); if(!tr) return;
    state.iso = (state.iso===tr.dataset.k)?null:tr.dataset.k;
    document.querySelectorAll("#legend tr.row").forEach(r=>r.classList.toggle("active",r.dataset.k===state.iso));
    redraw();
  });

  document.title = `${P.title} — padrão de ponto cruz`;
  $("title").textContent = P.title;
  $("titleP").textContent = P.title;
  $("subline").textContent =
    `Gráfico de ponto cruz · ${COLS} × ${ROWS} pontos · ${NCOL} cores DMC · só pontos cruz completos`;
  $("metaP").textContent =
    `Gráfico de ponto cruz contado · ${COLS} × ${ROWS} pontos · ${TOTAL} pontos cruz · ${NCOL} cores DMC · Aida 14 ct: ${inOf(COLS,14)} × ${inOf(ROWS,14)} pol (${cmOf(COLS,14)} × ${cmOf(ROWS,14)} cm)`;
  $("facts").innerHTML = factsHTML();
  $("legend").innerHTML = legendHTML();
  $("legendP").innerHTML = legendHTML();
  $("notes").innerHTML = notesHTML();
  $("notesP").innerHTML = notesHTML();
  $("howto").innerHTML = howtoHTML();

  $("btnPng").onclick = ()=>{
    const c = document.createElement("canvas");
    PatternCore.render(P, c.getContext("2d"),{cell:24,mode:state.mode,grid:state.grid,coord:state.coord,iso:state.iso,margin:30,dpr:1,centerMarks:state.coord});
    const a = document.createElement("a"); a.download = `${P.id}-${state.mode}.png`; a.href = c.toDataURL("image/png"); a.click();
  };

  /* ------------------------------------------------------------- impressão */
  function preparePrint(){
    const c1 = $("cvCover"), mm = Math.min(78, 150*COLS/ROWS);
    PatternCore.render(P, c1.getContext("2d"),{cell:30,mode:"preview",grid:false,coord:false,margin:0,dpr:1});
    c1.style.width = mm+"mm"; c1.style.height = (mm*ROWS/COLS)+"mm";
    const c2 = $("cvPrint"), cell2 = 48;
    PatternCore.render(P, c2.getContext("2d"),{cell:cell2,mode:"tint",grid:true,coord:true,margin:cell2,heavy:3,fs:26,dpr:1,centerMarks:true});
    // 5 mm por ponto, reduzido se o desenho não couber numa página A4
    const mmCell = Math.min(5, 188/(COLS+2), 255/(ROWS+2));
    c2.style.width = ((COLS+2)*mmCell)+"mm"; c2.style.height = ((ROWS+2)*mmCell)+"mm";
  }
  $("btnPrint").onclick = ()=>{ preparePrint(); window.print(); };
  window.addEventListener("beforeprint", preparePrint);

  window.addEventListener("load",()=>{ redraw(); preparePrint(); });
})();
