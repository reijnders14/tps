/* ============================================================
   CAFFÈ RARO — Design System
   Palette: crema, caffè, terracotta, verde salvia
   Font: Playfair Display (titoli) + DM Sans (corpo)
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ---------- Variabili ---------- */
:root {
  --crema:       #f5f0e8;
  --crema-scura: #ede5d4;
  --caffe:       #2c1a0e;
  --caffe-medio: #5c3520;
  --caffe-chiaro:#9b6b45;
  --terracotta:  #c0663a;
  --terracotta-light: #e8896a;
  --salvia:      #6b8068;
  --salvia-light:#a8bda4;
  --bianco:      #fdfaf5;
  --testo:       #1e1209;
  --testo-light: #7a5c40;
  --bordo:       #ddd0bc;

  --raggio:      12px;
  --raggio-lg:   20px;
  --ombra:       0 4px 24px rgba(44,26,14,0.10);
  --ombra-hover: 0 8px 40px rgba(44,26,14,0.18);
  --transition:  0.25s cubic-bezier(0.4,0,0.2,1);
}

/* ---------- Reset ---------- */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'DM Sans', sans-serif;
  background: var(--crema);
  color: var(--testo);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  line-height: 1.6;
}
img { display: block; max-width: 100%; }
a { color: inherit; text-decoration: none; }
button { cursor: pointer; font-family: inherit; }

/* ---------- Texture di sfondo ---------- */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(192,102,58,0.04) 0%, transparent 60%),
    radial-gradient(circle at 80% 20%, rgba(107,128,104,0.05) 0%, transparent 50%);
  pointer-events: none;
  z-index: 0;
}
header, main, footer { position: relative; z-index: 1; }

/* ---------- Header ---------- */
.site-header {
  background: var(--caffe);
  color: var(--crema);
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 20px rgba(0,0,0,0.3);
}
.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  gap: 1.5rem;
}
.logo-area { display: flex; flex-direction: column; line-height: 1.1; }
.logo-nome {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--crema);
  letter-spacing: -0.02em;
}
.logo-categoria {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--caffe-chiaro);
}
.header-nav { display: flex; gap: 0.25rem; align-items: center; }
.nav-link {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--crema-scura);
  transition: background var(--transition), color var(--transition);
  letter-spacing: 0.02em;
}
.nav-link:hover, .nav-link.attivo {
  background: rgba(255,255,255,0.10);
  color: #fff;
}
.btn-carrello {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--terracotta);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1.1rem;
  font-size: 0.88rem;
  font-weight: 600;
  transition: background var(--transition), transform var(--transition);
  position: relative;
}
.btn-carrello:hover { background: var(--terracotta-light); transform: translateY(-1px); }
.carrello-badge {
  background: var(--crema);
  color: var(--terracotta);
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* ---------- Footer ---------- */
.site-footer {
  background: var(--caffe);
  color: var(--caffe-chiaro);
  text-align: center;
  padding: 2rem;
  font-size: 0.82rem;
  margin-top: auto;
  letter-spacing: 0.03em;
}
.site-footer strong { color: var(--crema-scura); }

/* ---------- Pulsanti generici ---------- */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.6rem;
  border-radius: var(--raggio);
  font-size: 0.9rem;
  font-weight: 600;
  border: none;
  transition: all var(--transition);
  letter-spacing: 0.02em;
  white-space: nowrap;
}
.btn-primary {
  background: var(--terracotta);
  color: #fff;
}
.btn-primary:hover { background: var(--terracotta-light); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(192,102,58,0.35); }

.btn-secondary {
  background: transparent;
  color: var(--caffe-medio);
  border: 2px solid var(--bordo);
}
.btn-secondary:hover { border-color: var(--caffe-chiaro); background: var(--crema-scura); }

.btn-ghost {
  background: transparent;
  color: var(--testo-light);
  border: none;
  padding: 0.5rem 0.8rem;
}
.btn-ghost:hover { color: var(--terracotta); }

