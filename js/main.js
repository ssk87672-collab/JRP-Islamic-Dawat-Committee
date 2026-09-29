/* =========================================================
   J. R. P Islamic Dawat Committee — Main JS
   Shared across every page.
   ========================================================= */

(function () {
    'use strict';

    /* ---------- Mobile Nav ---------- */
    function initMobileNav() {
        const toggle = document.querySelector('.navbar__toggle');
        const nav = document.querySelector('.navbar__nav');
        if (!toggle || !nav) return;

        // Overlay
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }

        const open = () => {
            nav.classList.add('is-open');
            toggle.classList.add('is-open');
            overlay.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };
        const close = () => {
            nav.classList.remove('is-open');
            toggle.classList.remove('is-open');
            overlay.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        toggle.addEventListener('click', () => {
            nav.classList.contains('is-open') ? close() : open();
        });
        overlay.addEventListener('click', close);
        nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }

    /* ---------- Navbar Shadow on Scroll ---------- */
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        const onScroll = () => navbar.classList.toggle('is-scrolled', window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ---------- Reveal on Scroll ---------- */
    function initReveal() {
        const els = document.querySelectorAll('.reveal');
        if (!els.length) return;

        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        els.forEach(el => io.observe(el));
    }

    /* ---------- Active Nav Link ---------- */
    function initActiveNav() {
        const path = location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.navbar__nav a').forEach(a => {
            const href = a.getAttribute('href');
            if (href === path) a.classList.add('active');
        });
    }

    /* ---------- Footer Year ---------- */
    function initFooterYear() {
        document.querySelectorAll('[data-year]').forEach(el => {
            el.textContent = new Date().getFullYear();
        });
    }

    /* ---------- Event Date Helpers (shared) ---------- */
    window.JRPUtils = {
        formatDate(iso) {
            const d = new Date(iso + 'T00:00:00');
            if (isNaN(d)) return iso;
            return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        },
        dayName(iso) {
            const d = new Date(iso + 'T00:00:00');
            return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { weekday: 'long' });
        },
        dayShort(iso) {
            const d = new Date(iso + 'T00:00:00');
            return isNaN(d) ? '' : String(d.getDate()).padStart(2, '0');
        },
        monthShort(iso) {
            const d = new Date(iso + 'T00:00:00');
            return isNaN(d) ? '' : d.toLocaleDateString('en-GB', { month: 'short' });
        },
        escape(str) {
            const div = document.createElement('div');
            div.textContent = str == null ? '' : String(str);
            return div.innerHTML;
        }
    };

    /* ---------- Boot ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initMobileNav();
        initNavbarScroll();
        initReveal();
        initActiveNav();
        initFooterYear();
    });
})();