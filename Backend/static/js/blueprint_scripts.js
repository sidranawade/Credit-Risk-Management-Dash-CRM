/**
 * CRMPro Frontend JS Blueprint (blueprint_scripts.js)
 * Reusable layout & component interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive components
  initMobileSidebar();
  initActiveLinks();
  initModals();
  initTooltips();
  initTabs();
});

/**
 * 1. Mobile Sidebar Hamburger Menu Toggle
 */
function initMobileSidebar() {
  const hamburger = document.getElementById('mobile-hamburger');
  const sidebar = document.getElementById('app-sidebar');

  if (!hamburger || !sidebar) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar.classList.toggle('open');
    const isOpen = sidebar.classList.contains('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && e.target !== hamburger) {
        sidebar.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

/**
 * 2. Automatic Active Nav Link State Highlighter
 */
function initActiveLinks() {
  const links = document.querySelectorAll('.menu-link');
  const currentPath = window.location.pathname.toLowerCase();

  links.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;
    const normalizedHref = linkHref.toLowerCase();
    
    // Toggle active state if pathname matches the link
    if (currentPath === normalizedHref || (normalizedHref !== '/' && normalizedHref !== '#' && currentPath.startsWith(normalizedHref))) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * 3. Modal Box Controllers (Show/Hide, Escape Key, Backdrop Closes)
 */
function initModals() {
  const openButtons = document.querySelectorAll('[data-modal-open]');
  const closeButtons = document.querySelectorAll('[data-modal-close]');
  const backdrops = document.querySelectorAll('.modal-backdrop');

  // Open triggers
  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-open');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        openModal(targetModal);
      }
    });
  });

  // Close triggers
  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetModal = btn.closest('.modal-backdrop');
      if (targetModal) {
        closeModal(targetModal);
      }
    });
  });

  // Backdrop click closes modal
  backdrops.forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop);
      }
    });
  });

  // Escape key closes open modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModalEl = document.querySelector('.modal-backdrop.show');
      if (openModalEl) {
        closeModal(openModalEl);
      }
    }
  });
}

function openModal(modalEl) {
  modalEl.classList.add('show');
  modalEl.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Lock background scrolling
  
  // Custom micro-animation hook (optional)
  const modalBox = modalEl.querySelector('.modal-box');
  if (modalBox) {
    modalBox.classList.add('animate-fade-scale');
  }
}

function closeModal(modalEl) {
  modalEl.classList.remove('show');
  modalEl.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Unlock background scrolling
}

/**
 * 4. Microtooltips Setup (Premium dynamic hovering)
 */
function initTooltips() {
  const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
  let tooltipEl = document.getElementById('global-tooltip');

  // Create global tooltip elements if they don't exist
  if (!tooltipEl && tooltipTriggers.length > 0) {
    tooltipEl = document.createElement('div');
    tooltipEl.id = 'global-tooltip';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.background = '#071635';
    tooltipEl.style.color = '#ffffff';
    tooltipEl.style.padding = '6px 12px';
    tooltipEl.style.borderRadius = '6px';
    tooltipEl.style.fontSize = '12px';
    tooltipEl.style.fontWeight = '600';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.opacity = '0';
    tooltipEl.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    tooltipEl.style.zIndex = '9999';
    tooltipEl.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    document.body.appendChild(tooltipEl);
  }

  tooltipTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', (e) => {
      const tooltipText = trigger.getAttribute('data-tooltip');
      tooltipEl.textContent = tooltipText;
      tooltipEl.style.opacity = '1';
      tooltipEl.style.transform = 'translateY(0)';
      positionTooltip(trigger, tooltipEl);
    });

    trigger.addEventListener('mousemove', (e) => {
      positionTooltip(trigger, tooltipEl);
    });

    trigger.addEventListener('mouseleave', () => {
      tooltipEl.style.opacity = '0';
      tooltipEl.style.transform = 'translateY(4px)';
    });
  });
}

function positionTooltip(trigger, tooltip) {
  const rect = trigger.getBoundingClientRect();
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  
  // Position tooltip above the center of trigger
  let left = rect.left + (rect.width / 2) - (tooltipWidth / 2) + window.scrollX;
  let top = rect.top - tooltipHeight - 8 + window.scrollY;

  // Bound checks
  if (left < 10) left = 10;
  if (left + tooltipWidth > window.innerWidth - 10) {
    left = window.innerWidth - tooltipWidth - 10;
  }
  if (top < 10) { // If it flows above screen, show below trigger instead
    top = rect.bottom + 8 + window.scrollY;
  }

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

/**
 * 5. Animated Tabs Toggling
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('[data-tab-target]');
    const tabPanels = document.querySelectorAll('[data-tab-content]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetSelector = tab.getAttribute('data-tab-target');
        const targetPanel = document.querySelector(targetSelector);

        if (!targetPanel) return;

        // Reset active tabs in current container
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Hide sibling tab panels, show target with animation
        const siblings = targetPanel.parentElement.querySelectorAll('[data-tab-content]');
        siblings.forEach(panel => {
          panel.style.display = 'none';
          panel.classList.remove('animate-fade-slide');
        });

        targetPanel.style.display = 'block';
        // Force reflow to restart CSS animation
        void targetPanel.offsetWidth;
        targetPanel.classList.add('animate-fade-slide');
      });
    });
  });
}
