document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initCounters();
  initSwiper();
  initParallax();
  initMagneticButtons();
  initNewsletter();
  initFilterButtons();
  initImageReveal();
});

function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('loaded');
    document.body.style.overflow = '';
  }, 500);
}

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > lastScroll && scrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = scrollY;
  }, { passive: true });
}

function initMobileMenu() {
  const toggle = document.getElementById('navbarToggle');
  const menu = document.getElementById('navbarMenu');
  const links = document.querySelectorAll('.navbar-links a');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    const navLinks = menu.querySelector('.navbar-links');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      const navLinks = menu.querySelector('.navbar-links');
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('[data-target]');

  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 60;
  const duration = 2000;
  const stepTime = duration / 60;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

function initSwiper() {
  const swiperEl = document.getElementById('testimonialsSlider');
  if (!swiperEl) return;

  new Swiper(swiperEl, {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
}

function initParallax() {
  document.querySelectorAll('.parallax-item').forEach(item => {
    window.addEventListener('scroll', () => {
      const speed = item.dataset.speed || 0.1;
      const rect = item.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0 && rect.top < window.innerHeight) {
        item.style.transform = `translateY(${scrolled * speed}px)`;
      }
    }, { passive: true });
  });
}

function initMagneticButtons() {
  document.querySelectorAll('.btn-primary, .btn-outline, .btn-hire').forEach(btn => {
    btn.classList.add('magnetic');
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    if (input.value) {
      input.value = '';
      const btn = form.querySelector('button');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i>';
      setTimeout(() => { btn.innerHTML = original; }, 2000);
    }
  });
}

function initFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.masonry-item, .featured-card, .blog-card');

  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 300);
        }
      });
    });
  });
}

function initImageReveal() {
  document.querySelectorAll('.img-reveal').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(el);
  });
}
