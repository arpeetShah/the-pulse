/* ── Mobile nav toggle ── */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Subscribe forms ── */
  document.querySelectorAll('.subscribe-form, .hero__form, .inline-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !input.value) return;

      /* Check if this is the subscribe page card */
      const card = form.closest('.subscribe-card');
      if (card) {
        const formEl = card.querySelector('.subscribe-form');
        const successEl = card.querySelector('.success-msg');
        if (formEl && successEl) {
          formEl.style.display = 'none';
          successEl.style.display = 'flex';
        }
        return;
      }

      /* Inline forms — swap button text */
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'You\'re in ✓';
        btn.style.background = '#085041';
        input.value = '';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = '';
        }, 3000);
      }
    });
  });

  /* ── Article filter + search ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('article-search');
  const articleCards = document.querySelectorAll('.article-list-card');
  const noResults = document.querySelector('.no-results');

  let activeFilter = 'all';

  function filterArticles() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let visible = 0;

    articleCards.forEach(card => {
      const category = card.dataset.category || '';
      const text = card.textContent.toLowerCase();
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !query || text.includes(query);

      if (matchesFilter && matchesSearch) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      filterArticles();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterArticles);
  }
});
