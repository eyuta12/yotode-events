const menuToggle = document.getElementById('menu-toggle');
const siteNav = document.getElementById('site-nav');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const filterButtons = Array.from(document.querySelectorAll('.filter-button'));
const galleryCards = Array.from(document.querySelectorAll('.gallery-card'));
const packageButtons = Array.from(document.querySelectorAll('.package-inquiry'));
const selectedPackage = document.getElementById('selected-package');
const selectedPackageInput = document.getElementById('selected-package-input');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxDismiss = document.getElementById('lightbox-dismiss');

const closeMenu = () => {
  if (!menuToggle || !siteNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
};

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteNav.classList.toggle('is-open', !isOpen);
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter || 'all';

    filterButtons.forEach((item) => item.classList.toggle('active', item === button));
    galleryCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.hidden = !matches;
    });
  });
});

packageButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const packageName = button.dataset.package || '';
    selectedPackageInput.value = packageName;
    selectedPackage.hidden = !packageName;
    selectedPackage.textContent = packageName ? `Selected package: ${packageName}` : '';
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const openLightbox = (card) => {
  lightboxImage.src = card.dataset.image || '';
  lightboxImage.alt = card.querySelector('img')?.alt || '';
  lightboxTitle.textContent = card.dataset.title || '';
  lightboxDescription.textContent = card.dataset.description || '';
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImage.src = '';
  document.body.style.overflow = '';
};

galleryCards.forEach((card) => {
  card.addEventListener('click', () => openLightbox(card));
});

[lightboxClose, lightboxDismiss].forEach((control) => {
  control?.addEventListener('click', closeLightbox);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (!lightbox.hidden) closeLightbox();
  }
});

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          Accept: 'application/json',
        },
        body: new FormData(form),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      form.reset();
      selectedPackage.hidden = true;
      selectedPackage.textContent = '';
      selectedPackageInput.value = '';
      formStatus.textContent = 'Thank you. Your inquiry has been sent.';
    } catch (error) {
      formStatus.textContent = 'Unable to send right now. Please call one of the numbers above.';
    }
  });
}
