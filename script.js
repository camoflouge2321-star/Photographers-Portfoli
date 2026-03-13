/* ============================================================
   SCRIPT.JS – Photographer Portfolio Interactive Features
   ============================================================ */

(function () {
  'use strict';

  /* ── Gallery Data ── */
  const galleryData = [
    { src: 'gallery_01.png', caption: 'Golden Hour Ceremony', category: 'wedding' },
    { src: 'gallery_02.png', caption: 'Editorial Fashion',     category: 'portrait' },
    { src: 'gallery_03.png', caption: 'Mountain Reflection',   category: 'landscape' },
    { src: 'gallery_04.png', caption: 'Midnight Rain',         category: 'street' },
    { src: 'gallery_05.png', caption: 'Gala Dinner',           category: 'wedding' },
    { src: 'gallery_06.png', caption: 'Morning Dew',           category: 'portrait' },
  ];

  let currentIndex = 0;

  /* ──────────────────────────────────────────
     1. NAVBAR – scroll effect + mobile toggle
  ────────────────────────────────────────── */
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '';
    spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ──────────────────────────────────────────
     2. SCROLL-REVEAL ANIMATION
  ────────────────────────────────────────── */
  const aosEls = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  aosEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    aosObserver.observe(el);
  });

  /* ──────────────────────────────────────────
     3. GALLERY FILTER
  ────────────────────────────────────────── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  /* ──────────────────────────────────────────
     4. LIGHTBOX
  ────────────────────────────────────────── */
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const lightboxCap  = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryData[index].src;
    lightboxImg.alt = galleryData[index].caption;
    lightboxCap.textContent = galleryData[index].caption;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 400);
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + galleryData.length) % galleryData.length;
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = `translateX(${dir > 0 ? '-30px' : '30px'})`;
    setTimeout(() => {
      lightboxImg.src = galleryData[currentIndex].src;
      lightboxImg.alt = galleryData[currentIndex].caption;
      lightboxCap.textContent = galleryData[currentIndex].caption;
      lightboxImg.style.opacity = '1';
      lightboxImg.style.transform = 'translateX(0)';
    }, 200);
  }

  lightboxImg.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

  // Open on item click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(parseInt(item.dataset.index, 10));
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lightboxPrev.addEventListener('click', e => { e.stopPropagation(); navigate(-1); });
  lightboxNext.addEventListener('click', e => { e.stopPropagation(); navigate(1); });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) navigate(dx < 0 ? 1 : -1);
  });

  /* ──────────────────────────────────────────
     5. CONTACT FORM
  ────────────────────────────────────────── */
  const contactForm  = document.getElementById('contactForm');
  const formSuccess  = document.getElementById('formSuccess');
  const submitBtn    = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending…';

    // Simulate async send
    setTimeout(() => {
      contactForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      formSuccess.style.display = 'block';
      submitBtn.querySelector('span').textContent = 'Send Message';
      submitBtn.disabled = false;

      setTimeout(() => { formSuccess.style.display = 'none'; }, 6000);
    }, 1500);
  });

  /* ──────────────────────────────────────────
     6. BACK TO TOP
  ────────────────────────────────────────── */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ──────────────────────────────────────────
     7. HERO PARALLAX
  ────────────────────────────────────────── */
  const heroBg = document.getElementById('heroBgImg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `scale(1.08) translateY(${y * 0.18}px)`;
      }
    }, { passive: true });
  }

  /* ──────────────────────────────────────────
     8. ANIMATED COUNTER (Stats)
  ────────────────────────────────────────── */
  const statNums = document.querySelectorAll('.stat-num');
  const parseTarget = str => parseInt(str.replace(/[^0-9]/g, ''), 10);

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseTarget(el.textContent);
      const suffix = el.textContent.replace(/[0-9]/g, '');
      let current  = 0;
      const dur    = 1200;
      const step   = dur / 60;
      const inc    = target / (dur / step);

      const tick = () => {
        current = Math.min(current + inc, target);
        el.textContent = Math.floor(current) + suffix;
        if (current < target) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => countObserver.observe(el));

})();
