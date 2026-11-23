/* ============================================================
   MOTOR DA ÁREA DE MEMBROS
   Normalmente você NÃO precisa mexer aqui.
   Edite config.js (marca, contato, textos) — o conteúdo dos livros
   está em conteudo.js (receitas) e guia.js (guia).
   ============================================================ */
(function(){
const C = window.CONFIG, L = window.LIVRO, G = window.GUIA, X = window.EXTRAS, SINT = window.SINTOMAS || [];
const $ = id => document.getElementById(id);

const ICONS = {
  leaf:'<path d="M5 21c0-9 5-15 15-16-1 10-7 15-15 16z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 21l8-8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" fill="none" stroke="currentColor" stroke-width="1.6"/>',
  cart:'<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="10" cy="20.5" r="1.3" fill="currentColor"/><circle cx="17" cy="20.5" r="1.3" fill="currentColor"/>',
  pot:'<path d="M4 9h13v5a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 2c0 2 2 2 2 4M12 2c0 2 2 2 2 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
  clock:'<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
  head:'<path d="M3 18v-6a9 9 0 0 1 18 0v6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" fill="currentColor"/>',
  help:'<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="17" r="1" fill="currentColor"/>'
};
const ic = (n,s=18)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24">${ICONS[n]}</svg>`;
const CHECK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><polyline points="5 12 10 17 19 7"/></svg>';
const BACK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const strip = s=>String(s||'').replace(/<[^>]+>/g,'');

/* ---------- armazenamento no aparelho ---------- */
function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d; }catch(e){ return d; } }
function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
const done = new Set(load('membros-progresso-v2', []));
const checks = new Set(load('membros-checklists-v1', []));
const saveDone = ()=>save('membros-progresso-v2',[...done]);

/* ---------- índices ---------- */
const CAPS = L.capitulos, GCAPS = G.capitulos;
const RECS = CAPS.flatMap(c=>c.receitas.map((r,i)=>({c,r,i})));
const rkey = r=>'r'+r.n, gkey = g=>'g:'+g.id;
const byId = id => CAPS.find(c=>c.id===id) || GCAPS.find(c=>c.id===id) || X.find(c=>c.id===id) || SUPPORT.find(c=>c.id===id);
const capDone = c=>c.receitas.every(r=>done.has(rkey(r)));

function updateProgress(){
  const total = RECS.length + GCAPS.length;
  const n = RECS.filter(x=>done.has(rkey(x.r))).length + GCAPS.filter(g=>done.has(gkey(g))).length;
  const pc = total ? Math.round(n/total*100) : 0;
  $('pct').textContent = pc+'%'; $('barfill').style.width = pc+'%';
}

/* ---------- marca e home ---------- */
function applyConfig(){
  document.title = C.nomeApp + ' — Área de Membros';
  $('brand').innerHTML = C.logo ? `<img src="${esc(C.logo)}" alt="${esc(C.nomeApp)}">`
    : `<span class="leaf">${ic('leaf',20)}</span>${esc(C.nomeApp)}`;
  $('avatar').textContent = (C.nomeApp||'A').trim()[0].toUpperCase();
  $('welcomeTitle').textContent = C.boasVindas.titulo;
  $('welcomeText').textContent = C.boasVindas.texto;
  $('disclaimerHome').innerHTML = '<b>Importante:</b> '+esc(C.aviso);
  $('t-livro').textContent = L.titulo; $('t-guia').textContent = G.titulo;
  const slot = $('welcomeSlot');
  if(C.videoBoasVindas){
    slot.innerHTML = `<div class="welcome-video"><vturb-smartplayer id="vid-${esc(C.videoBoasVindas)}" style="display:block;margin:0 auto;width:100%"></vturb-smartplayer></div>`;
    const s=document.createElement('script');
    s.src=`https://scripts.converteai.net/${C.vturbConta}/players/${C.videoBoasVindas}/v4/player.js`; s.async=true;
    document.head.appendChild(s);
  } else {
    slot.innerHTML = `<div class="how-list">${C.boasVindas.passos.map((p,i)=>
      `<div class="how-item"><span class="n">${i+1}</span><span><b>${esc(p[0])}</b><small>${esc(p[1])}</small></span></div>`).join('')}</div>`;
  }
  const com = X[0];
  $('btnComece').innerHTML = `<img src="${com.capa}" alt=""><span><small>Leia primeiro</small><b>${esc(com.titulo)}</b></span>`;
  $('btnComece').addEventListener('click',()=>openRead(com.id));
}

