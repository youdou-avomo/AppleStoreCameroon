// script.js - final amélioré
// Features: categories (4+ products), modal with qty, add to cart (robust), search suggestions with separators (gradient), background blur when search open, theme toggle with icon swap, card animations + 3D tilt, improved interactions.
// ---------- DOM ----------


const productsContainer = document.getElementById('productsContainer');
const navLinks = document.querySelectorAll('.nav-list a, .mobile-menu a');

const searchBtn = document.getElementById("searchBtn");
const searchWrap = document.getElementById("searchWrap");
const searchInput = document.getElementById("searchInput");
const searchSuggestions = document.getElementById("searchSuggestions");

const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const cartBody = document.getElementById("cartBody");
const cartTotal = document.getElementById("cartTotal");

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobile = document.getElementById("closeMobile");

const themeToggle = document.getElementById("themeToggle");
const metaTheme = document.getElementById("meta-theme");

const modalBackdrop = document.getElementById("modalBackdrop");
const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDescription");
const qtyMinus = document.getElementById("qtyMinus");
const qtyPlus = document.getElementById("qtyPlus");
const qtyInput = document.getElementById("qtyInput");
const addToCartBtn = document.getElementById("addToCartBtn");
const mainContent = document.getElementById("mainContent");

// ---------- DATA ----------
const allProducts = {
  store: [
    {id: 101, name:"iPhone Air", price:1099, category:"iphone", image:"iphone-3.png", desc:"Écran large et autonomie renforcée.", carac:""},
    {id: 102, name:"MacBook Air M4", price:1999, category:"mac", image:"mac-1.png", desc:"Ultraléger, puissant, écran Liquid Retina.", carac:""},
    {id: 103, name:"iPad Pro", price:1199, category:"ipad", image:"ipad-1.png", desc:"Puissance X-Series, design fin.", carac:""},
    {id: 104, name:"Watch Ultra 2", price:799, category:"watch", image:"watch-4.png", desc:"Robuste, précise et faite pour l’aventure.", carac:""}
  ],

  mac: [
    {id: 201, name:"MacBook Air", price:1199, category:"mac", image:"mac-1.png", desc:"Fin, solide, rapide et parfait pour le quotidien.", carac:""},
    {id: 202, name:"MacBook Pro 14/16", price:2199, category:"mac", image:"mac-3.png", desc:"Performances pro pour les tâches exigeantes.", carac:"Puce M5 / M4 Pro / M4 Max"},
    {id: 203, name:"Mac Pro", price:6999, category:"mac", image:"mac-4.png", desc:"Station pro modulable pour workflows lourds.", carac:"Puce M2 Ultra"},
    {id: 204, name:"Pro Display XDR", price:4999, category:"mac", image:"mac-2.jpg", desc:"Écran 6K XDR pour créateurs professionnels.", carac:""}
  ],

  ipad: [
    {id: 301, name:"iPad mini", price:599, category:"ipad", image:"ipad-3.png", desc:"Compact, puissant et ultra-portable.", carac:""},
    {id: 302, name:"iPad 10ᵉ", price:449, category:"ipad", image:"ipad-4.png", desc:"Écran immersif et performances fluides.",  carac:""},
    {id: 303, name:"iPad Air", price:699, category:"ipad", image:"ipad-2.png", desc:"Léger, rapide, idéal pour la créativité.",  carac:""},
    {id: 304, name:"iPad Pro", price:1199, category:"ipad", image:"ipad-1.png", desc:"La meilleure expérience iPad, écran XDR.",  carac:""}
  ],

  iphone: [
    {id: 401, name:"iPhone 17 Pro", price:1299, category:"iphone", image:"iphone-1.png", desc:"Design premium et caméra avancée.", carac:""},
    {id: 402, name:"iPhone 16 Pro", price:999, category:"iphone", image:"iphone-hero.png", desc:"Grand écran et excellente autonomie.", carac:""},
    {id: 403, name:"iPhone Air", price:899, category:"iphone", image:"iphone-3.png", desc:"Performances Pro dans un format léger.",  carac:""},
    {id: 404, name:"iPhone 11", price:399, category:"iphone", image:"iphone-4.png", desc:"Abordable, fiable et polyvalent.",  carac:""}
  ],

  watch: [
    {id: 501, name:"Watch Series 9", price:399, category:"watch", image:"watch-2.png", desc:"Suivi santé avancé et performance.",carac:""},
    {id: 502, name:"Watch SE", price:279, category:"watch", image:"watch-3.png", desc:"Essentiel, rapide et très abordable.",carac:""},
    {id: 503, name:"Watch Ultra 2", price:799, category:"watch", image:"watch-4.png", desc:"Résistante, sportive et précise.",carac:""},
    {id: 504, name:"Watch Studio", price:229, category:"watch", image:"watch-1.png", desc:"Style personnalisable et performant.",carac:""}
  ],

  vision:[
    {id:1001,name:"Vision Pro", price:3499, category:"support", image:"vision.png", desc:"Immersion extrême, puce M5 et confort total."},
    {id:1002,name:"Solo Knit Band", price:99, category:"support", image:"vision1.png", desc:"Confort, respirabilité et maintien optimal."},
    {id:1003,name:"Apple Vision Pro", price:3499, category:"support", image:"vision2.png", desc:"Collaboration immersive et multitâche avancé."},
  ],

  airpods: [
    {id:601,name:"AirPods Pro 2", price:249, category:"airpods", image:"air-pod-pro2.png", desc:"ANC avancé et audio spatial immersif."},
    {id:602,name:"AirPods 3", price:179, category:"airpods", image:"air-pod.png", desc:"Son riche avec capteur de pression."},
    {id:603,name:"Beats Studio", price:349, category:"airpods", image:"beat-studio.png", desc:"Son puissant et réduction active du bruit."},
    {id:604,name:"AirPods Max", price:549, category:"airpods", image:"air-pod-max.png", desc:"Casque premium à haute fidélité."}
  ],

  tvhome:[
    {id:701,name:"Apple TV 4K", price:179, category:"tvhome", image:"apple_tv_4k.png", desc:"Streaming 4K, HDR et Apple TV OS."},
    {id:702,name:"HomePod mini", price:99, category:"tvhome", image:"home-pod-mini.png", desc:"Assistant intelligent et son immersif."},
    {id:703,name:"Apple Remote", price:59, category:"tvhome", image:"comfort.png", desc:"Télécommande modernisée."},
    {id:704,name:"Home App", price:2, category:"tvhome", image:"home-app.png", desc:"Total contrôle de la maison connectée."}
  ],

  entertainment:[
    
  ],

  accessories:[
    {id:901,name:"EvoPop Case", price:49, category:"accessories", image:"accessoire1.png", desc:"Coque antichoc premium."},
    {id:902,name:"HidrateSpark Pro", price:159, category:"accessories", image:"accessoire2.png", desc:"Gourde connectée intelligente."},
    {id:903,name:"Crossbody Strap", price:69, category:"accessories", image:"accessoire4.png", desc:"Bandoulière élégante et robuste."},
    {id:904,name:"Herschel Cloud", price:89, category:"accessories", image:"accessoire6.png", desc:"Organiseur tech élégant."}
  ],

  support:[
    
  ]
};

