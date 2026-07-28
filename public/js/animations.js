gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimations();
  initScrollReveal();
  initSkillBars();
});

function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.6 });

  tl.fromTo('.hero-greeting', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' })
    .fromTo('.hero-name', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
    .fromTo('.hero-professions', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5')
    .fromTo('.hero-bio', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .fromTo('.hero-buttons a', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power2.out' }, '-=0.3')
    .fromTo('.hero-image', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero-portrait-frame', { scale: 0.85 }, { scale: 1, duration: 1, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero-portrait-glow', { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' }, '-=1');
}

function initScrollReveal() {
  gsap.utils.toArray('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => el.classList.add('visible'),
      once: true,
    });
  });
}

function initSkillBars() {
  gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      onEnter: () => {
        const w = bar.style.width;
        bar.style.width = '0%';
        gsap.to(bar, { width: w, duration: 1, ease: 'power2.out' });
      },
      once: true,
    });
  });
}
