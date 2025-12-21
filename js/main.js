document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('section[id]'));

  // Add subtle shadow to the header when scrolling.
  const toggleHeaderShadow = () => {
    if (!header) return;
    header.style.boxShadow = window.scrollY > 12 ? '0 8px 22px rgba(15, 23, 42, 0.08)' : 'none';
  };
  toggleHeaderShadow();
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });

  // Active link highlighting based on scroll position.
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = navLinks.find(link => link.getAttribute('href') === `#${entry.target.id}`);
          if (active) active.classList.add('active');
        }
      });
    },
    { rootMargin: '-50% 0px -35% 0px', threshold: 0.3 }
  );

  sections.forEach(section => observer.observe(section));

  // Smooth scroll adjustment for browsers that do not support CSS smooth behavior consistently.
  navLinks.forEach(link => {
    link.addEventListener('click', evt => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      evt.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