/* ---------- cards ---------- */
const SUPPORT = [
  {id:'suporte', badge:'Suporte', titulo:'Precisa de ajuda?', icone:'head', cor:'blue', tipo:'suporte'},
  {id:'faq', badge:'FAQ', titulo:'Perguntas frequentes', icone:'help', cor:'blue', tipo:'faq'}
];
function card({id,badge,titulo,meta,capa,cor,isDone,icone},i){
  return `<div class="card ${cor||'green'} ${capa?'illu':''} ${isDone?'done':''}" data-open="${id}" style="animation-delay:${Math.min(i,8)*55}ms">
    ${capa?`<img class="cillu" src="${capa}" alt="" loading="lazy" draggable="false">`:`<div class="glow"></div><svg class="ic" width="56" height="56" viewBox="0 0 24 24">${ICONS[icone]||ICONS.leaf}</svg>`}
    <div class="badge">${esc(badge)}</div>
    <div class="check">${CHECK}</div>
    <div class="ctitle"><h3>${esc(titulo)}</h3>${meta?`<div class="meta">${esc(meta)}</div>`:''}</div>
  </div>`;
}
const gBadge = g => g.num===0 ? 'Início' : g.num>25 ? 'Fim' : 'Cap. '+g.num;
function renderGrids(){
  $('grid-livro').innerHTML = CAPS.map((c,i)=>card({id:c.id,badge:'Cap. '+c.num,titulo:c.titulo,meta:c.receitas.length+(c.receitas.length===1?' receita':' receitas'),capa:c.capa,isDone:capDone(c)},i)).join('');
  $('grid-guia').innerHTML = GCAPS.map((g,i)=>card({id:g.id,badge:gBadge(g),titulo:g.titulo,meta:'Leitura',capa:g.capa,cor:'gold',isDone:done.has(gkey(g))},i)).join('');
  $('grid-extras').innerHTML = X.map((x,i)=>card({id:x.id,badge:'Consulta',titulo:x.titulo,meta:x.sub,capa:x.capa},i)).join('');
  $('grid-support').innerHTML = SUPPORT.map((m,i)=>card({id:m.id,badge:m.badge,titulo:m.titulo,icone:m.icone,cor:m.cor},i)).join('');
}

/* ---------- telas ---------- */
function openView(id){ const v=$(id); v.classList.add('open'); v.scrollTop=0; document.body.style.overflow='hidden'; }
function closeView(id){
  $(id).classList.remove('open');
  if(!document.querySelector('.view.open')) document.body.style.overflow='';
  if(current.modId && $('moduleView').classList.contains('open')) renderModule(current.modId);
  renderGrids(); updateProgress();
  if(searchInput.value.trim()) runSearch(searchInput.value);
}
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeView(b.dataset.close)));
let current = { modId:null };

