/* =========================================================
   J. R. P Islamic Dawat Committee — Gallery Page Logic
   Renders grid, handles category filter, and runs accessible
   lightbox with prev/next/close + keyboard controls.
   ========================================================= */

(function () {
    'use strict';

    const U = window.JRPUtils;
    const grid = document.getElementById('galleryGrid');
    const filterBar = document.getElementById('galleryFilters');

    if (!grid) return;

    /* ---------- Category labels ---------- */
    const CATEGORY_LABELS = {
        programs:  'Islamic Programs',
        youth:     'Youth Events',
        quiz:      'Quiz Competitions',
        mosque:    'Mosque Activities',
        community: 'Community Activities'
    };

    /* ---------- State ---------- */
    let currentFilter = 'all';
    let visibleItems = [];   // items shown under current filter
    let currentIndex = 0;    // index into visibleItems
    let lastFocusedEl = null;

    /* ---------- Get full URL for a gallery item ---------- */
    function itemUrl(item) {
        return new URL(item.src, window.location.href).href;
    }

    /* ---------- Rendering the grid ---------- */
    function renderGrid() {
        visibleItems = currentFilter === 'all'
            ? [...galleryItems]
            : galleryItems.filter(g => g.category === currentFilter);

        if (!visibleItems.length) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column:1/-1;">
                    <p>No photos in this category yet.</p>
                    <p style="font-size:.9rem;">Please check back soon.</p>
                </div>`;
            return;
        }

        grid.innerHTML = visibleItems.map((item, idx) => `
            <button
                type="button"
                class="gallery-item reveal"
                data-index="${idx}"
                aria-label="Open image: ${U.escape(item.title)}"
            >
                <img
                    src="${U.escape(item.src)}"
                    alt="${U.escape(item.title)}"
                    loading="lazy"
                    onerror="this.style.display='none';this.parentElement.classList.add('gallery-item--missing');"
                />
                <span class="gallery-item__overlay">
                    <span class="gallery-item__title">${U.escape(item.title)}</span>
                    <span class="gallery-item__cat">${U.escape(CATEGORY_LABELS[item.category] || item.category)}</span>
                </span>
            </button>
        `).join('');

        // Re-run reveal for injected grid items
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });

        // Bind item clicks
        grid.querySelectorAll('.gallery-item').forEach(el => {
            el.addEventListener('click', () => {
                openLightbox(parseInt(el.getAttribute('data-index'), 10));
            });
        });
    }

    /* ---------- Filters ---------- */
    function initFilters() {
        if (!filterBar) return;
        filterBar.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-filter]');
            if (!btn) return;
            const value = btn.getAttribute('data-filter');
            if (value === currentFilter) return;
            currentFilter = value;
            filterBar.querySelectorAll('[data-filter]').forEach(b => {
                const active = b === btn;
                b.classList.toggle('is-active', active);
                b.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            renderGrid();
        });
    }

    /* ---------- Lightbox ---------- */
    let lb = null; // lightbox root element

    function buildLightbox() {
        lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-modal', 'true');
        lb.setAttribute('aria-label', 'Image preview');
        lb.innerHTML = `
            <div class="lightbox__backdrop" data-close></div>
            <div class="lightbox__inner" role="document">
                <button type="button" class="lightbox__btn lightbox__close" aria-label="Close preview" data-close>✕</button>
                <button type="button" class="lightbox__btn lightbox__prev" aria-label="Previous image" data-prev>‹</button>
                <button type="button" class="lightbox__btn lightbox__next" aria-label="Next image" data-next>›</button>
                <figure class="lightbox__figure">
                    <img class="lightbox__img" alt="" />
                    <figcaption class="lightbox__caption">
                        <span class="lightbox__title"></span>
                        <span class="lightbox__counter"></span>
                    </figcaption>
                </figure>
            </div>
        `;
        document.body.appendChild(lb);

        // Bind controls
        lb.querySelectorAll('[data-close]').forEach(el =>
            el.addEventListener('click', closeLightbox));
        lb.querySelector('[data-prev]').addEventListener('click', () => navigate(-1));
        lb.querySelector('[data-next]').addEventListener('click', () => navigate(1));

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!lb.classList.contains('is-open')) return;
            if (e.key === 'Escape') closeLightbox();
            else if (e.key === 'ArrowLeft') navigate(-1);
            else if (e.key === 'ArrowRight') navigate(1);
            else if (e.key === 'Tab') trapFocus(e);
        });

        // Swipe navigation (touch devices)
        let touchStartX = 0;
        lb.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        lb.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            if (Math.abs(dx) > 50) navigate(dx > 0 ? -1 : 1);
        }, { passive: true });
    }

    function openLightbox(index) {
        if (!lb) buildLightbox();
        currentIndex = index;
        lastFocusedEl = document.activeElement;
        updateLightbox();
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        // Focus close button for immediate keyboard access
        setTimeout(() => lb.querySelector('.lightbox__close').focus(), 30);
    }

    function closeLightbox() {
        if (!lb) return;
        lb.classList.remove('is-open');
        document.body.style.overflow = '';
        if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
            lastFocusedEl.focus();
        }
    }

    function navigate(dir) {
        if (!visibleItems.length) return;
        currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
        updateLightbox();
    }

    function updateLightbox() {
        if (!lb) return;
        const item = visibleItems[currentIndex];
        if (!item) return;

        const img = lb.querySelector('.lightbox__img');
        img.src = itemUrl(item);
        img.alt = item.title;

        lb.querySelector('.lightbox__title').textContent = item.title;
        lb.querySelector('.lightbox__counter').textContent =
            `${currentIndex + 1} / ${visibleItems.length}  ·  ${CATEGORY_LABELS[item.category] || item.category}`;
    }

    /* ---------- Focus trap (Tab cycling within modal) ---------- */
    function trapFocus(e) {
        const focusables = lb.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }

    /* ---------- Init ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initFilters();
        renderGrid();
    });
})();