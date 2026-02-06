(() => {
  const header = document.querySelector('[data-elevate]');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  const year = document.querySelector('#year');
  const form = document.querySelector('#contactForm');

  if (year) year.textContent = new Date().getFullYear();

  // Header elevation on scroll
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('is-elevated');
    else header.classList.remove('is-elevated');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  const closeNav = () => {
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.setAttribute('aria-label', 'Open menu');
  };

  toggle?.addEventListener('click', () => {
    const isOpen = nav?.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close nav when clicking a link (mobile)
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  // Close nav when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav?.classList.contains('open')) return;
    const t = e.target;
    const clickedInside = nav.contains(t) || toggle?.contains(t);
    if (!clickedInside) closeNav();
  });

  // Contact form: mailto
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const topic = form.topic.value.trim();
    const message = form.message.value.trim();

    const subject = encodeURIComponent(`[Website] ${topic} — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}\n`
    );

    window.location.href = `mailto:mintesnot.gizaw@gmail.com?subject=${subject}&body=${body}`;
  });
})();