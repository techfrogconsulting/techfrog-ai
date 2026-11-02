(() => {
  'use strict';
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const setMenu = (open, restoreFocus = false) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
    setMenu(false);
    if (wasOpen && link.hash) {
      const destination = document.querySelector(link.hash);
      if (destination) {
        destination.setAttribute('tabindex', '-1');
        destination.focus({preventScroll:true});
        destination.addEventListener('blur', () => destination.removeAttribute('tabindex'), {once:true});
      }
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    if (event.key === 'Tab' && toggle.getAttribute('aria-expanded') === 'true') {
      const lastLink = nav.querySelector('a:last-child');
      if (event.shiftKey && document.activeElement === toggle) {event.preventDefault();lastLink.focus();}
      else if (!event.shiftKey && document.activeElement === lastLink) {event.preventDefault();toggle.focus();}
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', event => {if(event.matches) setMenu(false);});
  const copyButton = document.querySelector('.copy-email');
  const copyStatus = document.querySelector('.copy-status');
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('chat@techfrog.ai');
      copyButton.textContent = 'Copied ✓';
      copyStatus.textContent = 'Email address copied.';
      window.setTimeout(() => {copyButton.innerHTML = 'Copy <span aria-hidden="true">⧉</span>';}, 2500);
    } catch {
      copyStatus.classList.remove('sr-only');
      copyStatus.textContent = 'Select the email address to copy it, or use the email link.';
    }
  });
})();
