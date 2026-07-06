document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  note.textContent = "Thanks for reaching out! We'll get back to you shortly.";
  form.reset();
});

const TRANSITION_MS = 220;

function isInternalPageLink(link) {
  if (!link || !link.getAttribute('href')) return false;
  if (link.target === '_blank' || link.hasAttribute('download')) return false;
  if (link.origin !== window.location.origin) return false;
  const href = link.getAttribute('href');
  if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  return true;
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const link = e.target.closest('a');
  if (!isInternalPageLink(link)) return;
  if (link.pathname === window.location.pathname && !link.hash) return;

  e.preventDefault();
  document.body.classList.add('page-transition-out');
  setTimeout(() => {
    window.location.href = link.href;
  }, TRANSITION_MS);
});

window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    document.body.classList.remove('page-transition-out');
  }
});
