/* =========================================================
   J. R. P Islamic Dawat Committee — Events Page Logic
   Handles filtering, rendering, and deep-link detail view.
   ========================================================= */

(function () {
    'use strict';

    const U = window.JRPUtils;
    const container = document.getElementById('eventsContainer');
    const filterBar = document.getElementById('eventFilters');
    const detailWrap = document.getElementById('eventDetail');

    if (!container) return;

    /* ---------- State ---------- */
    let currentFilter = 'all';

    /* ---------- Helpers ---------- */
    function isUpcoming(ev) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(ev.date + 'T00:00:00') >= today;
    }

    function getCategory(ev) {
        // Prefer explicit category if provided; fall back to date check
        if (ev.category === 'upcoming' || ev.category === 'past') return ev.category;
        return isUpcoming(ev) ? 'upcoming' : 'past';
    }

    function sortEvents(list) {
        // Upcoming first (soonest → latest), then past (most recent → oldest)
        const upcoming = list.filter(e => getCategory(e) === 'upcoming')
            .sort((a, b) => a.date.localeCompare(b.date));
        const past = list.filter(e => getCategory(e) === 'past')
            .sort((a, b) => b.date.localeCompare(a.date));
        return [...upcoming, ...past];
    }

    function filterEvents(list) {
        if (currentFilter === 'all') return list;
        return list.filter(e => getCategory(e) === currentFilter);
    }

    /* ---------- Rendering ---------- */
    function renderCard(ev) {
        const cat = getCategory(ev);
        const catLabel = cat === 'upcoming' ? 'Upcoming' : 'Past';
        const catClass = cat === 'upcoming'
            ? 'event-badge--upcoming'
            : 'event-badge--past';
        const ctaText = ev.registrationOpen ? 'Register Now' : 'View Details';

        return `
        <article class="event-card reveal" data-id="${U.escape(ev.id)}">
            <div class="event-card__img">
                <img src="${U.escape(ev.image)}" alt="${U.escape(ev.title)}" loading="lazy"
                     onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,var(--primary-green),var(--dark-green))';" />
                <div class="event-card__date">
                    <strong>${U.dayShort(ev.date)}</strong>
                    <span>${U.monthShort(ev.date)}</span>
                </div>
                <span class="event-badge ${catClass}">${catLabel}</span>
            </div>
            <div class="event-card__body">
                <h3>${U.escape(ev.title)}</h3>
                <div class="event-card__meta">
                    <span>📅 ${U.formatDate(ev.date)} · ${U.dayName(ev.date)}</span>
                    <span>🕒 ${U.escape(ev.time)}</span>
                    <span>📍 ${U.escape(ev.venue)}</span>
                    <span>👤 ${U.escape(ev.organizer)}</span>
                </div>
                <p>${U.escape(ev.description)}</p>
                <div class="event-card__actions">
                    <button class="btn btn--outline" type="button" data-view="${U.escape(ev.id)}">
                        View Details
                    </button>
                    ${ev.registrationOpen
                        ? `<a href="contact.html?event=${encodeURIComponent(ev.id)}" class="btn btn--primary">${ctaText}</a>`
                        : `<span class="btn btn--disabled" aria-disabled="true">Registration Closed</span>`
                    }
                </div>
            </div>
        </article>`;
    }

    function render() {
        const list = sortEvents(filterEvents(events));

        if (!list.length) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No events to display in this category yet.</p>
                    <p style="font-size:.9rem;">Please check back soon — new programs will be announced here.</p>
                </div>`;
            return;
        }

        container.innerHTML = list.map(renderCard).join('');

        // Re-run reveal for injected cards
        document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });

        // Bind card "View Details" buttons
        container.querySelectorAll('[data-view]').forEach(btn => {
            btn.addEventListener('click', () => showDetail(btn.getAttribute('data-view')));
        });
    }

    /* ---------- Detail View ---------- */
    function showDetail(id) {
        const ev = events.find(e => e.id === id);
        if (!ev || !detailWrap) return;

        const cat = getCategory(ev);

        detailWrap.innerHTML = `
            <div class="event-detail reveal">
                <button type="button" class="event-detail__close" aria-label="Close details">✕</button>
                <div class="event-detail__media">
                    <img src="${U.escape(ev.image)}" alt="${U.escape(ev.title)}" loading="lazy"
                         onerror="this.style.display='none';this.parentElement.style.background='linear-gradient(135deg,var(--primary-green),var(--dark-green))';" />
                </div>
                <div class="event-detail__body">
                    <span class="event-badge ${cat === 'upcoming' ? 'event-badge--upcoming' : 'event-badge--past'}">
                        ${cat === 'upcoming' ? 'Upcoming' : 'Past Event'}
                    </span>
                    <h2>${U.escape(ev.title)}</h2>
                    <dl class="event-detail__meta">
                        <div><dt>Date</dt><dd>${U.formatDate(ev.date)}</dd></div>
                        <div><dt>Day</dt><dd>${U.dayName(ev.date)}</dd></div>
                        <div><dt>Time</dt><dd>${U.escape(ev.time)}</dd></div>
                        <div><dt>Venue</dt><dd>${U.escape(ev.venue)}</dd></div>
                        <div><dt>Organizer</dt><dd>${U.escape(ev.organizer)}</dd></div>
                    </dl>
                    <p class="event-detail__desc">${U.escape(ev.description)}</p>
                    <div class="event-detail__actions">
                        ${ev.registrationOpen
                            ? `<a href="contact.html?event=${encodeURIComponent(ev.id)}" class="btn btn--primary">Register Now</a>`
                            : `<span class="btn btn--disabled" aria-disabled="true">Registration Closed</span>`
                        }
                        <a href="contact.html" class="btn btn--outline">Enquire</a>
                    </div>
                </div>
            </div>
        `;

        detailWrap.classList.add('is-open');
        detailWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });

        detailWrap.querySelector('.event-detail__close').addEventListener('click', closeDetail);

        // Deep-link the URL
        history.replaceState(null, '', `#${ev.id}`);
    }

    function closeDetail() {
        detailWrap.classList.remove('is-open');
        detailWrap.innerHTML = '';
        history.replaceState(null, '', location.pathname + location.search);
    }

    /* ---------- Filters ---------- */
    function initFilters() {
        if (!filterBar) return;
        filterBar.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-filter]');
            if (!btn) return;
            currentFilter = btn.getAttribute('data-filter');
            filterBar.querySelectorAll('[data-filter]').forEach(b => {
                b.classList.toggle('is-active', b === btn);
                b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
            });
            render();
        });
    }

    /* ---------- Init ---------- */
    function init() {
        initFilters();
        render();

        // If URL hash points to an event, open its detail
        const hash = location.hash.replace('#', '');
        if (hash && events.some(e => e.id === hash)) {
            showDetail(hash);
        }

        // ESC closes detail
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && detailWrap?.classList.contains('is-open')) {
                closeDetail();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();