function recipeRow(c,r,showCap){
  return `<button class="recipe-row ${done.has(rkey(r))?'done':''}" data-rec="${r.n}">
    <span class="rthumb"><img src="img/rc/r${String(r.n).padStart(3,'0')}.webp" alt="" loading="lazy"></span>
    <span class="rtxt"><h4><span class="rnum">${r.n}</span>${esc(r.titulo)}</h4><p>${showCap?`<span class="tag">${esc(c.titulo)}</span> · `:''}${esc(r.serve||(r.ing||[]).join(', '))}</p></span>
    <span class="rstate">${CHECK}</span>
  </button>`;
}
function readRow(x,kicker){
  const isG = !!GCAPS.find(g=>g.id===x.id);
  return `<button class="recipe-row ${isG&&done.has(gkey(x))?'done':''}" data-read="${x.id}">
    <span class="rthumb"><img src="${x.capa}" alt="" loading="lazy"></span>
    <span class="rtxt"><h4>${esc(x.titulo)}</h4><p><span class="tag">${esc(kicker)}</span></p></span>
    <span class="rstate">${CHECK}</span>
  </button>`;
}
function bindRows(root){
  root.querySelectorAll('[data-rec]').forEach(el=>el.addEventListener('click',()=>openRecipe(+el.dataset.rec)));
  root.querySelectorAll('[data-read]').forEach(el=>el.addEventListener('click',()=>openRead(el.dataset.read)));
}

/* ---------- capítulo do livro de receitas / suporte / FAQ ---------- */
function renderModule(id){
  const m = byId(id); const body = $('mv-body');
  if(m.receitas){
    $('mv-badge').textContent = 'Capítulo '+m.num; $('mv-title').textContent = m.titulo;
    const n = m.receitas.filter(r=>done.has(rkey(r))).length;
    body.innerHTML = `<div class="mod-hero"><h2>${esc(m.titulo)}</h2><p>${esc(m.intro)}</p><span class="count">${n} de ${m.receitas.length} receitas lidas</span></div>
      ${m.info?`<div class="ch-info"><img src="${m.info}" alt="" loading="lazy"></div>`:''}
      <div class="list-label">Receitas deste capítulo</div>${m.receitas.map(r=>recipeRow(m,r,false)).join('')}`;
  } else if(m.tipo==='suporte'){
    $('mv-badge').textContent = m.badge; $('mv-title').textContent = m.titulo;
    body.innerHTML = `<div class="mod-hero blue"><h2>${esc(m.titulo)}</h2><p>${esc(C.suporte.texto)}</p></div><div class="contact-list">
      ${C.suporte.email?`<a class="contact-card" href="mailto:${esc(C.suporte.email)}"><span class="contact-ic"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg></span><span class="contact-txt"><b>E-mail</b><small>${esc(C.suporte.email)}</small></span></a>`:''}
      ${C.suporte.whatsapp?`<a class="contact-card" href="https://wa.me/${esc(C.suporte.whatsapp)}" target="_blank" rel="noopener"><span class="contact-ic wa"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/></svg></span><span class="contact-txt"><b>WhatsApp</b><small>Fale com a equipe</small></span></a>`:''}
    </div>`;
  } else if(m.tipo==='faq'){
    $('mv-badge').textContent = m.badge; $('mv-title').textContent = m.titulo;
    body.innerHTML = `<div class="mod-hero blue"><h2>${esc(m.titulo)}</h2></div><div class="faq-list">${(C.faq||[]).map((f,i)=>`<div class="faq-item"><button class="faq-q"><span>${i+1}. ${esc(f.p)}</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></button><div class="faq-a">${esc(f.r)}</div></div>`).join('')}</div>`;
    body.querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>{
      const it=b.closest('.faq-item'), open=it.classList.contains('open');
      body.querySelectorAll('.faq-item').forEach(x=>x.classList.remove('open'));
      if(!open) it.classList.add('open');
    }));
  }
  body.insertAdjacentHTML('beforeend',`<button class="back-home" data-close-mod>${BACK} Voltar</button>`);
  bindRows(body);
  body.querySelector('[data-close-mod]').addEventListener('click',()=>closeView('moduleView'));
}
function openModule(id){ current.modId=id; renderModule(id); openView('moduleView'); }

