# 📸 Luca Moretti — Photographer Portfolio

A premium, dark-themed photographer portfolio website built with vanilla HTML, CSS, and JavaScript. Features animated gradient accents, a fully interactive gallery lightbox, and responsive design.

![Hero Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

- **Cinematic Hero** — Full-screen background with Ken Burns zoom and parallax scrolling
- **Interactive Gallery** — Filterable masonry grid with full-screen lightbox (keyboard + touch swipe)
- **Animated Gradients** — Gold-to-rose-to-violet gradient text, buttons, and accents
- **Pricing Section** — 3-tier pricing cards with highlighted "Most Popular" option
- **Testimonials** — Client review cards with star ratings
- **Contact Form** — Booking form with package selector and date picker
- **Scroll Animations** — Fade-in reveal on scroll using IntersectionObserver
- **Animated Counters** — Stats count up when scrolled into view
- **Fully Responsive** — Mobile hamburger nav, fluid layouts, optimized for all screen sizes
- **SEO Optimized** — Semantic HTML, meta tags, proper heading hierarchy

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure & SEO |
| CSS3 | Styling, animations, gradients |
| Vanilla JS | Lightbox, filters, parallax, form handling |
| Google Fonts | Cormorant Garamond + Inter |

> No frameworks. No build tools. No dependencies. Just clean, fast code.

## 🚀 Getting Started

### Option 1 — Just open it
Double-click `index.html` in your file explorer. Done!

### Option 2 — Local dev server
```bash
# Using Python
python -m http.server 8765

# Using Node.js
npx serve .
```

Then visit `http://localhost:8765`

### Option 3 — Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 📁 Project Structure

```
├── index.html          # Main page (all 7 sections)
├── style.css           # Premium dark theme + gradient system
├── script.js           # Interactivity (lightbox, filters, parallax)
├── package.json        # Project metadata
├── hero_bg.png         # Hero background image
├── about_photo.png     # Photographer portrait
├── gallery_01.png      # Portfolio: Wedding
├── gallery_02.png      # Portfolio: Portrait
├── gallery_03.png      # Portfolio: Landscape
├── gallery_04.png      # Portfolio: Street
├── gallery_05.png      # Portfolio: Event
├── gallery_06.png      # Portfolio: Nature
└── README.md           # This file
```

## 🎨 Customization

1. **Name & Branding** — Replace "Luca Moretti" in `index.html` with your name
2. **Contact Info** — Update email, phone, and location in the contact section
3. **Pricing** — Edit the 3 pricing tiers to match your packages
4. **Photos** — Swap `gallery_01.png` through `gallery_06.png` with your real work
5. **Colors** — Edit CSS variables in `:root` at the top of `style.css`

## 📄 License

MIT — feel free to use, modify, and deploy for your own photography business.
