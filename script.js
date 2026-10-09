/**
 * Balady Health Certificate - Interactive Functionality
 * Pure Vanilla JavaScript (No libraries or CDNs)
 */

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-nav-trigger');
  const verifyBtn = document.getElementById('verifyBtn');
  const verifyDrawer = document.getElementById('verifyDrawer');

  // 1. "كيف تتحقق" Verification Drawer Toggle
  if (verifyBtn && verifyDrawer) {
    verifyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = verifyDrawer.classList.toggle('is-open');
      verifyBtn.classList.toggle('is-active', isOpen);
      verifyBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Prevent clicks inside verifyDrawer from bubbling to document
    verifyDrawer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // 2. Mobile Menu Drawer Toggle
  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Prevent clicks inside mobileDrawer from bubbling to document
    mobileDrawer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // 3. Mobile Accordion Sub-Menu Toggle (smooth expand/collapse)
  mobileAccordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const parentItem = trigger.closest('.mobile-nav-item');
      if (!parentItem) return;

      const isCurrentlyExpanded = parentItem.classList.contains('is-expanded');

      // Collapse other sub-menus in the accordion
      const siblings = parentItem.parentElement?.querySelectorAll('.mobile-nav-item.is-expanded') || [];
      siblings.forEach((sibling) => {
        if (sibling !== parentItem) {
          sibling.classList.remove('is-expanded');
          const siblingTrigger = sibling.querySelector('.mobile-nav-trigger');
          if (siblingTrigger) siblingTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked sub-menu
      parentItem.classList.toggle('is-expanded', !isCurrentlyExpanded);
      trigger.setAttribute('aria-expanded', !isCurrentlyExpanded ? 'true' : 'false');
    });
  });

  // 4. Global Click Listener for Clean Outside Dismissal
  document.addEventListener('click', (e) => {
    // Only close mobile drawer if clicking strictly outside mobileDrawer & hamburgerBtn
    if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      if (!mobileDrawer.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        mobileDrawer.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
    }

    // Only close verify drawer if clicking strictly outside verifyDrawer & verifyBtn
    if (verifyDrawer && verifyDrawer.classList.contains('is-open')) {
      if (!verifyDrawer.contains(e.target) && !verifyBtn.contains(e.target)) {
        verifyDrawer.classList.remove('is-open');
        verifyBtn.classList.remove('is-active');
        verifyBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // 5. Close drawers on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      }
      if (verifyDrawer && verifyDrawer.classList.contains('is-open')) {
        verifyDrawer.classList.remove('is-open');
        verifyBtn.classList.remove('is-active');
        verifyBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