/* ---------- receita ---------- */
function block(title,icon,inner,cls=''){ return `<div class="r-block ${cls}"><h3>${ic(icon)} ${title}</h3>${inner}</div>`; }
const para = t => `<p class="txt">${esc(t)}</p>`;
const steps = v => Array.isArray(v) ? `<ol class="steps">${v.map(x=>`<li><span>${esc(x)}</span></li>`).join('')}</ol>` : para(v);
function openRecipe(n){
  const pos = RECS.findIndex(x=>x.r.n===n); const {c,r} = RECS[pos];
  $('rv-badge').textContent = 'Receita '+r.n+' · '+c.titulo; $('rv-title').textContent = r.titulo;
  const isDone = done.has(rkey(r));
  const warn = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01" stroke-linecap="round"/></svg>';
  $('rv-body').innerHTML = `
    <div class="r-cover pic"><img src="img/r/r${String(r.n).padStart(3,'0')}.webp" alt=""></div>
    <div class="r-head">
      <div class="for">${esc(c.titulo)}</div>
      <h1>${esc(r.titulo)}</h1>
      ${r.serve?`<p>${esc(r.serve)}</p>`:''}
      ${r.tags?`<div class="r-meta">${r.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:''}
    </div>
    ${r.ing?block('Ingredientes','cart',`<ul class="ing">${r.ing.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`):''}
    ${r.preparo?block('Preparo','pot',steps(r.preparo)):''}
    ${r.fazer?block('Como fazer','pot',steps(r.fazer)):''}
    ${r.uso?block('Como usar','clock',para(r.uso)):''}
    ${r.duracao?block('Duração','clock',para(r.duracao)):''}
    ${r.usepara?block('Use para','leaf',para(r.usepara)):''}
    ${r.regra?block('Regra de ouro','leaf',para(r.regra),'tip'):''}
    ${r.dica?block('Dica do preparo','leaf',para(r.dica),'tip'):''}
    ${r.importante?block('Importante','leaf',para(r.importante),'care'):''}
    <div class="r-block care"><h3>${warn} Cautela</h3>${r.cautela?para(r.cautela):''}<p class="r-small">${esc(C.aviso)}</p></div>
    <button class="done-btn ${isDone?'is-done':''}" id="doneBtn">${isDone?'✓ Receita lida':'Marcar como lida'}</button>
    <div class="r-nav">
      <button id="prevR" ${pos===0?'disabled':''}>← Anterior</button>
      <button id="nextR" ${pos===RECS.length-1?'disabled':''}>Próxima →</button>
    </div>`;
  $('doneBtn').addEventListener('click',()=>{ const k=rkey(r); done.has(k)?done.delete(k):done.add(k); saveDone(); updateProgress(); openRecipe(n); });
  $('prevR').addEventListener('click',()=>{ if(pos>0) openRecipe(RECS[pos-1].r.n); });
  $('nextR').addEventListener('click',()=>{ if(pos<RECS.length-1) openRecipe(RECS[pos+1].r.n); });
  openView('recipeView'); $('recipeView').scrollTop=0;
}

/* ---------- leitura (guia e consulta rápida) ---------- */
const BOXICON = {conselho:'✚', curiosidade:'?', aprofundamento:'↓', checklist:'✓', nota:'!'};
const BOXLBL = {conselho:'Conselho do médico', curiosidade:'Curiosidade', aprofundamento:'Aprofundamento', checklist:'Checklist', nota:'Atenção'};
function renderItems(items, ctx){
  let h=''; let ul=null, chk=null;
  const close = ()=>{ if(ul){ h+=`<ul>${ul}</ul>`; ul=null; } if(chk){ h+=`<div class="chklist">${chk}</div>`; chk=null; } };
  items.forEach((it,k)=>{
    if(it.t!=='li' && ul!==null){ h+=`<ul>${ul}</ul>`; ul=null; }
    if(it.t!=='check' && chk!==null){ h+=`<div class="chklist">${chk}</div>`; chk=null; }
    const key = ctx+'.'+k;
    switch(it.t){
      case 'h': h+=`<h3>${it.x}</h3>`; break;
      case 'p': h+=`<p>${it.x}</p>`; break;
      case 'quote': h+=`<blockquote>${it.x}</blockquote>`; break;
      case 'li': ul=(ul||'')+`<li><span>${it.x}</span></li>`; break;
      case 'check': chk=(chk||'')+`<button class="chk ${checks.has(key)?'on':''}" data-chk="${key}"><span class="bx">${CHECK}</span><span>${it.x}</span></button>`; break;
      case 'img': h+=`<figure><img src="${it.src}" alt="" loading="lazy"></figure>`; break;
      case 'table': h+=`<figure class="tab"><img src="${it.src}" alt="Tabela" loading="lazy"></figure>`; break;
      case 'box': {
        const tp = it.tipo||'nota';
        const sub = (it.titulo && !['conselho','curiosidade'].includes(tp)) ? `<div class="pb-sub">${esc(it.titulo)}</div>` : '';
        h+=`<div class="pbox ${tp}"><div class="pb-t"><i>${BOXICON[tp]}</i>${BOXLBL[tp]}</div>${sub}${renderItems(it.itens||[], key)}</div>`;
      }
    }
  });
  close();
  return h;
}
function openRead(id){
  const gi = GCAPS.findIndex(g=>g.id===id);
  const x = gi>=0 ? GCAPS[gi] : X.find(e=>e.id===id);
  const isG = gi>=0;
  $('gv-badge').textContent = isG ? (G.titulo + ' · ' + gBadge(x)) : 'Consulta rápida';
  $('gv-title').textContent = x.titulo;
  const rel = isG && x.rel ? CAPS.find(c=>c.id===x.rel) : null;
  const isDone = isG && done.has(gkey(x));
  $('gv-body').innerHTML = `
    <div class="read-banner"><img src="${x.banner}" alt=""></div>
    <div class="r-head"><div class="for">${isG?esc(gBadge(x)==='Início'||gBadge(x)==='Fim'?gBadge(x):'Capítulo '+x.num):esc(x.sub||'')}</div><h1>${esc(x.titulo)}</h1></div>
    <div class="read">${renderItems(x.itens, x.id)}</div>
    ${x.id==='x-cautelas'||x.id==='x-glossario'?'':''}
    ${rel?`<button class="related-btn" id="relBtn"><img src="${rel.capa}" alt=""><span><small>Receitas relacionadas</small><b>${esc(rel.titulo)}</b></span></button>`:''}
    ${isG?`<button class="done-btn ${isDone?'is-done':''}" id="gDone">${isDone?'✓ Capítulo lido':'Marcar capítulo como lido'}</button>
    <div class="r-nav"><button id="gPrev" ${gi===0?'disabled':''}>← Anterior</button><button id="gNext" ${gi===GCAPS.length-1?'disabled':''}>Próximo →</button></div>`
    :`<button class="back-home" id="gBack">${BACK} Voltar</button>`}`;
  const body=$('gv-body');
  body.querySelectorAll('[data-chk]').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.chk; checks.has(k)?checks.delete(k):checks.add(k); b.classList.toggle('on'); save('membros-checklists-v1',[...checks]);
  }));
  if(rel) $('relBtn').addEventListener('click',()=>openModule(rel.id));
  if(isG){
    $('gDone').addEventListener('click',()=>{ const k=gkey(x); done.has(k)?done.delete(k):done.add(k); saveDone(); updateProgress(); openRead(id); });
    $('gPrev').addEventListener('click',()=>{ if(gi>0) openRead(GCAPS[gi-1].id); });
    $('gNext').addEventListener('click',()=>{ if(gi<GCAPS.length-1) openRead(GCAPS[gi+1].id); });
  } else $('gBack').addEventListener('click',()=>closeView('readView'));
  openView('readView'); $('readView').scrollTop=0;
}

/* ---------- busca ---------- */
const searchInput = $('searchInput');
const RIDX = RECS.map(x=>({x, hay:norm([x.r.titulo,x.r.serve,(x.r.tags||[]).join(' '),(x.r.ing||[]).join(' '),x.r.usepara,x.c.titulo].join(' '))}));
const GIDX = GCAPS.concat(X).map(g=>({g, hay:norm(g.titulo+' '+g.itens.filter(i=>i.t==='h').map(i=>i.x).join(' '))}));
function runSearch(q){
  const box=$('results'), secs=$('sections');
  $('searchClear').hidden = !q;
  if(!q.trim()){ box.hidden=true; secs.hidden=false; return; }
  const terms = norm(q).split(/[\s/]+/).filter(t=>t.length>1);
  const hitsR = RIDX.filter(o=>terms.every(t=>o.hay.includes(t))).map(o=>o.x);
  const hitsG = GIDX.filter(o=>terms.every(t=>o.hay.includes(t))).map(o=>o.g);
  box.hidden=false; secs.hidden=true;
  let h = `<div class="results-label">${hitsR.length} receita${hitsR.length===1?'':'s'}</div>`;
  h += hitsR.length ? hitsR.map(({c,r})=>recipeRow(c,r,true)).join('') : `<div class="empty">Nenhuma receita para "${esc(q)}". Tente outra palavra, como "sono", "gengibre" ou "pressão".</div>`;
  if(hitsG.length) h += `<div class="results-label" style="margin-top:20px">${hitsG.length} capítulo${hitsG.length===1?'':'s'} para ler</div>` +
    hitsG.map(g=>readRow(g, GCAPS.includes(g)? G.titulo : 'Consulta rápida')).join('');
  box.innerHTML = h; bindRows(box);
}
searchInput.addEventListener('input',()=>runSearch(searchInput.value));
$('searchClear').addEventListener('click',()=>{ searchInput.value=''; runSearch(''); searchInput.focus(); });
const chipsList = (C.atalhosBusca && C.atalhosBusca.length) ? C.atalhosBusca : SINT;
$('chips').innerHTML = chipsList.map(t=>`<button class="chip">${esc(t)}</button>`).join('');
document.querySelectorAll('#chips .chip').forEach(c=>c.addEventListener('click',()=>{ searchInput.value=c.textContent; runSearch(c.textContent); }));

/* ---------- cliques nos cards + arrastar no PC ---------- */
document.addEventListener('click',e=>{
  const c = e.target.closest('.card[data-open]'); if(!c) return;
  const id = c.dataset.open;
  if(GCAPS.find(g=>g.id===id) || X.find(x=>x.id===id)) openRead(id); else openModule(id);
});
function enableDrag(el){
  let down=false,startX=0,startScroll=0,moved=0;
  el.addEventListener('mousedown',e=>{down=true;moved=0;startX=e.pageX;startScroll=el.scrollLeft;});
  window.addEventListener('mousemove',e=>{ if(!down)return; const dx=e.pageX-startX; if(Math.abs(dx)>4){el.classList.add('dragging');moved=Math.abs(dx);} el.scrollLeft=startScroll-dx; });
  window.addEventListener('mouseup',()=>{down=false;setTimeout(()=>el.classList.remove('dragging'),0);});
  el.addEventListener('click',e=>{ if(moved>4){e.stopPropagation();e.preventDefault();moved=0;} },true);
}
['grid-livro','grid-guia','grid-extras','grid-support'].forEach(id=>enableDrag($(id)));

/* ---------- navegação ---------- */
const PAGES = {inicio:'page-inicio', receitas:'page-receitas', install:'page-install'};
function showPage(name){
  Object.entries(PAGES).forEach(([k,id])=>$(id).hidden = k!==name);
  document.querySelectorAll('.bottomnav button').forEach(b=>b.classList.toggle('active',b.dataset.page===name));
  window.scrollTo(0,0);
}
document.querySelectorAll('.bottomnav button').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(b=>b.addEventListener('click',()=>showPage(b.dataset.goto)));
document.querySelectorAll('.device-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.device-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  const ios=b.dataset.device==='ios';
  $('steps-ios').hidden=!ios; $('steps-android').hidden=ios;
}));

applyConfig(); renderGrids(); updateProgress();
})();