// ---------- state ----------
let currentSection = 'store';
let cart = loadCart();
let currentModalProductId = null;
// ---------- helpers ----------
  const priceFormatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
 function normPath(p){
    if(!p) return p;
    return p.replace(/^\/+|^[a-zA-Z]:\\/g,''); // remove leading slash or C:\ if any
  }
function findProductById(id){
    for(const cat in allProducts){
      const found = allProducts[cat].find(p => p.id === id);
      if(found) return found;
    }
    return null;
  }

// add slight delay helper
const later = (fn, t=30) => setTimeout(fn,t);

// storage
  function saveCart(){ try{ localStorage.setItem('my_store_cart_v2', JSON.stringify(cart)); }catch(e){} }
  function loadCart(){ try{ const raw = localStorage.getItem('my_store_cart_v2'); return raw? JSON.parse(raw): []; }catch(e){ return []; } }


// ---------- render section (with sorting by price ascending) ----------
  function renderSection(section){
    currentSection = section;
    const products = (allProducts[section] || []).slice();
    // normalize image paths and sort by price ascending (linear)
    products.forEach(p => { p.image = normPath(p.image || ''); });
    // Limiter les descriptions à ~100 caractères pour 2 lignes (ajuste selon ta police)
    products.sort((a,b) => (a.price||0) - (b.price||0));
    productsContainer.innerHTML = `
      <div class="category-head">
        <h2>${section.charAt(0).toUpperCase() + section.slice(1)}</h2>
        <a class="view-all" href="#" data-section="${section}">Voir tout</a>
      </div>
      <div class="grid" style="backdrop-filter: blur(8px);z-index: 1500;animation: fadeInPopup 0.25s ease forwards; @keyframes fadeInPopup {from { opacity: 0; } to { opacity: 1; }}">
        ${products.map(p => `
          <article class="card" data-id="${p.id}" data-tilt>
            <div class="tilt-inner" style="padding: 10px 5px 10px 5px ">
              <img loading="lazy" style="height:256px" src="${p.image}" alt="${escapeHtml(p.name)}" />
              <h4>${escapeHtml(p.name)}</h4>
              <p class="muted">${escapeHtml(p.desc)}</p>
              <div style="margin-top:10px;display:flex;justify-content:center;gap:8px;align-items:center;">
                <button class="price-btn" data-id="${p.id}">${priceFormatter.format(p.price)}</button>
                <button style="font-weight:bold;" class="add-btn" data-id="${p.id}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-11.5L6 6z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="20" r="1" fill="currentColor"/><circle cx="18" cy="20" r="1" fill="currentColor"/></svg> Ajouter</button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  // add entrance animation
    later(()=> {
      document.querySelectorAll('.card').forEach((el,i)=>{
        el.classList.add('anim-in');                                                     
        el.style.animationDelay = (i*70) + 'ms';
      });
    },30);

    // attach listeners
    document.querySelectorAll('.card').forEach(card=>{
      card.addEventListener('click', (e)=>{
        // If clicked on add or price, prevent opening modal; otherwise open modal
        const tgt = e.target;
        const id = parseInt(card.getAttribute('data-id'),10);
        if(tgt.closest('.add-btn')){
          const prod = findProductById(id);
          if(prod) { addToCart(prod,1); openCart(); }
          return;
        }
        if(tgt.closest('.price-btn')){
          // open modal too
          const prod = findProductById(id);
          if(prod) openProductModal(prod);
          return;
        }
        const prod = findProductById(id);
        if(prod) openProductModal(prod);
      });
      attachTilt(card);
    });
  }

  // scroll to products area
  later(()=> {
    const target = document.querySelector('#shop');
    if (target) window.scrollTo({ top: target.offsetTop - 80, behavior:'smooth' });
  },50);

  // === Search suggestions : AFFICHER puis NAVIGUER vers la catégorie (Option A) ===
  searchInput?.addEventListener('input', (e) => {
  const v = e.target.value.trim().toLowerCase();
  if (!searchSuggestions) return;
  searchSuggestions.innerHTML = '';
  if (!v) return;

  // find up to 8 matches
  // flatten all products for search
  const demoProductsFlat = Object.values(allProducts).flat();
  const matches = demoProductsFlat.filter(p => (p.name||'').toLowerCase().includes(v)).slice(0, 8);

  matches.forEach(m => {
    const el = document.createElement('div');
    el.className = 'sugg';
    el.style.padding = '10px 12px';
    el.style.cursor = 'pointer';
    el.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center">
                      <div style="display:flex;flex-direction:column">
                        <strong style="font-size:14px">${escapeHtml(m.name)}</strong>
                        <small style="color:var(--muted)">${(m.category||'').toUpperCase()}</small>
                      </div>
                      <strong style="font-size:13px">${priceFormatter.format(m.price)}</strong>
                    </div>`;

    // click -> go to category, then highlight target product
    el.addEventListener('click', () => {
      // close search UI
      closeSearch();
      // render category section
      renderSection(m.category || 'store');

      // after renderSection finishes and DOM updated, highlight the card with that id
      // use a delay similar to renderSection's animation delay
      setTimeout(() => {
        // find the card element for this product id
        const card = document.querySelector(`.card[data-id="${m.id}"]`);
        if (card) {
          // scroll into view inside page
          const rect = card.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const top = rect.top + scrollTop - 100; // offset for header
          window.scrollTo({ top, behavior: 'smooth' });

          // add temporary highlight class
          card.classList.add('highlight-target');
          // also add a pulse for attention
          card.classList.add('highlight-pulse');

          // remove highlight after 2.2s
          setTimeout(() => {
            card.classList.remove('highlight-pulse');
            // keep a subtle border for a little longer
            setTimeout(() => card.classList.remove('highlight-target'), 600);
          }, 2200);
        }
      }, 120); // small timeout to allow renderSection to create cards
    });

    searchSuggestions.appendChild(el);
  });
});

function addShineEffect() {
  document.querySelectorAll(".card img").forEach(img => {
    img.classList.add("shine");
  });
}

 // ---------- tilt helper ----------
  function attachTilt(card){
    const inner = card.querySelector('.tilt-inner');
    if(!inner) return;
    const height = card.offsetHeight, width = card.offsetWidth;
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y - height/2) / height) * 6;
      const ry = ((x - width/2) / width) * -6;
      inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', ()=> { inner.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)'; });
    card.addEventListener('mousedown', ()=> { inner.style.transform += ' scale(.995)'; });
    card.addEventListener('mouseup', ()=> { inner.style.transform = inner.style.transform.replace(' scale(.995)',''); });
  }


// ---------- modal ----------
  function openProductModal(prod){
    if(!modalBackdrop) return;
    currentModalProductId = prod.id;
    if(modalImg) modalImg.src = normPath(prod.image || '');
    if(modalTitle) modalTitle.textContent = prod.name;
    if(modalCategory) modalCategory.textContent = (prod.category||'').toUpperCase();
    if(modalPrice) modalPrice.textContent = priceFormatter.format(prod.price);
    if(modalDesc) modalDesc.textContent = prod.desc || 'Aucune description !!';
    if(qtyInput) qtyInput.value = '1';
    modalBackdrop.classList.add('open');
    modalBackdrop.setAttribute('aria-hidden','false');
    mainContent?.classList.add('blurred');
    const modalEl = document.querySelector('.modal');
    if(modalEl){ modalEl.style.transform='scale(.98)'; modalEl.style.opacity='0'; later(()=>{modalEl.style.transform=''; modalEl.style.opacity='';},20); }
  }
  function closeModal(){
    currentModalProductId = null;
    modalBackdrop.classList.remove('open'); modalBackdrop.setAttribute('aria-hidden','true');
    mainContent?.classList.remove('blurred');
  }

// ---------- qty controls ----------
qtyPlus?.addEventListener('click', ()=> { if (!qtyInput) return; qtyInput.value = String(Math.max(1, parseInt(qtyInput.value || "1",10) + 1)); });
qtyMinus?.addEventListener('click', ()=> { if (!qtyInput) return; qtyInput.value = String(Math.max(1, parseInt(qtyInput.value || "1",10) - 1)); });

// ---------- add to cart ----------
addToCartBtn?.addEventListener('click', ()=> {
  const prod = findProductById(currentModalProductId);
  if (!prod) return;
  const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value || "1",10)) : 1;
  addToCart(prod, qty);
  closeModal();
  openCart();
});

// ---------- cart ----------
function addToCart(product, qty=1){
    const existing = cart.find(i=>i.id === product.id);
    if(existing) existing.qty = (existing.qty||0) + qty;
    else cart.push({ id: product.id, name: product.name, price: product.price, qty });
    saveCart();
    renderCart();
  }
  function renderCart(){
    if(!cartBody || !cartTotal) return;
    cartBody.innerHTML = '';
    if(cart.length === 0){
      const p = document.createElement('p'); p.className='empty'; p.textContent='Votre panier est vide.'; cartBody.appendChild(p);
      cartTotal.textContent = priceFormatter.format(0);
      return;
    }
    cart.forEach(item=>{
      const row = document.createElement('div');
      row.className = 'cart-item';
      row.style.display='flex'; row.style.justifyContent='space-between'; row.style.alignItems='center'; row.style.marginBottom='12px';
      const imgDiv = `<div style="width:55px;height:54px;border-radius:9px;overflow:hidden;background:#f3f4f6"><img src="${normPath((findProductById(item.id)||{}).image||'')}" alt="${escapeHtml(item.name)}" style="width:100%;height:100%;object-fit:cover;"></div>`;
      row.innerHTML = `<div style="display:flex;gap:12px;align-items:center">${imgDiv}<div><div style="font-weight:600">${escapeHtml(item.name)}</div><div style="font-size:13px;color:#777">${item.qty} × ${priceFormatter.format(item.price)}</div></div></div>
      <div><input type="number" min="1" value="${item.qty}" style="width:64px;padding:6px;border-radius:8px;border:1px solid #ddd" data-id="${item.id}" class="cart-qty"/><div style="text-align:right;margin-top:6px"><button class="remBtn" data-id="${item.id}" style="background:transparent;border:0;color:#e53935;cursor:pointer">Suppr</button></div></div>`;
      cartBody.appendChild(row);
    });
    cartTotal.textContent = priceFormatter.format(cart.reduce((s,i)=> s + (i.price * i.qty), 0));
    // attach qty change & remove
    cartBody.querySelectorAll('.cart-qty').forEach(inp => inp.addEventListener('change', (e)=> {
      const id = parseInt(e.target.dataset.id,10); const val = Math.max(1, parseInt(e.target.value||'1',10));
      cart = cart.map(it => it.id===id ? { ...it, qty: val } : it);
      saveCart(); renderCart();
    }));
    cartBody.querySelectorAll('.remBtn').forEach(b => b.addEventListener('click', (e)=> {
      const id = parseInt(e.currentTarget.dataset.id,10); cart = cart.filter(i=>i.id!==id); saveCart(); renderCart();
    }));
  }
  function openCart(){ if(cartDrawer){ cartDrawer.classList.add('open'); cartDrawer.setAttribute('aria-hidden','false'); renderCart(); } }
  function closeCartFn(){ if(cartDrawer){ cartDrawer.classList.remove('open'); cartDrawer.setAttribute('aria-hidden','true'); } }

// ---------- search ----------
const demoProductsFlat = Object.values(allProducts).flat();
  if(searchBtn) searchBtn.addEventListener('click', ()=> {
    const visible = searchWrap && searchWrap.getAttribute('aria-hidden') === 'false';
    if(visible) closeSearch(); else openSearch();
  });
  function openSearch(){ if(!searchWrap) return; searchWrap.setAttribute('aria-hidden','false'); searchWrap.style.display='block'; searchInput?.focus(); mainContent?.classList.add('blurred'); }
  function closeSearch(){ if(!searchWrap) return; searchWrap.setAttribute('aria-hidden','true'); searchWrap.style.display='none'; searchSuggestions.innerHTML=''; if(searchInput) searchInput.value=''; mainContent?.classList.remove('blurred'); }

 
// ---------- nav links ----------
navLinks.forEach(link => {
  link.addEventListener('click', (e)=> {
    e.preventDefault();
    const section = link.getAttribute('data-section');
    if (section) {
      if (mobileMenu) { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); }
      renderSection(section);
    }
  });
});

// ---------- modal events ----------
modalClose?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', (e)=> { if(e.target === modalBackdrop) closeModal(); });

  // ---------- keyboard ----------
  document.addEventListener('keydown', (e)=> {
    if(e.key === 'Escape'){ closeModal(); closeCartFn(); if(mobileMenu) mobileMenu.classList.remove('open'); closeSearch(); }
  });

  //----------- Compteur panier ---------
  function updateCartCount() {
  const count = cart.reduce((sum, p) => sum + p.qty, 0);
  const badge = document.getElementById("cartCount");

  if (count > 0) {
    badge.style.display = "block";
    badge.textContent = count;
  } else {
    badge.style.display = "none";
  }
}

  // ---------- mobile menu ----------
  menuBtn?.addEventListener('click', ()=> { if(mobileMenu){ mobileMenu.classList.add('open'); mobileMenu.setAttribute('aria-hidden','false'); }});
  closeMobile?.addEventListener('click', ()=> { if(mobileMenu){ mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden','true'); }});

  // ---------- cart buttons ----------
  cartBtn?.addEventListener('click', ()=> openCart());
  closeCart?.addEventListener('click', ()=> closeCartFn());

  // ---------- theme (SVG icons pro) ----------
  function setThemeIcon(theme){
    const icon = themeToggle?.querySelector('.theme-icon');
    if(!icon) return;
    if(theme === 'dark'){
      // moon SVG
      icon.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/></svg>`;
    } else {
      // sun SVG
      icon.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d="M12 4v2M12 18v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M1 12h2M21 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>`;
    }
  }
function applyTheme(theme){
    if(theme === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark');
    metaTheme?.setAttribute('content', theme === 'dark' ? '#0b0b0c' : '#ffffff');
    setThemeIcon(theme);
  }
  const preferred = localStorage.getItem("theme") || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark":"light");
  applyTheme(preferred);
  themeToggle?.addEventListener('click', ()=> {
    const now = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(now); localStorage.setItem('theme', now);
  });

  // ---------- utils ----------
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g, (m)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }

  // ---------- init ----------
  renderSection('store');
  renderCart();

  // expose for debug
  window._app = { allProducts, renderSection, addToCart, cart };

  /* ===== Extensions non-invasives : badge, styles et icône paiement ===== */
(function(){
  // élément badge (déjà présent dans ton HTML)
  const badge = document.getElementById('cartCount');
  // si pas trouvé, on arrête
  if(!badge) return;

  // mise à jour du badge (compatible si tu utilises qty ou qty)
  function updateCartBadge(){
    try {
      const totalCount = (cart || []).reduce((s, it) => s + (it.qty || it.quantity || 0), 0);
      if(totalCount > 0){
        badge.style.display = 'flex';
        badge.textContent = totalCount;
      } else {
        badge.style.display = 'none';
      }
    } catch(e){
      console.warn('updateCartBadge error', e);
    }
  }

  // wrapper non-invasif pour addToCart -> appelle le vrai addToCart puis met à jour badge
  if(window.addToCart && typeof window.addToCart === 'function' && !window.__wrapped_addToCart){
    window.__wrapped_addToCart = window.addToCart;
    window.addToCart = function(product, qty){
      const res = window.__wrapped_addToCart(product, qty);
      // small delay to allow renderCart() to update DOM then badge
      setTimeout(updateCartBadge, 40);
      return res;
    };
  }

  // wrapper non-invasif pour renderCart -> s'exécute après rendu pour mettre à jour badge
  if(window.renderCart && typeof window.renderCart === 'function' && !window.__wrapped_renderCart){
    window.__wrapped_renderCart = window.renderCart;
    window.renderCart = function(){
      const res = window.__wrapped_renderCart();
      try { updateCartBadge(); } catch(e){ /*ignore*/ }
      return res;
    };
  }

  // If other code changes cart (remove or quantity inputs), renderCart already wrapped so badge will update.
  // Ensure badge initial state
  updateCartBadge();

  // Styliser "Votre panier est vide." center (en plus du CSS) — if exists and empty, ensure class
  function refreshEmptyStyle(){
    const empty = document.querySelector('.cart-body .empty');
    if(empty){
      empty.style.display = 'flex';
      empty.style.alignItems = 'center';
      empty.style.justifyContent = 'center';
    }
  }
  refreshEmptyStyle();

  // Injecter icône SVG pro dans le bouton checkout (si pas déjà présent)
  (function insertCheckoutIcon(){
    const checkoutBtn = document.querySelector('.checkout');
    if(!checkoutBtn) return;
    // don't insert twice
    if(checkoutBtn.querySelector('svg')) return;
    const svg = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" stroke-width="1.6" fill="none"></rect>
      <rect x="2" y="10" width="6" height="2" fill="currentColor"></rect>
      <circle cx="18" cy="17" r="1" fill="currentColor"></circle>
    </svg>`;
    checkoutBtn.insertAdjacentHTML('afterbegin', svg);
  })();

  // Ensure cartTotal strong id exists and styled (no change needed if your HTML already has #cartTotal)
  // Force UI update on load
  setTimeout(()=> {
    updateCartBadge();
    refreshEmptyStyle();
  }, 60);

  // expose small helper in case besoin debug
  window._cartBadge = { update: updateCartBadge };

  // === Observer pour appliquer effets aux cards dynamiques ===
(function watchProductsContainer(){
  if(!productsContainer) return;
  // function called after new cards injected
  const onCardsRendered = () => {
    // ensure all cards have the shine (CSS handles ::before), but if you want to add a 'new' ribbon conditionally:
    document.querySelectorAll('.card').forEach(card => {
      // optional: add ribbon for new items (uncomment if you need)
      // if(!card.querySelector('.ribbon-new') && someConditionForNew(card)) {
      //   card.insertAdjacentHTML('afterbegin', '<div class="ribbon-new">NEW</div>');
      // }
      // ensure tilt inner exists (already in your renderSection)
      const img = card.querySelector('img');
      if(img) img.loading = 'lazy';
    });
  };

  // call once initially
  onCardsRendered();

  // create observer to catch future renders
  const mo = new MutationObserver((mutations) => {
    let added = false;
    for(const m of mutations){
      if(m.addedNodes && m.addedNodes.length) { added = true; break; }
    }
    if(added) {
      // small delay to let card markup settle and animations apply
      setTimeout(onCardsRendered, 40);
    }
  });
  mo.observe(productsContainer, { childList:true, subtree:true });
})();

// NOUVEAU 

// =============================
// NAV ACTIVE + SCROLL
// =============================
function setActiveNav(section){
  navLinks.forEach(a => {
    a.classList.toggle("active-nav", a.dataset.section === section);
  });
}

navLinks.forEach(link=>{
  link.addEventListener("click", e=>{
    e.preventDefault();
    const section = link.dataset.section;
    if(!section) return;

    renderSection(section);
    setActiveNav(section);

    const shop = document.getElementById("shop");
    if(shop){
      shop.scrollIntoView({ behavior:"smooth", block:"start" });
    }

    mobileMenu.classList.remove("open");
  });
});

// style injecté sans toucher ton CSS
const navStyle = document.createElement("style");
navStyle.textContent = `
  .nav-list a.active-nav{
    background: rgba(0,113,227,0.12);
    color: #0071e3;
    font-weight:600;
  }
`;
document.head.appendChild(navStyle);

// =============================
// SEARCH KEYBOARD UX
// =============================
let searchIndex = -1;

searchInput.addEventListener("keydown", e=>{
  const items = [...searchSuggestions.querySelectorAll(".sugg")];
  if(!items.length) return;

  if(e.key === "ArrowDown"){
    e.preventDefault();
    searchIndex = (searchIndex + 1) % items.length;
  }

  if(e.key === "ArrowUp"){
    e.preventDefault();
    searchIndex = (searchIndex - 1 + items.length) % items.length;
  }

  if(e.key === "Enter"){
    e.preventDefault();
    (items[searchIndex] || items[0]).click();
    searchIndex = -1;
  }

  items.forEach((el,i)=>{
    el.style.background = i === searchIndex ? "rgba(0,113,227,0.08)" : "";
  });
});

// =============================
// CLICK OUTSIDE TO CLOSE
// =============================
document.addEventListener("click", e=>{
  if(searchWrap.getAttribute("aria-hidden") === "false" &&
     !searchWrap.contains(e.target) &&
     !searchBtn.contains(e.target)){
    searchWrap.setAttribute("aria-hidden","true");
    mainContent.classList.remove("blurred");
  }

  if(cartDrawer.classList.contains("open") &&
     !cartDrawer.contains(e.target) &&
     !cartBtn.contains(e.target)){
    cartDrawer.classList.remove("open");
  }

  if(mobileMenu.classList.contains("open") &&
     !mobileMenu.contains(e.target) &&
     !menuBtn.contains(e.target)){
    mobileMenu.classList.remove("open");
  }
});

// =============================
// CLEAR CART BUTTON
// =============================
function injectClearCartBtn(){
  if(document.getElementById("clearCartBtn")) return;

  const btn = document.createElement("button");
  btn.id = "clearCartBtn";
  btn.innerHTML = `
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
      <path d="M3 6h18M8 6v14m8-14v14M10 6l1-2h2l1 2"stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M8 6V4h8v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M6 6l1 14h10l1-14" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
      <path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    </svg>
    Vider le panier
  `;

  btn.style.cssText = `
    display:flex;
    align-items:center;
    gap:8px;
    justify-content:center;
    padding:10px;
    border-radius:10px;
    font-size:14px;
    font-weight:600;    
    border:1px solid rgba(0,0,0,.1);
    background: #e23f3fff;
    color:#fff;
    cursor:pointer;
  `;

  btn.onclick = ()=>{
    cart = [];
    saveCart();
    cartBody.innerHTML = '<p class="empty">Votre panier est vide.</p>';
    cartTotal.textContent = "0 €";
    document.getElementById("cartCount").textContent = "0";
  };
  const checkoutBtn = document.querySelector('.checkout');
if (checkoutBtn) {
  checkoutBtn.parentNode.insertBefore(btn, checkoutBtn);
} else {
  document.querySelector(".cart-footer").append(btn);
}
  //document.querySelector(".cart-footer").prepend(btn);
}
  cartBtn.addEventListener("click", injectClearCartBtn);
// Limiter les descriptions à ~100 caractères pour 2 lignes 

  // Attacher l'événement au bouton "Procéder au paiement"
  document.getElementById('checkoutBtn').addEventListener('click', function() {
  if (!cart || cart.length === 0) {
    alert('Ton panier est vide ! Ajoute des produits avant de commander.');
    return;
  }
  const button = document.getElementById('checkoutBtn');
  
  button.textContent = 'Commande en cours...';
  button.disabled = true; // Désactiver pour éviter les clics multiples
  const whatsappNumber = '+237681299075'; 

  // Construire le message automatique avec les détails du panier
  let message = 'Bonjour ! Je souhaite commander les produits suivants :\n\n';
  cart.forEach(item => {
    message += `- ${item.name} (Quantité: ${item.qty}) - Prix: ${item.price * item.qty} €\n`;
  });
  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  message += `\nTotal: ${total} €\n\nMerci de confirmer le paiement et la livraison.`;

  // Encoder le message pour l'URL WhatsApp
  const encodedMessage = encodeURIComponent(message);
    
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  window.location.href = whatsappUrl;
    
  // Event 
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    const button = document.getElementById('checkoutBtn');
    if (button) {
      button.textContent = 'Commander'; 
      button.disabled = false;
    }
  }
});});

})();








