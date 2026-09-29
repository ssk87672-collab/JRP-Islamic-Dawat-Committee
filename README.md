# J. R. P Islamic Dawat Committee — Official Website

A modern, responsive, and accessible Islamic community website built with
**HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no build step, no
dependencies. Just open it in a browser.

---

## 📋 Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Customisation Guide](#customisation-guide)
6. [Deployment](#deployment)
7. [Content Policy](#content-policy)
8. [Accessibility](#accessibility)
9. [Browser Support](#browser-support)
10. [Future Roadmap](#future-roadmap)
11. [License](#license)

---

## About the Project

This website serves **J. R. P Islamic Dawat Committee** — a community-focused
Islamic initiative dedicated to spreading authentic Islamic knowledge,
Qur'an and Sunnah education, youth development, dawah, and beneficial
community activities.

The site is intentionally built with **zero dependencies** so that any
maintainer — even a beginner — can update content without touching build
tooling.

---

## Features

- ✅ Fully responsive (mobile-first)
- ✅ Semantic HTML5 + ARIA
- ✅ Accessible (keyboard nav, focus management, screen-reader friendly)
- ✅ Sticky navbar with mobile hamburger menu
- ✅ Filterable events page with deep-linkable detail view
- ✅ Gallery with accessible lightbox (prev/next/swipe/keyboard)
- ✅ Validated contact form (client-side)
- ✅ SEO-ready (unique titles, meta descriptions, OG tags)
- ✅ `prefers-reduced-motion` respected
- ✅ Lazy-loaded images
- ✅ Content sourced from a single `js/data.js` file (easy to update)

---

## Project Structure
jrp-islamic-dawat/
│
├── index.html Homepage
├── about.html About Us
├── activities.html Activities
├── events.html Events (with filtering + detail view)
├── gallery.html Photo gallery (with lightbox)
├── resources.html Islamic Resources
├── committee.html Committee Members
├── contact.html Contact + Support/Donate
│
├── admin/ (Optional) Admin panel — see admin/README.md
│
├── css/
│ ├── style.css Design system + globals
│ └── responsive.css Media queries (1024 / 880 / 600 px)
│
├── js/
│ ├── data.js Central content source — edit this first
│ ├── main.js Shared: nav, reveal, helpers
│ ├── events.js Events page logic
│ └── gallery.js Gallery + lightbox logic
│
├── images/
│ ├── logo.png Organisation logo
│ ├── favicon.ico Browser tab icon
│ ├── hero/ Hero + about preview images
│ ├── events/ Event images
│ ├── gallery/ Gallery images
│ └── committee/ Committee photos
│
├── assets/
│ └── patterns/ Optional Islamic geometric patterns
│
└── README.md This file