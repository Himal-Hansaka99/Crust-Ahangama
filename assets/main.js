/* =========================================================
   CRUST AHANGAMA — MAIN JS
   ========================================================= */

/* ---------- Nav: scroll-sticky ---------- */
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile Drawer ---------- */
const drawer   = document.querySelector('.mobile-drawer');
const burgerBtn = document.querySelector('.nav-burger');
const closeBtn  = document.querySelector('.mobile-drawer-close');

function openDrawer()  { drawer?.classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeDrawer() { drawer?.classList.remove('open'); document.body.style.overflow = ''; }

burgerBtn?.addEventListener('click', openDrawer);
closeBtn?.addEventListener('click', closeDrawer);
drawer?.addEventListener('click', e => { if (e.target === drawer) closeDrawer(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => observer.observe(el));
}

/* ---------- Masonry Lightbox ---------- */
const masonry = document.querySelector('.masonry');
if (masonry) {
  masonry.addEventListener('click', e => {
    const fig = e.target.closest('figure');
    if (!fig) return;
    const img = fig.querySelector('img');
    if (!img) return;
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    const lbImg = document.createElement('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lb.appendChild(lbImg);
    lb.addEventListener('click', () => lb.remove());
    document.addEventListener('keydown', function handler(e) {
      if (e.key === 'Escape') { lb.remove(); document.removeEventListener('keydown', handler); }
    });
    document.body.appendChild(lb);
  });
}

/* ---------- Tabs ---------- */
document.querySelectorAll('.tabs').forEach(tabGroup => {
  tabGroup.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const target = btn.dataset.tab;
    const panel = document.getElementById(target);
    if (!panel) return;
    panel.closest('.tab-panels')?.querySelectorAll('[data-panel]').forEach(p => p.hidden = true);
    panel.hidden = false;
  });
});

/* ---------- Chip / Filter ---------- */
document.querySelectorAll('[data-filter-group]').forEach(group => {
  group.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    const container = document.querySelector(group.dataset.filterTarget);
    if (!container) return;
    container.querySelectorAll('[data-category]').forEach(item => {
      item.style.display = (!filter || filter === 'all' || item.dataset.category === filter) ? '' : 'none';
    });
  });
});

/* ---------- Quantity Controls (cart) ---------- */
document.querySelectorAll('.qty-control').forEach(ctrl => {
  const display = ctrl.querySelector('.qty-value');
  ctrl.querySelector('[data-minus]')?.addEventListener('click', () => {
    const v = parseInt(display.textContent, 10);
    if (v > 1) display.textContent = v - 1;
    updateCartTotals();
  });
  ctrl.querySelector('[data-plus]')?.addEventListener('click', () => {
    display.textContent = parseInt(display.textContent, 10) + 1;
    updateCartTotals();
  });
});

function updateCartTotals() {
  // Placeholder — extend for real cart logic
  document.querySelectorAll('.cart-item').forEach(item => {
    const qty   = parseInt(item.querySelector('.qty-value')?.textContent || '1', 10);
    const price = parseFloat(item.dataset.price || '0');
    const lineEl = item.querySelector('[data-line-total]');
    if (lineEl) lineEl.textContent = 'LKR ' + (qty * price).toLocaleString();
  });
}

/* ---------- Table slot selection (reservations) ---------- */
document.querySelectorAll('.table-slot.available').forEach(slot => {
  slot.addEventListener('click', () => {
    document.querySelectorAll('.table-slot').forEach(s => s.classList.remove('selected'));
    slot.classList.add('selected');
    const timeInput = document.getElementById('selected-time');
    if (timeInput) timeInput.value = slot.textContent.trim();
  });
});

/* ---------- Active nav link ---------- */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-drawer a').forEach(link => {
  const href = link.getAttribute('href');
  link.classList.toggle('active', href === currentPage);
});