.btn-danger {
  background: #c0392b;
  color: #fff;
  font-size: 0.82rem;
  padding: 0.45rem 1rem;
}
.btn-danger:hover { background: #e74c3c; }

/* ---------- Toast Notifiche ---------- */
#toast-container {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  align-items: center;
  pointer-events: none;
}
.toast {
  background: var(--caffe);
  color: var(--crema);
  padding: 0.75rem 1.5rem;
  border-radius: 40px;
  font-size: 0.88rem;
  font-weight: 500;
  box-shadow: 0 8px 30px rgba(0,0,0,0.25);
  border-left: 3px solid var(--terracotta);
  animation: toastIn 0.3s ease, toastOut 0.3s ease 1.7s forwards;
  pointer-events: auto;
  letter-spacing: 0.02em;
}
.toast.verde { border-left-color: var(--salvia); }
.toast.rosso { border-left-color: #c0392b; }

@keyframes toastIn {
  from { opacity: 0; transform: translateY(16px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toastOut {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(-8px) scale(0.95); }
}

/* ---------- Pagina iniziale (ini.html) ---------- */
.ini-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background:
    radial-gradient(circle at 30% 40%, rgba(192,102,58,0.12) 0%, transparent 55%),
    radial-gradient(circle at 75% 70%, rgba(107,128,104,0.10) 0%, transparent 50%),
    var(--crema);
}
.ini-card {
  background: var(--bianco);
  border-radius: var(--raggio-lg);
  box-shadow: var(--ombra-hover);
  padding: 3rem 3.5rem;
  max-width: 460px;
  width: 100%;
  border: 1px solid var(--bordo);
}
.ini-logo {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: var(--caffe);
  margin-bottom: 0.3rem;
  letter-spacing: -0.03em;
}
.ini-logo em { color: var(--terracotta); font-style: italic; }
.ini-subtitle {
  font-size: 0.82rem;
  color: var(--testo-light);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
}
.form-group { margin-bottom: 1.4rem; }
.form-label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--testo-light);
  margin-bottom: 0.5rem;
}
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--bordo);
  border-radius: var(--raggio);
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--testo);
  background: var(--crema);
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
}
.form-input:focus {
  border-color: var(--terracotta);
  box-shadow: 0 0 0 3px rgba(192,102,58,0.12);
  background: var(--bianco);
}
.ini-submit {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.9rem;
  font-size: 1rem;
  justify-content: center;
}

/* ---------- Catalogo (index.html) ---------- */
.catalogo-hero {
  background: linear-gradient(135deg, var(--caffe) 0%, var(--caffe-medio) 100%);
  color: var(--crema);
  padding: 4rem 2rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.catalogo-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -20%;
  width: 60%;
  height: 200%;
  background: radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 70%);
  pointer-events: none;
}
.hero-titolo {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
  letter-spacing: -0.03em;
}
.hero-sub {
  font-size: 1rem;
  color: var(--caffe-chiaro);
  font-weight: 300;
  letter-spacing: 0.05em;
}
.filtri-bar {
  background: var(--bianco);
  border-bottom: 1px solid var(--bordo);
  padding: 1rem 2rem;
  position: sticky;
  top: 72px;
  z-index: 50;
}
.filtri-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.filtro-search {
  flex: 1;
  min-width: 200px;
  padding: 0.55rem 1rem;
  border: 2px solid var(--bordo);
  border-radius: 40px;
  font-family: inherit;
  font-size: 0.88rem;
  outline: none;
  background: var(--crema);
  transition: border-color var(--transition);
}
.filtro-search:focus { border-color: var(--terracotta); }
.filtro-label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--testo-light);
  white-space: nowrap;
}
.filtro-sort {
  padding: 0.55rem 1rem;
  border: 2px solid var(--bordo);
  border-radius: 40px;
  font-family: inherit;
  font-size: 0.88rem;
  background: var(--crema);
  color: var(--testo);
  outline: none;
  cursor: pointer;
}
.catalogo-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}
.prodotti-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
.card-prodotto {
  background: var(--bianco);
  border-radius: var(--raggio-lg);
  box-shadow: var(--ombra);
  overflow: hidden;
  transition: box-shadow var(--transition), transform var(--transition);
  border: 1px solid var(--bordo);
  display: flex;
  flex-direction: column;
}
.card-prodotto:hover {
  box-shadow: var(--ombra-hover);
  transform: translateY(-4px);
}
.card-img-wrap {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: var(--crema-scura);
  position: relative;
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.card-prodotto:hover .card-img-wrap img { transform: scale(1.04); }
.card-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: var(--caffe);
  color: var(--crema);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
}
.card-body {
  padding: 1.4rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.card-marca {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--salvia);
}
.card-nome {
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--caffe);
  line-height: 1.2;
}
.card-desc {
  font-size: 0.85rem;
  color: var(--testo-light);
  line-height: 1.5;
  flex: 1;
  margin-top: 0.2rem;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.4rem;
  border-top: 1px solid var(--bordo);
  background: var(--crema);
}
.card-prezzo {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--terracotta);
}
.card-prezzo sup {
  font-size: 0.75rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  vertical-align: super;
}
.msg-vuoto {
  text-align: center;
  padding: 5rem 2rem;
  color: var(--testo-light);
  font-size: 1.1rem;
}
.msg-vuoto span { display: block; font-size: 3rem; margin-bottom: 1rem; }

