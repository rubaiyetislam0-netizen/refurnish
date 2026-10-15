/* ReFurnish — shared app code: storage, header/footer, product cards, icons. */
window.RF = (function () {
  var D = window.RF_DATA;

  /* ---------- utils ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function money(n) { return n == null || n === '' ? '৳ —' : '৳ ' + Number(n).toLocaleString('en-US'); }
  function ago(h) {
    if (h == null) return 'just now';
    if (h < 1) return 'just now';
    if (h < 24) return Math.round(h) + 'h';
    if (h < 168) return Math.round(h / 24) + 'd';
    return Math.round(h / 168) + 'w';
  }
  function agoLong(h) {
    if (h == null || h < 1) return 'Listed just now';
    if (h < 24) return 'Listed ' + Math.round(h) + ' hours ago';
    var d = Math.round(h / 24);
    if (d < 7) return 'Listed ' + d + (d === 1 ? ' day ago' : ' days ago');
    var w = Math.round(d / 7);
    return 'Listed ' + w + (w === 1 ? ' week ago' : ' weeks ago');
  }
  function param(name) { return new URLSearchParams(location.search).get(name); }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function now() { var d = new Date(); return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0'); }

  /* ---------- storage (falls back to memory if blocked) ---------- */
  var mem = {};
  var store = {
    get: function (k, def) {
      try { var v = localStorage.getItem('rf_' + k); return v == null ? def : JSON.parse(v); }
      catch (e) { return k in mem ? mem[k] : def; }
    },
    set: function (k, v) {
      mem[k] = v;
      try { localStorage.setItem('rf_' + k, JSON.stringify(v)); return true; }
      catch (e) { return false; }
    }
  };
  if (!store.get('seeded', false)) {
    store.set('saved', D.SAVED_SEED.slice());
    store.set('mylistings', D.MY_LISTINGS.slice());
    store.set('threads', D.THREADS.slice());
    store.set('location', { city: 'Dhaka', area: 'Gulshan' });
    store.set('seeded', true);
  }

  /* ---------- user ---------- */
  function user() { return store.get('user', null); }
  function signIn(u) { store.set('user', u); }
  function signOut() { store.set('user', null); }
  function firstName(n) { return String(n || '').split(' ')[0]; }

  /* ---------- listings ---------- */
  function myListings() { return store.get('mylistings', []); }
  function saveMyListings(list) { return store.set('mylistings', list); }
  function meSeller() {
    var u = user();
    var mine = myListings();
    return {
      id: 'me', name: (u && u.name) || 'You', area: (store.get('location', {}).area) || 'Gulshan',
      rating: 4.9, reviews: 6, sold: mine.filter(function (x) { return x.status === 'Sold'; }).length,
      since: 'October 2026', replies: 'Usually replies within an hour', verified: true
    };
  }
  function seller(id) { return id === 'me' ? meSeller() : D.SELLERS[id]; }
  function normalizeMine(x) {
    return Object.assign({ verified: true, delivery: true, photos: [], sold: x.status === 'Sold', wasPrice: null, sub: x.cat }, x, { seller: 'me', mine: true });
  }
  function allListings() {
    var mine = myListings().filter(function (x) { return x.status === 'Active'; }).map(normalizeMine);
    return mine.concat(D.LISTINGS);
  }
  function getListing(id) {
    var m = myListings().filter(function (x) { return x.id === id; })[0];
    if (m) return normalizeMine(m);
    return D.LISTINGS.filter(function (x) { return x.id === id; })[0] || null;
  }

  /* ---------- saved ---------- */
  function savedIds() { return store.get('saved', []); }
  function isSaved(id) { return savedIds().indexOf(id) !== -1; }
  function toggleSaved(id) {
    var s = savedIds();
    var i = s.indexOf(id);
    if (i === -1) s.unshift(id); else s.splice(i, 1);
    store.set('saved', s);
    return i === -1;
  }

  /* ---------- threads ---------- */
  function threads() { return store.get('threads', []); }
  function saveThreads(t) { store.set('threads', t); }
  function unreadCount() { return threads().filter(function (t) { return t.unread; }).length; }

  /* ---------- icons (Lucide-style strokes) ---------- */
  function svg(paths, size, extra) {
    size = size || 20;
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' + (extra || '') + '>' + paths + '</svg>';
  }
  var P = {
    pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    target: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    tag: '<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
    card: '<rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    truck: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    send: '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>'
  };
  function icon(name, size, extra) { return svg(P[name] || '', size, extra); }

  /* Furniture glyphs stand in for photos until real images are uploaded. */
  var G = {
    Sofas: '<path d="M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z"/><path d="M5 18v2M19 18v2"/>',
    Chairs: '<path d="M7 3h10v8H7z"/><path d="M5 11h14v3H5z"/><path d="M6 14l-1 7M18 14l1 7M9 14v4M15 14v4"/>',
    Tables: '<path d="M3 8h18v3H3z"/><path d="M5 11v9M19 11v9M8 11v5M16 11v5"/>',
    Beds: '<path d="M3 20V6"/><path d="M3 12h18v8"/><path d="M3 16h18"/><path d="M6 12V9a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/>',
    Storage: '<rect x="4" y="3" width="16" height="17" rx="1"/><path d="M12 3v17M4 11h16"/><path d="M10 7h0M14 7h0M10 15h0M14 15h0"/><path d="M6 20v1.5M18 20v1.5"/>',
    Lighting: '<path d="M12 2v5"/><path d="M6 13a6 6 0 0 1 12 0z"/><path d="M10 16a2 2 0 0 0 4 0"/>'
  };
  function glyph(cat) {
    return '<svg class="glyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (G[cat] || G.Sofas) + '</svg>';
  }
  function well(l, cls, photoIndex) {
    var p = l && l.photos && l.photos[photoIndex || 0];
    var inner = p ? '<img src="' + esc(p) + '" alt="">' : glyph(l && l.cat);
    return '<span class="well ' + (cls || '') + (l && l.sold ? ' sold' : '') + '">' + inner + '</span>';
  }

  /* ---------- product card ---------- */
  function productCard(l, opts) {
    opts = opts || {};
    var href = 'product.html?id=' + encodeURIComponent(l.id);
    var saved = isSaved(l.id);
    var badge = '';
    if (l.sold) badge = '<span class="label tag tag-plain badge">Sold</span>';
    else if (opts.showDrop && l.wasPrice) badge = '<span class="label tag tag-oak badge">Price dropped</span>';
    else if (l.verified && !opts.noVerified) badge = '<span class="label tag tag-oak badge">Verified</span>';
    var meta = opts.meta ? opts.meta(l) : [l.area, l.cond, ago(l.ageHours)].join(' · ');
    var heart = opts.noHeart ? '' :
      '<button type="button" class="heart" data-save="' + esc(l.id) + '" aria-pressed="' + saved + '" aria-label="' + (saved ? 'Remove ' : 'Save ') + esc(l.name) + (saved ? ' from saved' : '') + '">' + icon('heart') + '</button>';
    return '<article class="card pcard">' +
      '<div class="media"><a href="' + href + '" aria-label="' + esc(l.name) + '" tabindex="-1">' + well(l) + '</a>' + badge + heart + '</div>' +
      '<div class="body"><a class="name" href="' + href + '">' + esc(l.name) + '</a>' +
      '<span class="price"' + (l.sold ? ' style="color:var(--muted);text-decoration:line-through"' : '') + '>' + money(l.price) + '</span>' +
      '<span class="meta">' + esc(meta) + '</span></div></article>';
  }

  /* ---------- toast ---------- */
  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  /* ---------- header ---------- */
  function logo(cls) {
    return '<a href="index.html" class="logo ' + (cls || '') + '" aria-label="ReFurnish home"><span class="arch" aria-hidden="true"></span><span><span class="re">Re</span>Furnish</span></a>';
  }
  function renderHeader(page) {
    var loc = store.get('location', { city: 'Dhaka', area: 'Gulshan' });
    var u = user();
    var q = page === 'shop' ? (param('q') || '') : '';
    var cur = function (p) { return page === p ? ' aria-current="page"' : ''; };
    var unread = unreadCount();
    var areaChips = D.AREAS.slice(0, 6).map(function (a) {
      return '<button type="button" class="chip chip-sm" data-area="' + a + '" aria-pressed="' + (loc.area === a) + '">' + a + '</button>';
    }).join('');
    var cityOpts = D.CITIES.map(function (c) { return '<option' + (loc.city === c ? ' selected' : '') + '>' + c + '</option>'; }).join('');
    var account = u ?
      '<span style="font-size:18px;line-height:24px;font-weight:700">Hi, ' + esc(firstName(u.name)) + '</span>' +
      '<span class="small muted">' + esc(u.phone ? '+880 ' + u.phone : (u.email || 'Signed in')) + '</span>' +
      '<nav aria-label="Account" style="display:flex;flex-direction:column;border-top:1px solid var(--line);padding-top:8px;margin-top:4px">' +
      '<a class="navlink" href="my-listings.html" style="padding:0 8px">My listings</a>' +
      '<a class="navlink" href="profile.html?seller=me" style="padding:0 8px">Public profile</a>' +
      '<a class="navlink" href="saved.html" style="padding:0 8px">Saved</a>' +
      '<a class="navlink" href="#" style="padding:0 8px">Help center</a>' +
      '<button type="button" class="navlink" data-signout style="padding:0 8px;border:0;background:transparent;cursor:pointer;text-align:left">Sign out</button></nav>'
      :
      '<span style="font-size:18px;line-height:24px;font-weight:700">Welcome to ReFurnish</span>' +
      '<span class="small muted">Sign up free to save pieces, message sellers and list your own furniture.</span>' +
      '<a class="btn btn-primary btn-block" href="signup.html">Sign up</a>' +
      '<a class="btn btn-secondary btn-block" href="signin.html">Sign in</a>' +
      '<nav aria-label="Account" style="display:flex;flex-direction:column;border-top:1px solid var(--line);padding-top:8px;margin-top:4px">' +
      '<a class="navlink" href="my-listings.html" style="padding:0 8px">My listings</a>' +
      '<a class="navlink" href="profile.html?seller=me" style="padding:0 8px">Public profile</a>' +
      '<a class="navlink" href="#" style="padding:0 8px">Help center</a></nav>';
    var avatar = u ? '<span class="avatar-dot" aria-hidden="true">' + esc(firstName(u.name).charAt(0).toUpperCase()) + '</span>' : '<span class="avatar-dot" aria-hidden="true">' + icon('user', 16) + '</span>';

    var html =
      '<header class="site-header"><div class="container bar">' + logo() +
      '<details class="popover-wrap hide-sm" data-popover>' +
        '<summary class="loc-btn" aria-label="Change location">' +
          '<span style="color:var(--oak-deep);display:flex">' + icon('pin', 18) + '</span>' +
          '<span class="stack"><span style="font-size:11px;color:var(--muted)">Your location</span><span style="font-size:14px;font-weight:600;white-space:nowrap" data-loc-label>' + esc(loc.area + ', ' + loc.city) + '</span></span>' +
          '<span style="color:var(--muted);display:flex">' + icon('down', 16) + '</span>' +
        '</summary>' +
        '<div class="popover left">' +
          '<span style="font-size:16px;font-weight:700">Choose your location</span>' +
          '<button type="button" class="btn btn-secondary btn-block btn-sm" data-geo>' + icon('target', 18) + 'Use my current location</button>' +
          '<label style="display:flex;flex-direction:column;gap:6px;font-size:13px;font-weight:600">City<select class="field" style="height:44px;font-size:15px" data-city>' + cityOpts + '</select></label>' +
          '<div role="group" aria-label="Area" style="display:flex;flex-wrap:wrap;gap:6px">' + areaChips + '</div>' +
          '<span style="font-size:13px;line-height:18px;color:var(--muted)">We show pieces you can pick up nearby first.</span>' +
        '</div>' +
      '</details>' +
      '<form role="search" class="search" action="shop.html">' +
        '<span style="color:var(--muted);display:flex">' + icon('search') + '</span>' +
        '<label for="site-q" class="sr-only">Search furniture</label>' +
        '<input id="site-q" name="q" type="search" placeholder="Search sofas, beds, tables…" value="' + esc(q) + '">' +
      '</form>' +
      '<nav class="main-nav hide-sm" aria-label="Main">' +
        '<a class="navlink" href="shop.html"' + cur('shop') + '>' + icon('grid') + 'Shop</a>' +
        '<a class="navlink" href="messages.html"' + cur('messages') + '>' + icon('chat') + 'Messages' + (unread ? '<span class="badge-count" aria-label="' + unread + ' unread">' + unread + '</span>' : '') + '</a>' +
        '<a class="navlink" href="saved.html"' + cur('saved') + '>' + icon('heart') + 'Saved</a>' +
        '<details class="popover-wrap" data-popover><summary class="navlink"' + (page === 'account' ? ' aria-current="page"' : '') + ' style="cursor:pointer">' + avatar + (u ? esc(firstName(u.name)) : 'Profile') + '</summary>' +
          '<div class="popover right" style="padding:20px">' + account + '</div></details>' +
      '</nav>' +
      '<a class="btn btn-clay hide-sm" href="sell.html" style="height:44px">Sell</a>' +
      '</div></header>';

    var tab = function (p, href, ic, label, extra) {
      return '<a href="' + href + '"' + cur(p) + (extra || '') + '>' + icon(ic, 22) + label + '</a>';
    };
    var tabbar = '<nav class="tabbar" aria-label="Mobile">' +
      tab('home', 'index.html', 'home', 'Home') +
      tab('shop', 'shop.html', 'grid', 'Shop') +
      tab('sell', 'sell.html', 'plus', 'Sell', ' class="sell"') +
      tab('messages', 'messages.html', 'chat', 'Messages') +
      tab('account', u ? 'my-listings.html' : 'signin.html', 'user', u ? 'Account' : 'Sign in') +
      '</nav>';

    var mount = document.getElementById('site-header');
    if (mount) {
      mount.outerHTML = html;
      document.body.insertAdjacentHTML('beforeend', tabbar);
      document.body.classList.add('has-tabbar');
    }
    bindHeader();
  }

  function bindHeader() {
    // Close other popovers when one opens; close on outside click / Escape.
    $all('[data-popover]').forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (d.open) $all('[data-popover]').forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
    document.addEventListener('click', function (e) {
      $all('[data-popover][open]').forEach(function (d) { if (!d.contains(e.target)) d.open = false; });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') $all('[data-popover][open]').forEach(function (d) { d.open = false; d.querySelector('summary').focus(); });
    });

    var setLoc = function (patch) {
      var loc = Object.assign(store.get('location', {}), patch);
      store.set('location', loc);
      var lab = $('[data-loc-label]');
      if (lab) lab.textContent = loc.area + ', ' + loc.city;
      $all('[data-area]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-area') === loc.area)); });
      document.dispatchEvent(new CustomEvent('rf:location', { detail: loc }));
    };
    $all('[data-area]').forEach(function (b) {
      b.addEventListener('click', function () { setLoc({ area: b.getAttribute('data-area') }); });
    });
    var city = $('[data-city]');
    if (city) city.addEventListener('change', function () { setLoc({ city: city.value }); });
    var geo = $('[data-geo]');
    if (geo) geo.addEventListener('click', function () {
      if (!navigator.geolocation) { toast('Location is not available in this browser'); return; }
      geo.textContent = 'Finding you…';
      navigator.geolocation.getCurrentPosition(function () {
        setLoc({ area: 'Near you' });
        geo.innerHTML = icon('target', 18) + 'Use my current location';
        toast('Showing pieces near your current location');
      }, function () {
        geo.innerHTML = icon('target', 18) + 'Use my current location';
        toast('We couldn’t get your location. Pick an area instead.');
      });
    });
    var so = $('[data-signout]');
    if (so) so.addEventListener('click', function () { signOut(); location.href = 'index.html'; });
  }

  /* ---------- footer ---------- */
  function renderFooter(kind) {
    var mount = document.getElementById('site-footer');
    if (!mount) return;
    if (kind === 'full') {
      mount.outerHTML = '<footer class="site-footer"><div class="container inner">' +
        '<div style="display:flex;flex-direction:column;gap:8px;max-width:280px">' + logo('logo-sm') +
        '<span class="small muted">Give good furniture a second home.</span></div>' +
        '<div class="cols">' +
        '<nav aria-label="Marketplace"><span class="label muted">Marketplace</span><a href="shop.html">Shop</a><a href="sell.html">Sell</a><a href="saved.html">Saved</a></nav>' +
        '<nav aria-label="Account links"><span class="label muted">Account</span><a href="signin.html">Sign in</a><a href="signup.html">Create account</a><a href="my-listings.html">My listings</a></nav>' +
        '<nav aria-label="Help"><span class="label muted">Help</span><a href="#">Safety tips</a><a href="#">Help center</a><a href="#" lang="bn">বাংলা</a></nav>' +
        '</div></div></footer>';
    } else {
      mount.outerHTML = '<footer class="site-footer compact"><div class="container inner">' + logo('logo-sm') +
        '<span><a href="#">Safety tips</a> · <a href="#">Help center</a> · <a href="#" lang="bn">বাংলা</a></span></div></footer>';
    }
  }

  /* ---------- global save-heart handling ---------- */
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-save]');
    if (!b) return;
    e.preventDefault();
    var id = b.getAttribute('data-save');
    var l = getListing(id);
    var nowSaved = toggleSaved(id);
    $all('[data-save="' + id + '"]').forEach(function (x) {
      x.setAttribute('aria-pressed', String(nowSaved));
      if (x.classList.contains('heart')) x.setAttribute('aria-label', (nowSaved ? 'Remove ' : 'Save ') + (l ? l.name : 'item') + (nowSaved ? ' from saved' : ''));
    });
    toast(nowSaved ? 'Saved. We’ll tell you if the price drops.' : 'Removed from saved');
    document.dispatchEvent(new CustomEvent('rf:saved', { detail: { id: id, saved: nowSaved } }));
  });

  /* Resize an uploaded photo so it fits in browser storage. */
  function shrinkImage(file, maxSide) {
    maxSide = maxSide || 900;
    return new Promise(function (resolve, reject) {
      var r = new FileReader();
      r.onerror = reject;
      r.onload = function () {
        var img = new Image();
        img.onerror = reject;
        img.onload = function () {
          var s = Math.min(1, maxSide / Math.max(img.width, img.height));
          var c = document.createElement('canvas');
          c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
          c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
          resolve(c.toDataURL('image/jpeg', 0.72));
        };
        img.src = r.result;
      };
      r.readAsDataURL(file);
    });
  }

  function init(page, footer) {
    renderHeader(page);
    if (footer) renderFooter(footer);
  }

  return {
    D: D, esc: esc, money: money, ago: ago, agoLong: agoLong, param: param, $: $, $all: $all, now: now,
    store: store, user: user, signIn: signIn, signOut: signOut, firstName: firstName,
    myListings: myListings, saveMyListings: saveMyListings, seller: seller, allListings: allListings, getListing: getListing,
    savedIds: savedIds, isSaved: isSaved, toggleSaved: toggleSaved,
    threads: threads, saveThreads: saveThreads,
    icon: icon, glyph: glyph, well: well, productCard: productCard, logo: logo, toast: toast,
    shrinkImage: shrinkImage, init: init
  };
})();
