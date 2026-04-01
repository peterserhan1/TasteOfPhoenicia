/**
 * Taste of Phoenicia - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {

  // ── Mobile menu toggle ──
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // ── Header scroll effect ──
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Product Gallery (card-level image switching) ──
  document.querySelectorAll('.product-card.has-gallery').forEach(card => {
    const imgs = card.querySelectorAll('.gallery-img');
    const dots = card.querySelectorAll('.gallery-dot');
    if (imgs.length < 2) return;

    function showSlide(index) {
      imgs.forEach((img, i) => img.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        showSlide(i);
      });
    });

    const prevBtn = card.querySelector('.gallery-arrow-prev');
    const nextBtn = card.querySelector('.gallery-arrow-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const current = Array.from(imgs).findIndex(img => img.classList.contains('active'));
        showSlide((current - 1 + imgs.length) % imgs.length);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const current = Array.from(imgs).findIndex(img => img.classList.contains('active'));
        showSlide((current + 1) % imgs.length);
      });
    }

    let startX = 0;
    const galleryMain = card.querySelector('.gallery-main');
    galleryMain.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    galleryMain.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 40) return;
      const current = Array.from(imgs).findIndex(img => img.classList.contains('active'));
      if (diff > 0 && current < imgs.length - 1) showSlide(current + 1);
      else if (diff < 0 && current > 0) showSlide(current - 1);
    }, { passive: true });
  });

  // ── Lightbox ──
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbCounter = lightbox.querySelector('.lightbox-counter');
  const lbThumbs = lightbox.querySelector('.lightbox-thumbnails');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');

  let lbImages = [];
  let lbIndex = 0;

  function openLightbox(images, startIndex) {
    lbImages = images;
    lbIndex = startIndex || 0;
    renderLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderLightbox() {
    lbImg.src = lbImages[lbIndex].src;
    lbImg.alt = lbImages[lbIndex].alt;
    lbCounter.textContent = (lbIndex + 1) + ' / ' + lbImages.length;

    lbPrev.style.display = lbImages.length > 1 ? '' : 'none';
    lbNext.style.display = lbImages.length > 1 ? '' : 'none';

    lbThumbs.innerHTML = '';
    if (lbImages.length > 1) {
      lbImages.forEach((img, i) => {
        const thumb = document.createElement('button');
        thumb.className = 'lightbox-thumb' + (i === lbIndex ? ' active' : '');
        thumb.style.backgroundImage = 'url(' + img.src + ')';
        thumb.setAttribute('aria-label', 'View image ' + (i + 1));
        thumb.addEventListener('click', () => { lbIndex = i; renderLightbox(); });
        lbThumbs.appendChild(thumb);
      });
    }
  }

  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-stage')) closeLightbox();
  });

  lbPrev.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    renderLightbox();
  });

  lbNext.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbImages.length;
    renderLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; renderLightbox(); }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; renderLightbox(); }
  });

  let lbStartX = 0;
  const lbStage = lightbox.querySelector('.lightbox-stage');
  lbStage.addEventListener('touchstart', (e) => { lbStartX = e.touches[0].clientX; }, { passive: true });
  lbStage.addEventListener('touchend', (e) => {
    const diff = lbStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 50) return;
    if (diff > 0) { lbIndex = (lbIndex + 1) % lbImages.length; }
    else { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; }
    renderLightbox();
  }, { passive: true });

  // Attach click handlers to gallery images and expand buttons
  document.querySelectorAll('.gallery-main').forEach(main => {
    const imgs = main.querySelectorAll('.gallery-img');
    const imgData = Array.from(imgs).map(img => ({ src: img.src, alt: img.alt }));
    if (imgData.length === 0) return;

    main.addEventListener('click', (e) => {
      if (e.target.closest('.gallery-dot')) return;
      const activeIndex = Array.from(imgs).findIndex(img => img.classList.contains('active'));
      openLightbox(imgData, Math.max(0, activeIndex));
    });

    main.style.cursor = 'pointer';
  });
});
