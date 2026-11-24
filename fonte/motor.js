/* ============================================================
   MOTOR DA ÁREA DE MEMBROS
   Normalmente você NÃO precisa mexer aqui.
   Edite config.js (marca, contato, textos). O conteúdo dos livros
   está em conteudo.js (receitas), guia.js (guia) e atalhos.js (índices).
   ============================================================ */
(function(){
const C = window.CONFIG;
/* ---------- trava de endereço ---------- */
(function(){
  const h = location.hostname, ok = !h || h==='localhost' || h==='127.0.0.1' ||
    (C.dominios||[]).some(d=>h===d || h.endsWith('.'+d)) || (/^appreceitas2027(-[a-z0-9-]+)?\.vercel\.app$/).test(h);
  if(!ok){
    document.body.innerHTML = '<div style="font-family:Arial,sans-serif;max-width:480px;margin:60px auto;padding:24px;text-align:center;line-height:1.6">'+
      '<div style="font-size:48px">🔒</div><h1 style="font-size:24px;margin:10px 0">Cópia não autorizada</h1>'+
      '<p>Este aplicativo pertence a <b>'+C.especialista.nome+'</b> e só funciona no endereço oficial.</p>'+
      '<p><a style="display:inline-block;margin-top:14px;padding:14px 22px;background:#2e7d46;color:#fff;border-radius:12px;text-decoration:none;font-weight:bold" href="'+C.siteOficial+'">Ir para o aplicativo oficial</a></p></div>';
    throw new Error('dominio');
  }
})();
document.addEventListener('contextmenu', e=>{ if(!e.target.closest('input')) e.preventDefault(); });
document.addEventListener('dragstart', e=>{ if(e.target.tagName==='IMG') e.preventDefault(); });
document.addEventListener('copy', e=>{ const s=String(document.getSelection()); if(s.length>200){ e.preventDefault(); } });
const L = window.LIVRO, G = window.GUIA, X = window.EXTRAS, A = window.ATALHOS;
const $ = id => document.getElementById(id);
const esc = s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const pad = n => String(n).padStart(3,'0');
const CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><polyline points="5 12 10 17 19 7"/></svg>';
const GO = '<svg class="go" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';

/* ---------- dados salvos no aparelho ---------- */
function load(k,d){ try{ const v=JSON.parse(localStorage.getItem(k)); return v ?? d; }catch(e){ return d; } }
function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
const done = new Set(load('membros-progresso-v2', []));
const checks = new Set(load('membros-checklists-v1', []));
const saveDone = ()=>save('membros-progresso-v2',[...done]);

/* ---------- índices ---------- */
const CAPS = L.capitulos, GCAPS = G.capitulos;
const RECS = CAPS.flatMap(c=>c.receitas.map(r=>({c,r})));
const REC = {}; RECS.forEach(x=>REC[x.r.n]=x);
const rkey = n=>'r'+n, gkey = id=>'g:'+id;
const capDoneCount = c=>c.receitas.filter(r=>done.has(rkey(r.n))).length;
const CAP_EMOJI = {1:'🛡️',2:'⚖️',3:'🩸',4:'❤️',5:'🍽️',6:'🥬',7:'🌙',8:'🔋',9:'🦴',10:'😷',11:'✨',12:'💧',13:'🌸',14:'🧠',15:'🫖',
  16:'🤕',17:'🦵',18:'🤧',19:'🦷',20:'👨',21:'🧒',22:'🩹',23:'🍷',24:'🥤',25:'🧂'};
const X_EMOJI = {'x-comece':'🌱','x-cautelas':'⚠️','x-glossario':'🌿','x-conclusao':'📜'};
const gLabel = g => g.num===0 ? 'Começo do livro' : g.num>25 ? 'Fim do livro' : 'Capítulo '+g.num;

function updateProgress(){
  const total = RECS.length + GCAPS.length;
  const n = RECS.filter(x=>done.has(rkey(x.r.n))).length + GCAPS.filter(g=>done.has(gkey(g.id))).length;
  const pc = total ? Math.round(n/total*100) : 0;
  $('pct').textContent = pc+'%'; $('barfill').style.width = pc+'%';
}

/* ---------- tamanho da letra ---------- */
function setZoom(z){ document.documentElement.style.setProperty('--z', z); save('membros-letra', z);
  document.querySelectorAll('#szBtns button').forEach(b=>b.classList.toggle('on', +b.dataset.z===+z)); }
setZoom(load('membros-letra', 1));
document.querySelectorAll('[data-font]').forEach(b=>b.addEventListener('click',()=>$('sizeSheet').hidden=false));
document.querySelectorAll('[data-closesheet]').forEach(b=>b.addEventListener('click',()=>$('sizeSheet').hidden=true));
document.querySelectorAll('#szBtns button').forEach(b=>b.addEventListener('click',()=>setZoom(b.dataset.z)));

/* ---------- histórico: o botão "voltar" do celular também funciona ---------- */
const stack = [];   // telas abertas, na ordem
let currentPage = 'inicio';
function pushState(){ try{ history.pushState({d:stack.length, p:currentPage}, ''); }catch(e){} }
let ignorePop = 0;
window.addEventListener('popstate', e=>{
  if(ignorePop>0){ ignorePop--; return; }
  if(stack.length){ closeTop(); return; }
  const p = (e.state && e.state.p) || 'inicio';
  showPage(p, false);
});
function openView(id, push=true){
  const v=$(id);
  if(!stack.includes(id)){ stack.push(id); if(push) pushState(); }
  v.classList.add('open'); v.scrollTop=0; document.body.style.overflow='hidden';
}
function closeTop(){
  const id = stack.pop(); if(!id) return;
  $(id).classList.remove('open');
  if(!stack.length) document.body.style.overflow='';
  if(stack.includes('listView')) renderList();
  refresh();
}
function goBack(){ if(stack.length) history.back(); }
function goHome(){
  const n = stack.length;
  stack.splice(0).forEach(id=>$(id).classList.remove('open'));
  document.body.style.overflow='';
  if(n) { ignorePop = 1; try{ history.go(-n); }catch(e){ ignorePop = 0; } }
  showPage('inicio', false);
}
document.querySelectorAll('[data-back]').forEach(b=>b.addEventListener('click',goBack));

/* ---------- páginas ---------- */
const PAGES = ['inicio','sintomas','receitas','guia','ingredientes','ajuda','install'];
function showPage(name, push=true){
  currentPage = name;
  PAGES.forEach(p=>$('page-'+p).hidden = p!==name);
  document.querySelectorAll('.bottomnav button').forEach(b=>b.classList.toggle('active', b.dataset.page===name));
  render(name);
  window.scrollTo(0,0);
  if(push) pushState();
}
document.querySelectorAll('.bottomnav button').forEach(b=>b.addEventListener('click',()=>{
  if(stack.length){ stack.splice(0).forEach(id=>$(id).classList.remove('open')); document.body.style.overflow=''; }
  showPage(b.dataset.page);
}));
document.addEventListener('click',e=>{
  const g = e.target.closest('[data-goto]'); if(g){ showPage(g.dataset.goto); return; }
  const r = e.target.closest('[data-rec]'); if(r){ openRecipe(+r.dataset.rec, r.dataset.ctx ? JSON.parse(r.dataset.ctx) : null); return; }
  const rd = e.target.closest('[data-read]'); if(rd){ openRead(rd.dataset.read); return; }
  const cp = e.target.closest('[data-cap]'); if(cp){ openList({tipo:'cap', id:cp.dataset.cap}); return; }
  const sn = e.target.closest('[data-sint]'); if(sn){ openList({tipo:'sint', nome:sn.dataset.sint}); return; }
  const ig = e.target.closest('[data-ing]'); if(ig){ openList({tipo:'ing', nome:ig.dataset.ing}); return; }
  const h = e.target.closest('[data-home]'); if(h){ goHome(); return; }
});
function refresh(){ render(currentPage); updateProgress(); }

/* ---------- peças de interface ---------- */
const big = (em, title, sub, attrs, cls='') =>
  `<button class="big ${cls}" ${attrs}>${em.startsWith('img/')?`<img class="th" src="${em}" alt="">`:`<span class="em">${em}</span>`}<span class="tx"><b>${title}</b>${sub?`<small>${sub}</small>`:''}</span>${GO}<span class="ok">${CHECK}</span></button>`;
function recRow(n, ctx){
  const {r} = REC[n];
  return `<button class="row ${done.has(rkey(n))?'done':''}" data-rec="${n}" ${ctx?`data-ctx='${JSON.stringify(ctx)}'`:''}>
    <span class="th"><img src="img/rc/r${pad(n)}.webp" alt="" loading="lazy"></span>
    <span class="tx"><b><span class="num">${n}.</span> ${esc(r.titulo)}</b><small>${esc(r.serve || (r.ing||[]).join(', '))}</small></span>
    <span class="st">${CHECK}</span></button>`;
}
function capRow(c){
  const d = capDoneCount(c), t = c.receitas.length;
  return `<button class="row ${d===t?'done':''}" data-cap="${c.id}">
    <span class="th"><img src="${c.capa}" alt="" loading="lazy"></span>
    <span class="tx"><b>${esc(c.titulo)}</b><small>Capítulo ${c.num} · ${t} receita${t>1?'s':''}${d?` · ${d} lida${d>1?'s':''}`:''}</small></span>
    <span class="st">${CHECK}</span></button>`;
}
function capTile(c){
  const d = capDoneCount(c), t = c.receitas.length;
  return `<button class="tile ${d===t?'done':''}" data-cap="${c.id}"><span class="ck">${CHECK}</span><span class="em">${CAP_EMOJI[c.num]||'🍵'}</span>${esc(c.titulo)}
    <small>Capítulo ${c.num} · ${t} receita${t>1?'s':''}</small>${d&&d<t?`<small class="lidas">✓ ${d} lida${d>1?'s':''}</small>`:''}</button>`;
}
function readRow(x, sub){
  const isG = GCAPS.includes(x);
  return `<button class="row ${isG&&done.has(gkey(x.id))?'done':''}" data-read="${x.id}">
    <span class="th"><img src="${x.capa}" alt="" loading="lazy"></span>
    <span class="tx"><b>${esc(x.titulo)}</b><small>${esc(sub)}</small></span>
    <span class="st">${CHECK}</span></button>`;
}
const homeBtn = `<button class="home-btn" data-home>🏠 Ir para o início</button>`;
const ANO = new Date().getFullYear();
const sign = (txt) => `<div class="sign"><img src="${C.especialista.foto}" alt=""><span><b>${esc(C.especialista.nome)}</b><small>${txt}</small></span></div>`;
const copy = () => `<p class="copy">© ${ANO} ${esc(C.especialista.nome)} · ${esc(C.nomeApp)}. Todos os direitos reservados. Proibida a cópia, reprodução ou revenda deste conteúdo.</p>`;

/* ---------- INÍCIO ---------- */
function lastItem(){
  const l = load('membros-ultimo', null); if(!l) return '';
  if(l.t==='r' && REC[l.n]) return `<div class="sec-title"><span class="em">⏯️</span> Continuar de onde parei</div>` + big('img/rc/r'+pad(l.n)+'.webp', esc(REC[l.n].r.titulo), 'Receita '+l.n+' · '+esc(REC[l.n].c.titulo), `data-rec="${l.n}"`);
  const g = GCAPS.find(x=>x.id===l.id) || X.find(x=>x.id===l.id);
  if(l.t==='g' && g) return `<div class="sec-title"><span class="em">⏯️</span> Continuar de onde parei</div>` + big(g.capa, esc(g.titulo), GCAPS.includes(g)?'Guia da Saúde · '+gLabel(g):'Consulta rápida', `data-read="${g.id}"`);
  return '';
}
function renderInicio(){
  const p = $('page-inicio');
  const video = C.videoBoasVindas ? `<div class="welcome-video"><vturb-smartplayer id="vid-${esc(C.videoBoasVindas)}" style="display:block;margin:0 auto;width:100%"></vturb-smartplayer></div>` : '';
  p.innerHTML = `
    <div class="welcome"><div class="w-top"><img class="w-foto" src="${C.especialista.fotoGrande}" alt="${esc(C.especialista.nome)}"><h1>${esc(C.boasVindas.titulo)}</h1></div><p>${esc(C.boasVindas.texto)}</p>${video}</div>
    ${lastItem()}
    <div class="sec-title"><span class="em">👇</span> O que você quer fazer?</div>
    <div class="big-list">
      ${big('🩺','O que você está sentindo?','Toque no sintoma e veja as receitas','data-goto="sintomas"','primary')}
      ${big('🧺','Tenho um ingrediente em casa','Veja o que dá para fazer com ele','data-goto="ingredientes"')}
      ${big('🍵','Livro de Receitas',`${RECS.length} receitas em ${CAPS.length} capítulos`,'data-goto="receitas"')}
      ${big('📖','Guia da Saúde Natural','Leitura com conselhos de um médico','data-goto="guia"')}
      ${big('⚠️','Cautelas importantes','Quem deve ter cuidado com o quê',`data-read="x-cautelas"`)}
      ${big('🌱','Comece por aqui','Como usar o livro e a despensa da natureza',`data-read="x-comece"`)}
    </div>
    <button class="install-banner" data-goto="install"><span class="em">📲</span><span><b>Instalar o app no celular</b><small>Toque aqui para ver como</small></span></button>
    <div class="note"><b>Importante:</b> ${esc(C.aviso)}</div>
    ${copy()}
    <div class="spacer-bottom"></div>`;
  if(C.videoBoasVindas && !window._vt){ window._vt=1; const s=document.createElement('script');
    s.src=`https://scripts.converteai.net/${C.vturbConta}/players/${C.videoBoasVindas}/v4/player.js`; s.async=true; document.head.appendChild(s); }
}

/* ---------- SINTOMAS ---------- */
function renderSintomas(){
  $('page-sintomas').innerHTML = `<div class="page-head"><h1>O que você está sentindo?</h1><p>Toque no que você sente para ver as receitas indicadas no livro.</p></div>` +
    A.grupos.map(g=>`<div class="sec-title"><span class="em">${g.emoji}</span> ${esc(g.titulo)}</div><div class="tiles">${
      g.itens.map(s=>`<button class="tile" data-sint="${esc(s.nome)}"><span class="em">${s.emoji}</span>${esc(s.nome)}<small>${s.receitas.length} receita${s.receitas.length>1?'s':''}</small></button>`).join('')}</div>`).join('') +
    `<div class="spacer-bottom"></div>`;
}
/* ---------- INGREDIENTES ---------- */
function renderIngredientes(){
  $('page-ingredientes').innerHTML = `<div class="page-head"><h1>Tenho em casa…</h1><p>Toque no ingrediente que você tem e veja as receitas que usam ele.</p></div>
    <div class="tiles">${A.ingredientes.map(i=>`<button class="tile" data-ing="${esc(i.nome)}"><span class="em">${i.emoji}</span>${esc(i.nome)}<small>${i.receitas.length} receita${i.receitas.length>1?'s':''}</small></button>`).join('')}</div>
    ${homeBtn}<div class="spacer-bottom"></div>`;
}
/* ---------- RECEITAS ---------- */
let searchOpen = false, searchQ = '';
function renderReceitas(){
  const p = $('page-receitas');
  p.innerHTML = `<div class="page-head"><h1>📗 ${esc(L.titulo)}</h1><p>Toque em um capítulo para ver as receitas.</p></div>
    <div class="big-list">
      ${big('🩺','Procurar pelo sintoma','Toque no que você sente','data-goto="sintomas"','primary')}
      ${big('🧺','Procurar pelo ingrediente','Veja o que fazer com o que tem em casa','data-goto="ingredientes"')}
    </div>
    ${searchOpen ? `<div class="search"><input id="q" type="search" placeholder="Digite uma palavra" value="${esc(searchQ)}" autocomplete="off"><button id="qClose">Fechar</button></div><div id="qRes"></div>`
                 : `<button class="search-toggle" id="qOpen">🔍 Prefere digitar? Buscar por palavra</button>`}
    <div class="sec-title"><span class="em">📚</span> ${CAPS.length} capítulos · ${RECS.length} receitas</div>
    <div class="tiles">${CAPS.map(capTile).join('')}</div>
    <div class="sec-title"><span class="em">🔎</span> Consulta rápida</div>
    <div class="tiles">${X.map(x=>`<button class="tile" data-read="${x.id}"><span class="em">${X_EMOJI[x.id]||'📄'}</span>${esc(x.titulo)}<small>Para consultar</small></button>`).join('')}</div>
    <div class="spacer-bottom"></div>`;
  if(searchOpen){
    const q=$('q'); q.addEventListener('input',()=>{ searchQ=q.value; runSearch(); }); runSearch();
    $('qClose').addEventListener('click',()=>{ searchOpen=false; searchQ=''; renderReceitas(); });
    if(!searchQ) q.focus();
  } else $('qOpen').addEventListener('click',()=>{ searchOpen=true; renderReceitas(); });
}
const RIDX = RECS.map(x=>({n:x.r.n, hay:norm([x.r.titulo,x.r.serve,(x.r.tags||[]).join(' '),(x.r.ing||[]).join(' '),x.r.usepara,x.c.titulo].join(' '))}));
function runSearch(){
  const terms = norm(searchQ).split(/[\s/]+/).filter(t=>t.length>1);
  const box=$('qRes'); if(!terms.length){ box.innerHTML=''; return; }
  const hits = RIDX.filter(o=>terms.every(t=>o.hay.includes(t))).map(o=>o.n);
  box.innerHTML = `<div class="count-label">${hits.length} receita${hits.length===1?'':'s'} encontrada${hits.length===1?'':'s'}</div>` +
    (hits.length ? hits.map(n=>recRow(n,hits)).join('') : `<div class="empty">Nada encontrado. Tente outra palavra ou procure pelo sintoma.</div>`);
}
/* ---------- GUIA ---------- */
function renderGuia(){
  $('page-guia').innerHTML = `<div class="page-head"><h1>📖 ${esc(G.titulo)}</h1><p>Um médico explica, com calma, como cuidar da saúde no dia a dia. Toque em um capítulo para ler.</p></div>
    ${GCAPS.map(g=>readRow(g, gLabel(g))).join('')}<div class="spacer-bottom"></div>`;
}
/* ---------- AJUDA ---------- */
function renderAjuda(){
  $('page-ajuda').innerHTML = `<div class="page-head"><h1>💬 Precisa de ajuda?</h1><p>${esc(C.suporte.texto)}</p></div>
    ${C.suporte.whatsapp?`<a class="contact" href="https://wa.me/${esc(C.suporte.whatsapp)}" target="_blank" rel="noopener"><span class="em">🟢</span><span><b>Falar pelo WhatsApp</b><small>Toque para abrir a conversa</small></span></a>`:''}
    ${C.suporte.email?`<a class="contact" href="mailto:${esc(C.suporte.email)}"><span class="em">✉️</span><span><b>Mandar um e-mail</b><small>${esc(C.suporte.email)}</small></span></a>`:''}
    <div class="sec-title"><span class="em">🛠️</span> Ajustes</div>
    <div class="big-list">
      ${big('🔠','Aumentar o tamanho da letra','Deixe o texto mais fácil de ler','id="ajLetra"')}
      ${big('📲','Instalar o app no celular','Passo a passo','data-goto="install"')}
    </div>
    <div class="sec-title"><span class="em">❓</span> Perguntas frequentes</div>
    ${(C.faq||[]).map(f=>`<div class="faq-item"><button class="faq-q"><span>${esc(f.p)}</span><span class="pm">+</span></button><div class="faq-a">${esc(f.r)}</div></div>`).join('')}
    ${copy()}
    <div class="spacer-bottom"></div>`;
  $('ajLetra').addEventListener('click',()=>$('sizeSheet').hidden=false);
  $('page-ajuda').querySelectorAll('.faq-q').forEach(b=>b.addEventListener('click',()=>{
    const it=b.closest('.faq-item'); it.classList.toggle('open'); b.querySelector('.pm').textContent = it.classList.contains('open')?'−':'+';
  }));
}
function render(name){
  const f = {inicio:renderInicio, sintomas:renderSintomas, receitas:renderReceitas, guia:renderGuia, ingredientes:renderIngredientes, ajuda:renderAjuda}[name];
  if(f) f();
}

/* ---------- LISTA (capítulo, sintoma ou ingrediente) ---------- */
let listCtx = null;
function openList(ctx, push=true){ listCtx = ctx; renderList(); openView('listView', push); }
function renderList(){
  const ctx = listCtx; if(!ctx) return; const body = $('lv-body'); let nums, head;
  if(ctx.tipo==='cap'){
    const c = CAPS.find(x=>x.id===ctx.id); nums = c.receitas.map(r=>r.n);
    $('lv-top').textContent = 'Capítulo '+c.num;
    head = `<div class="kicker">Capítulo ${c.num}</div><h1 class="title"><span style="font-size:34px">${CAP_EMOJI[c.num]||''}</span> ${esc(c.titulo)}</h1><p class="lead">${esc(c.intro)}</p>
      ${c.info?`<div class="hero-img"><img src="${c.info}" alt=""></div>`:''}`;
  } else {
    const src = ctx.tipo==='sint' ? A.grupos.flatMap(g=>g.itens) : A.ingredientes;
    const it = src.find(x=>x.nome===ctx.nome); nums = it.receitas.filter(n=>REC[n]);
    $('lv-top').textContent = ctx.tipo==='sint' ? 'Sintoma' : 'Ingrediente';
    head = `<div class="kicker">${ctx.tipo==='sint'?'Receitas para':'Receitas com'}</div><h1 class="title"><span style="font-size:34px">${it.emoji}</span> ${esc(it.nome)}</h1>
      <p class="lead">Toque em uma receita para ver como fazer.</p>`;
  }
  body.innerHTML = head + `<div class="count-label">${nums.length} receita${nums.length>1?'s':''}</div>` + nums.map(n=>recRow(n, nums)).join('') + homeBtn;
}

/* ---------- RECEITA ---------- */
const blk = (em,t,inner,cls='') => `<div class="blk ${cls}"><h3><span class="em">${em}</span> ${t}</h3>${inner}</div>`;
const para = t => `<p>${esc(t)}</p>`;
const steps = v => Array.isArray(v) ? `<ol class="steps">${v.map(x=>`<li><span>${esc(x)}</span></li>`).join('')}</ol>` : para(v);
let recCtx = null;
function openRecipe(n, ctx, push=true){
  recCtx = ctx || RECS.map(x=>x.r.n);
  renderRecipe(n);
  if($('recipeView').classList.contains('open')) $('recipeView').scrollTop=0; else openView('recipeView', push);
}
function renderRecipe(n){
  const {c,r} = REC[n]; save('membros-ultimo',{t:'r',n});
  const pos = recCtx.indexOf(n), prev = recCtx[pos-1], next = recCtx[pos+1];
  $('rv-top').textContent = 'Receita '+n;
  const isDone = done.has(rkey(n));
  $('rv-body').innerHTML = `
    <div class="hero-img"><img src="img/r/r${pad(n)}.webp" alt=""></div>
    <div class="kicker">${esc(c.titulo)}</div>
    <h1 class="title">${esc(r.titulo)}</h1>
    ${r.serve?`<p class="lead">${esc(r.serve)}</p>`:''}
    ${r.tags?`<div class="tags">${r.tags.map(t=>`<span>${esc(t)}</span>`).join('')}</div>`:''}
    ${r.ing?blk('🛒','Ingredientes',`<ul class="ing">${r.ing.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`):''}
    ${r.preparo?blk('🥣','Como preparar',steps(r.preparo)):''}
    ${r.fazer?blk('🥣','Como fazer',steps(r.fazer)):''}
    ${r.uso?blk('🕐','Como usar',para(r.uso)):''}
    ${r.duracao?blk('⏳','Duração',para(r.duracao)):''}
    ${r.usepara?blk('🌿','Use para',para(r.usepara)):''}
    ${r.regra?blk('⭐','Regra de ouro',para(r.regra),'tip'):''}
    ${r.dica?blk('💡','Dica',para(r.dica),'tip'):''}
    ${r.importante?blk('❗','Importante',para(r.importante),'care'):''}
    ${blk('⚠️','Cautela — leia antes',(r.cautela?para(r.cautela):'')+`<p class="small">${esc(C.aviso)}</p>`,'care')}
    <button class="done-btn ${isDone?'is-done':''}" id="doneBtn">${isDone?'✓ Já li esta receita':'✓ Marcar como lida'}</button>
    ${sign('Receita do '+esc(C.nomeApp))}
    <div class="navbtns">
      <button id="prevR" ${prev?'':'disabled'}>‹ Anterior${prev?`<small>${esc(REC[prev].r.titulo)}</small>`:''}</button>
      <button id="nextR" ${next?'':'disabled'}>Próxima ›${next?`<small>${esc(REC[next].r.titulo)}</small>`:''}</button>
    </div>
    ${homeBtn}`;
  $('doneBtn').addEventListener('click',()=>{ const k=rkey(n); done.has(k)?done.delete(k):done.add(k); saveDone(); updateProgress(); renderRecipe(n); if(stack.includes('listView')) renderList(); });
  $('prevR').addEventListener('click',()=>{ if(prev){ renderRecipe(prev); $('recipeView').scrollTop=0; } });
  $('nextR').addEventListener('click',()=>{ if(next){ renderRecipe(next); $('recipeView').scrollTop=0; } });
}

/* ---------- LEITURA ---------- */
const BOX = {conselho:['🩺','Conselho do médico'], curiosidade:['💡','Curiosidade'], aprofundamento:['🔎','Para saber mais'], checklist:['✅','Faça o teste'], nota:['⚠️','Atenção']};
function renderItems(items, ctx){
  let h='', ul=null, chk=null;
  const flushUl=()=>{ if(ul!==null){ h+=`<ul>${ul}</ul>`; ul=null; } }, flushChk=()=>{ if(chk!==null){ h+=`<div class="chklist">${chk}</div>`; chk=null; } };
  items.forEach((it,k)=>{
    if(it.t!=='li') flushUl();
    if(it.t!=='check') flushChk();
    const key = ctx+'.'+k;
    if(it.t==='h') h+=`<h3>${it.x}</h3>`;
    else if(it.t==='p') h+=`<p>${it.x}</p>`;
    else if(it.t==='quote') h+=`<blockquote>${it.x}</blockquote>`;
    else if(it.t==='li') ul=(ul||'')+`<li><span>${it.x}</span></li>`;
    else if(it.t==='check') chk=(chk||'')+`<button class="chk ${checks.has(key)?'on':''}" data-chk="${key}"><span class="bx">${CHECK}</span><span>${it.x}</span></button>`;
    else if(it.t==='img'||it.t==='table') h+=`<figure><img src="${it.src}" alt="" loading="lazy"></figure>`;
    else if(it.t==='box'){
      const tp = it.tipo||'nota', [em,lbl] = BOX[tp]||BOX.nota;
      const sub = (it.titulo && !['conselho','curiosidade'].includes(tp)) ? `<div class="pb-sub">${esc(it.titulo)}</div>` : '';
      h+=`<div class="pbox ${tp}"><div class="pb-t"><span class="em">${em}</span>${lbl}</div>${sub}${renderItems(it.itens||[], key)}</div>`;
    }
  });
  flushUl(); flushChk();
  return h;
}
function openRead(id, push=true){
  renderRead(id);
  if($('readView').classList.contains('open')) $('readView').scrollTop=0; else openView('readView', push);
}
function renderRead(id){
  const gi = GCAPS.findIndex(g=>g.id===id), isG = gi>=0;
  const x = isG ? GCAPS[gi] : X.find(e=>e.id===id);
  save('membros-ultimo',{t:'g',id});
  const rel = isG && x.rel ? CAPS.find(c=>c.id===x.rel) : null;
  const prev = isG ? GCAPS[gi-1] : null, next = isG ? GCAPS[gi+1] : null;
  const isDone = isG && done.has(gkey(id));
  $('gv-top').textContent = isG ? 'Guia · '+gLabel(x) : 'Consulta rápida';
  $('gv-body').innerHTML = `
    <div class="hero-img"><img src="${x.banner}" alt=""></div>
    <div class="kicker">${isG?esc(gLabel(x)):esc(x.sub||'')}</div>
    <h1 class="title">${esc(x.titulo)}</h1>
    <div class="read">${renderItems(x.itens, x.id)}</div>
    ${sign(isG?'Guia da Saúde Natural · '+esc(C.nomeApp):esc(C.nomeApp))}
    ${rel?`<div class="sec-title"><span class="em">🍵</span> Receitas sobre este tema</div>${capRow(rel)}`:''}
    ${isG?`<button class="done-btn ${isDone?'is-done':''}" id="gDone">${isDone?'✓ Já li este capítulo':'✓ Marcar capítulo como lido'}</button>
      <div class="navbtns"><button id="gPrev" ${prev?'':'disabled'}>‹ Anterior${prev?`<small>${esc(prev.titulo)}</small>`:''}</button>
      <button id="gNext" ${next?'':'disabled'}>Próximo ›${next?`<small>${esc(next.titulo)}</small>`:''}</button></div>`:''}
    ${homeBtn}`;
  $('gv-body').querySelectorAll('[data-chk]').forEach(b=>b.addEventListener('click',()=>{
    const k=b.dataset.chk; checks.has(k)?checks.delete(k):checks.add(k); b.classList.toggle('on'); save('membros-checklists-v1',[...checks]);
  }));
  if(isG){
    $('gDone').addEventListener('click',()=>{ const k=gkey(id); done.has(k)?done.delete(k):done.add(k); saveDone(); updateProgress(); renderRead(id); });
    $('gPrev').addEventListener('click',()=>{ if(prev){ renderRead(prev.id); $('readView').scrollTop=0; } });
    $('gNext').addEventListener('click',()=>{ if(next){ renderRead(next.id); $('readView').scrollTop=0; } });
  }
}

/* ---------- instalar ---------- */
document.querySelectorAll('.device-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.device-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active');
  const ios=b.dataset.device==='ios'; $('steps-ios').hidden=!ios; $('steps-android').hidden=ios;
}));
if(/iPhone|iPad|iPod/i.test(navigator.userAgent)) document.querySelector('.device-btn[data-device="ios"]').click();

/* ---------- marca e início ---------- */
document.title = C.nomeApp + ' — Área de Membros';
$('brand').innerHTML = C.logo ? `<img src="${esc(C.logo)}" alt="${esc(C.nomeApp)}">`
  : C.especialista ? `<img class="b-foto" src="${C.especialista.foto}" alt=""><span class="nm">${esc(C.nomeApp)}<small>por ${esc(C.especialista.nome)}</small></span>`
  : `<span class="leaf"><svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 21c0-9 5-15 15-16-1 10-7 15-15 16z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5 21l8-8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></span><span class="nm">${esc(C.nomeApp)}</span>`;
try{ history.replaceState({d:0,p:'inicio'},''); }catch(e){}
showPage('inicio', false); updateProgress();
})();