/* ---------- Dettaglio prodotto (prodotto.html) ---------- */
.dettaglio-main {
  max-width: 1000px;
  margin: 0 auto;
  padding: 3rem 2rem;
}
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.82rem;
  color: var(--testo-light);
  margin-bottom: 2rem;
}
.breadcrumb a:hover { color: var(--terracotta); }
.breadcrumb-sep { color: var(--bordo); }
.dettaglio-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}
.det-img-wrap {
  border-radius: var(--raggio-lg);
  overflow: hidden;
  background: var(--crema-scura);
  box-shadow: var(--ombra);
  aspect-ratio: 1;
}
.det-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.det-info { display: flex; flex-direction: column; gap: 1rem; }
.det-marca {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--salvia);
}
.det-nome {
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  line-height: 1.15;
  color: var(--caffe);
}
.det-prezzo {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: var(--terracotta);
  font-weight: 700;
}
.det-divider {
  height: 1px;
  background: var(--bordo);
  margin: 0.5rem 0;
}
.det-desc-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--testo-light);
  margin-bottom: 0.3rem;
}
.det-desc {
  font-size: 0.93rem;
  color: var(--testo);
  line-height: 1.7;
}
.det-azioni {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

/* ---------- Carrello (carrello.html) ---------- */
.carrello-main {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
}
.carrello-titolo {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: var(--caffe);
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--bordo);
}
.carrello-vuoto {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--testo-light);
}
.carrello-vuoto span { display: block; font-size: 3.5rem; margin-bottom: 1rem; }
.carrello-lista { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
.carrello-item {
  background: var(--bianco);
  border: 1px solid var(--bordo);
  border-radius: var(--raggio-lg);
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: var(--ombra);
  transition: transform var(--transition);
}
.carrello-item:hover { transform: translateX(3px); }
.carrello-item-img {
  width: 80px;
  height: 80px;
  border-radius: var(--raggio);
  object-fit: cover;
  background: var(--crema-scura);
  flex-shrink: 0;
}
.carrello-item-info { flex: 1; min-width: 0; }
.ci-nome {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  color: var(--caffe);
  margin-bottom: 0.2rem;
}
.ci-desc {
  font-size: 0.82rem;
  color: var(--testo-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ci-prezzo {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  color: var(--terracotta);
  font-weight: 700;
  white-space: nowrap;
}
.carrello-summary {
  background: var(--bianco);
  border: 1px solid var(--bordo);
  border-radius: var(--raggio-lg);
  padding: 2rem;
  box-shadow: var(--ombra);
}
.summary-riga {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: var(--testo-light);
  padding: 0.4rem 0;
}
.summary-totale {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 2px solid var(--bordo);
  margin-top: 1rem;
  padding-top: 1rem;
}
.summary-totale-label {
  font-weight: 600;
  font-size: 1rem;
  color: var(--caffe);
}
.summary-totale-val {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  color: var(--terracotta);
  font-weight: 700;
}
.carrello-azioni {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

/* ---------- Responsive ---------- */
@media (max-width: 768px) {
  .header-inner { height: 60px; }
  .logo-nome { font-size: 1.15rem; }
  .nav-link { display: none; }
  .ini-card { padding: 2rem 1.5rem; }
  .dettaglio-grid { grid-template-columns: 1fr; }
  .carrello-item { flex-wrap: wrap; }
  .carrello-item-img { width: 60px; height: 60px; }
  .carrello-azioni { justify-content: stretch; }
  .carrello-azioni .btn { flex: 1; justify-content: center; }
  .det-azioni .btn { flex: 1; justify-content: center; }
}
@media (max-width: 480px) {
  .prodotti-grid { grid-template-columns: 1fr; }
  .catalogo-main { padding: 1.5rem 1rem; }
}
