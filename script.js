// ── Loading screen ────────────────────────────────────────
const loadingScreen = document.getElementById('loading-screen');
if (loadingScreen) {
  window.addEventListener('load', () => {
    loadingScreen.classList.add('hidden');
    setTimeout(() => { loadingScreen.style.display = 'none'; }, 450);
  });
  // Fallback: hide after 3s even if load event is slow
  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => { loadingScreen.style.display = 'none'; }, 450);
    }
  }, 3000);
}

// ── Email copy to clipboard ───────────────────────────────
document.querySelectorAll('.email-copy').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'anupambhowmick123@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const wrapper = link.closest('.email-tooltip-wrapper');
      const tooltip = wrapper ? wrapper.querySelector('.email-tooltip') : null;
      if (!tooltip) return;
      const original = tooltip.textContent;
      tooltip.textContent = 'Email copied!';
      tooltip.style.opacity = '1';
      setTimeout(() => {
        tooltip.textContent = original;
        tooltip.style.opacity = '';
      }, 1800);
    });
  });
});

// ── Theme toggle ──────────────────────────────────────────
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

// ── Resume modal ──────────────────────────────────────────
const resumeModal  = document.getElementById('resume-modal');
const resumeTrigger = document.getElementById('resume-trigger');
const resumeClose  = document.getElementById('resume-modal-close');

const RESUME_PDF = '/resume/Anupam_Bhowmick_Senior_Product_Designer.pdf';

function isMobileViewport() {
  return window.matchMedia('(max-width: 768px)').matches;
}

function openResume() {
  // Mobile browsers don't render PDFs inside iframes (iOS Safari shows only
  // page 1, Android Chrome shows a download stub). Skip the modal and open the
  // PDF directly — the OS PDF viewer handles scroll, zoom, share, and save.
  if (isMobileViewport()) {
    window.open(RESUME_PDF, '_blank', 'noopener');
    return;
  }
  if (!resumeModal) return;
  resumeModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeResume() {
  if (!resumeModal) return;
  resumeModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (resumeTrigger) resumeTrigger.addEventListener('click', openResume);
if (resumeClose)   resumeClose.addEventListener('click', closeResume);
if (resumeModal) {
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });
}

// Force a real download (iOS Safari ignores `download` for files it can render inline).
// Trick: re-wrap the PDF as application/octet-stream so Safari treats it as a download.
async function forceDownload(e) {
  const a = e.currentTarget;
  const href = a.getAttribute('href');
  const filename = a.getAttribute('download') || 'download.pdf';
  if (!href || !href.toLowerCase().endsWith('.pdf')) return;
  e.preventDefault();
  try {
    const res = await fetch(href, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('fetch failed');
    const raw = await res.blob();
    const blob = new Blob([raw], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const tmp = document.createElement('a');
    tmp.href = url;
    tmp.download = filename;
    tmp.rel = 'noopener';
    document.body.appendChild(tmp);
    tmp.click();
    document.body.removeChild(tmp);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch (_) {
    window.location.href = href;
  }
}
document.querySelectorAll('a[download][href$=".pdf"]').forEach(a => {
  a.addEventListener('click', forceDownload);
});

// ── Lightbox ──────────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { if (lightboxImg) lightboxImg.src = ''; }, 200);
}

// Wire up any real <img> tags inside placeholders
document.querySelectorAll('.project-img-placeholder[data-lightbox]').forEach(el => {
  const img = el.querySelector('img');
  if (img) {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => openLightbox(img.src, img.alt));
  }
});

// Wire up old-style .project-img divs on work.html
document.querySelectorAll('.project-img[data-lightbox-src]').forEach(el => {
  el.addEventListener('click', () => {
    openLightbox(el.dataset.lightboxSrc, el.dataset.lightboxAlt || '');
  });
});

// Wire ALL images inside case study pages to the lightbox
document.querySelectorAll('.project-main img[src]').forEach(img => {
  if (!img.src || img.src === window.location.href) return;
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    e.stopPropagation();
    openLightbox(img.src, img.alt || '');
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
  });
}

// ── Keyboard: Escape closes any open overlay ──────────────
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  closeLightbox();
  closeResume();
});

// ── Work page tabs (only if present) ─────────────────────
const tabBtns = document.querySelectorAll('.tab-btn');
const tabBarSticky = document.querySelector('.tab-bar-sticky');
if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      const section = document.getElementById('project-' + target);
      if (!section) return;

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const stickyHeight = tabBarSticky ? tabBarSticky.offsetHeight : 0;
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 44;
      window.scrollTo({ top: section.offsetTop - stickyHeight - navHeight - 16, behavior: 'smooth' });
    });
  });

  const projectSections = document.querySelectorAll('.project-entry[id]');
  if (projectSections.length > 0) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id.replace('project-', '');
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        const match = document.querySelector(`.tab-btn[data-tab="${id}"]`);
        if (match) {
          match.classList.add('active');
          match.setAttribute('aria-selected', 'true');
        }
      });
    }, { rootMargin: '0px 0px -70% 0px', threshold: 0 });

    projectSections.forEach(s => io.observe(s));
  }
}
