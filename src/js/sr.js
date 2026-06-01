export default function() {
  const sr = ScrollReveal();
  const base = {
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    distance: '30px',
    duration: 1000,
    desktop: true,
    mobile: true,
  };
  const isDesktop = window.innerWidth > 768;

  sr.reveal('.section-title', { ...base, delay: 300, distance: '0px', origin: 'bottom' });
  sr.reveal('.hero-title', { ...base, delay: 500, origin: isDesktop ? 'left' : 'bottom' });
  sr.reveal('.hero-cta', { ...base, delay: 1000, origin: isDesktop ? 'left' : 'bottom' });
  sr.reveal('.about-wrapper__image', { ...base, delay: 600, origin: 'bottom' });
  sr.reveal('.about-wrapper__info', { ...base, delay: 500, origin: isDesktop ? 'left' : 'bottom' });
  sr.reveal('.project-wrapper__text', { ...base, delay: 500, origin: isDesktop ? 'left' : 'bottom' });
  sr.reveal('.project-wrapper__image', { ...base, delay: 1000, origin: isDesktop ? 'right' : 'bottom' });
  sr.reveal('.experience-wrapper__info', { ...base, delay: 1000, origin: 'bottom' });
  sr.reveal('.skills-wrapper', { ...base, delay: 1000, origin: 'bottom' });
  sr.reveal('.contact-wrapper', { ...base, delay: 800, origin: 'bottom' });
}
