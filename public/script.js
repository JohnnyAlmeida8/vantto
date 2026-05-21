const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

function closeMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

// Scroll animations
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.stat-item, .produto-card, .dif-card, .exp-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  obs.observe(el);
});

// ── MODAIS DE PRODUTO ──
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.produto-modal-overlay.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

// ── LGPD ──
const lgpdBanner   = document.getElementById('lgpdBanner');
const lgpdAccept   = document.getElementById('lgpdAccept');
const lgpdReject   = document.getElementById('lgpdReject');
const openPrivacy  = document.getElementById('openPrivacy');
const closePrivacy = document.getElementById('closePrivacy');
const privacyOverlay = document.getElementById('privacyOverlay');

// Mostrar banner se ainda não decidiu
if (!localStorage.getItem('lgpd_consent')) {
  setTimeout(() => lgpdBanner.classList.add('visible'), 800);
}

function hideBanner() {
  lgpdBanner.classList.remove('visible');
}

lgpdAccept.addEventListener('click', () => {
  localStorage.setItem('lgpd_consent', 'accepted');
  hideBanner();
});

lgpdReject.addEventListener('click', () => {
  localStorage.setItem('lgpd_consent', 'essential');
  hideBanner();
});

openPrivacy.addEventListener('click', (e) => {
  e.preventDefault();
  privacyOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closePrivacy.addEventListener('click', () => {
  privacyOverlay.classList.remove('open');
  document.body.style.overflow = '';
});

privacyOverlay.addEventListener('click', (e) => {
  if (e.target === privacyOverlay) {
    privacyOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
});