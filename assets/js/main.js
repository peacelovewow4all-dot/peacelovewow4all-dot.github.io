(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }));
  }

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.11 });
    items.forEach(item => observer.observe(item));
  } else {
    items.forEach(item => item.classList.add('visible'));
  }

  const form = document.getElementById('enquiry-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || '';
      const org = data.get('organisation') || '';
      const country = data.get('country') || '';
      const stage = data.get('stage') || '';
      const email = data.get('email') || '';
      const message = data.get('message') || '';
      const subject = `Waste-to-Energy project enquiry — ${country} — ${stage}`;
      const body = [
        `Dear Dr. Mintesnot,`, '',
        `My name is ${name}${org ? ` from ${org}` : ''}.`,
        `Country / project location: ${country}`,
        `Current project stage: ${stage}`,
        `My email: ${email}`, '',
        `Project summary:`, message, '',
        `Kind regards,`, name
      ].join('\n');
      window.location.href = `mailto:mintesnot.gizaw@aastu.edu.et?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const img = lightbox.querySelector('img');
    const caption = lightbox.querySelector('p');
    const close = lightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.lightbox-trigger').forEach(item => {
      const open = () => {
        img.src = item.dataset.lightbox;
        img.alt = item.querySelector('img')?.alt || '';
        caption.textContent = item.dataset.caption || '';
        lightbox.showModal();
      };
      item.addEventListener('click', open);
      item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    });
    close.addEventListener('click', () => lightbox.close());
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.close(); });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
