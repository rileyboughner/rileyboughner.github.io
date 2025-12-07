document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- SMOOTH SCROLL FOR NAV LINKS ---
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- HERO SECTION ANIMATION ---
    const heroTimeline = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power3.out' }
    });
    
    heroTimeline
        .from('.hero__title-line-1', { opacity: 0, y: 50, delay: 0.2 })
        .from('.hero__title-line-2', { opacity: 0, y: 50 }, '-=0.6')
        .from('.hero__description', { opacity: 0, y: 30 }, '-=0.6')
        .from('.hero__button', { opacity: 0, scale: 0.8 }, '-=0.6');


    // --- SCROLL-TRIGGERED ANIMATIONS ---
    const fadeInElements = gsap.utils.toArray('.anim-fade-in');
    fadeInElements.forEach(el => {
        gsap.to(el, {
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });
    
    const slideUpElements = gsap.utils.toArray('.anim-slide-up');
    slideUpElements.forEach(el => {
        gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.2,
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });
    });

    // --- ACTIVE NAV LINK ON SCROLL ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

});
