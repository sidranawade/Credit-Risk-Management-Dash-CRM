# CRMPro UI Blueprint & Design System (`/reuse`)

This folder serves as a **reusable template and UI blueprint** to bootstrap new webpages in the CRMPro dashboard. It consolidates all typography configurations, spacing systems, layout wrappers, and custom interactive animations from across the frontend codebase.

---

## 📂 Folder Contents

- 📄 **`blueprint_layout.html`**: A copy-pasteable HTML boilerplate showing a structured responsive sidebar navigation, mobile header, bento grids, forms, animations, tables, and modal dialog overlays.
- 📄 **`blueprint_styles.css`**: Core styling variables (neutrals, cards, shadows), theme color classes, utility styles, and a library of 10+ custom CSS keyframe animations.
- 📄 **`blueprint_scripts.js`**: Modular JavaScript interactions covering mobile hamburger triggers, active page markers, animated tab switches, positioned tooltips, and modal actions.

---

## 🎨 Theme Variables & Accent Colors

The blueprint supports a **Unified Color Accent Swapper**. By changing a single CSS class on the `<body>` element, the entire interface transitions between the User Dashboard (Red Accent) and the Admin Dashboard (Blue Accent).

```html
<!-- For User Dashboard (Red Accent) -->
<body class="theme-user">

<!-- For Admin Dashboard (Blue Accent) -->
<body class="theme-admin">
```

### Color Variables
- **User Primary Red**: `#ef4444` (active states, main buttons, primary highlights)
- **Admin Primary Blue**: `#2563eb` (admin buttons, secondary overlays)
- **Light Accents (Backgrounds & Hover states)**:
  - Red Accent Light: `#fff0f0`
  - Blue Accent Light: `#eff6ff`
- **Neutrals**:
  - Main Background: `#f5f7fb`
  - Surface Card Background: `#ffffff`
  - Text Primary: `#071635` (deep slate)
  - Text Secondary: `#64748b` (slate gray)
  - Borders: `#e2e7f1`

---

## 💫 Core Animations Library

Apply these pre-configured animation classes to elements to make the interface feel responsive, dynamic, and premium:

1. **`animate-fade-scale`**: Combines opacity fade-in, scale upward (`0.97` to `1`), and translation (`10px` to `0`). Ideal for loading cards, modals, or page headers.
2. **`animate-fade-slide`**: Soft opacity fade-in combined with an entry slide from the right (`20px` to `0`). Used when clicking tabs or loading sub-sections.
3. **`animate-slide-sidebar`**: Slide-in from left (`-100%` to `0`) and opacity fade-in. Excellent for sidebar entrances.
4. **`animate-drop-card`**: Entry drop from top (`-30px` to `0`).
5. **`animate-float`**: Infinite smooth up-down bouncing (`8px`). Perfect for indicators, warning dots, or status circles.
6. **`animate-pulse-scale`**: Intermittent scale pulsing (`1` to `1.03`). Useful for highlighting attention-drawing tags (like "System Active" or "Live").
7. **`animate-rotate`**: Continuous `360deg` spin. Used for loaders and loading states.
8. **`skeleton-shine`**: Premium sweeping skeleton loader mask overlay (shines across the width of the container).
9. **`marquee-track`**: Horizontal infinite message scroller animation.

---

## 🚀 How to Create a New Webpage (Step-by-Step)

Follow these steps to create a new page using the blueprint:

### Step 1: Copy the Layout
Copy the contents of [blueprint_layout.html](file:///C:/Users/Admin/Downloads/CRMPro-Frontend-main/CRMPro-Frontend-main/vs/CRMPro-Frontend/CRM/vs/reuse/blueprint_layout.html) into your new template file (e.g., `templates/user/new_page.html`).

### Step 2: Link CSS and JS
Ensure the stylesheet and script tags are correctly referenced. If building inside the Flask project structure, map them using Flask's `url_for` or direct relative path imports:
```html
<link rel="stylesheet" href="/static/css/reuse/blueprint_styles.css">
<script src="/static/js/reuse/blueprint_scripts.js" defer></script>
```
*(Remember to move the CSS and JS files to the respective static folders if you want to keep them aligned with the CRMPro directories).*

### Step 3: Choose Your Theme
Adjust the `body` class configuration:
- Use `<body class="theme-user">` for customer-facing views.
- Use `<body class="theme-admin">` for administrative-facing views.

### Step 4: Inject Custom Components
Use the layout blueprint markup blocks to quickly form your pages:
- **Card Grids**: Use `<div class="bento-grid">` containing `<div class="ui-card hover-lift">`.
- **Forms**: Wrap input controls with `<div class="form-group">` and labels `<label class="form-label">`.
- **Tables**: Wrap table element inside `<div class="table-responsive">` and style table tag with `class="ui-table"`.
- **Pills**: Use `<span class="pill pill-success">` or `pill-warning` / `pill-danger` inside table cells or metrics.
- **Tooltips**: Add `data-tooltip="My tooltip copy"` to any HTML element.

---

## 🛠️ Best Practices & Guidelines

- **Typography**: Keep to the typography hierarchy rules. Heading 1 (`h1`) is reserved for main page titles, while card titles should utilize secondary styles (`h3` or card labels).
- **Reduced Motion**: Respect system preferences. The CSS blueprint includes a media query `@media (prefers-reduced-motion: reduce)` which disables transitions and animations automatically. Keep custom animations inside these guards.
- **Accessibility**: When configuring triggers (e.g., buttons opening modals), ensure proper attributes like `aria-expanded`, `aria-hidden`, and keyboard closing listeners are in place (pre-configured in `blueprint_scripts.js`).
