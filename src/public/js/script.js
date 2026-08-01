(function () {
    'use strict';


    function header() {
        const el = document.querySelector('.site-header');
        if (!el) return;

        const toggle = () => el.classList.toggle('is-scrolled', window.scrollY > 24);
        toggle();
        window.addEventListener('scroll', toggle, { passive: true });
    }

    function mobileNav() {
        const toggleBtn = document.querySelector('[data-nav-toggle]');
        const nav = document.querySelector('[data-nav]');
        if (!toggleBtn || !nav) return;

        const close = () => {
            nav.classList.remove('is-open');
            toggleBtn.classList.remove('is-open');
            toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        };

        toggleBtn.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');
            toggleBtn.classList.toggle('is-open', isOpen);
            toggleBtn.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('no-scroll', isOpen);
        });

        // Close the menu whenever a nav link is chosen
        nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }


    function dropdown() {
        const wrapper = document.querySelector('[data-dropdown]');
        const toggleBtn = document.querySelector('[data-dropdown-toggle]');
        const panel = document.querySelector('[data-dropdown-panel]');
        if (!wrapper || !toggleBtn || !panel) return;

        const close = () => {
            panel.hidden = true;
            toggleBtn.setAttribute('aria-expanded', 'false');
        };

        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !panel.hidden;
            panel.hidden = isOpen;
            toggleBtn.setAttribute('aria-expanded', String(!isOpen));
        });

        // Click outside closes it
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') close();
        });
    }


    function revealOnScroll() {
        const items = document.querySelectorAll('[data-reveal]');
        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            items.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
        );

        items.forEach((el, index) => {
            // Small stagger so grids/lists animate in sequence rather than all at once
            el.style.transitionDelay = `${Math.min(index % 8, 8) * 60}ms`;
            observer.observe(el);
        });
    }

    function countUp() {
        const values = document.querySelectorAll('[data-count-to]:not([data-no-count])');
        if (!values.length) return;

        const animate = (el) => {
            const target = parseFloat(el.dataset.countTo);
            const decimals = parseInt(el.dataset.decimals || '0', 10);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';
            const duration = 1400;
            const start = performance.now();

            const format = (n) => {
                const rounded = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US');
                return `${prefix}${rounded}${suffix}`;
            };

            const easeOutQuad = (t) => t * (2 - t);

            function frame(now) {
                const elapsed = Math.min((now - start) / duration, 1);
                const eased = easeOutQuad(elapsed);
                el.textContent = format(target * eased);
                if (elapsed < 1) requestAnimationFrame(frame);
                else el.textContent = format(target); // guarantee an exact final value
            }
            requestAnimationFrame(frame);
        };

        if (!('IntersectionObserver' in window)) {
            values.forEach(animate);
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animate(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.6 }
        );

        values.forEach((el) => observer.observe(el));
    }

    function marquee() {
        const root = document.querySelector('[data-marquee]');
        if (!root) return;

        const columns = root.querySelectorAll('[data-marquee-column]');
        if (!columns.length) return;


        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        columns.forEach((column) => {

            const clone = column.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            column.after(clone);
            column.parentElement.classList.add('partners__track');

            if (!prefersReducedMotion) {
                column.classList.add('is-animated');
                clone.classList.add('is-animated');
            }
        });

        if (!prefersReducedMotion) {
            root.addEventListener('mouseenter', () => root.classList.add('is-paused'));
            root.addEventListener('mouseleave', () => root.classList.remove('is-paused'));
        }
    }

    function testimonialCarousel() {
        const root = document.querySelector('[data-carousel]');
        if (!root) return;

        const track = root.querySelector('[data-carousel-track]');
        const quoteEl = root.querySelector('[data-carousel-quote]');
        const authorEl = root.querySelector('[data-carousel-author]');
        const roleEl = root.querySelector('[data-carousel-role]');
        const logoEl = root.querySelector('[data-carousel-logo]');
        const dots = Array.from(root.querySelectorAll('[data-carousel-dots] .dot'));
        const prevBtn = root.querySelector('[data-carousel-prev]');
        const nextBtn = root.querySelector('[data-carousel-next]');

        const testimonials = [
            {
                quote:
                    '“Since 2019, Gravity Team has been an astounding market maker for Bitkub. They have proven themselves to be one of the most consistent, committed and driven market makers on our exchange. Gravity Team has contributed high-quality volume and has proven to be a very reliable and trustworthy partner.”',
                author: 'Atthakrit Chimplapibul',
                role: 'Co-founder & CEO of Bitkub',
                logo: 'images/bitkub-logo-light.png',
                logoAlt: 'Bitkub',
            },
            {
                quote:
                    '“Gravity Team’s algorithmic desk gave our order books the depth traders expect from a top-tier exchange. Spreads tightened within weeks and the improvement has been consistent ever since.”',
                author: 'Head of Trading',
                role: 'Top-15 global crypto exchange',
                logo: 'images/binance.png',
                logoAlt: 'Exchange partner',
            },
            {
                quote:
                    '“As an early-stage project, healthy liquidity was make-or-break for us. Gravity Team’s team understood our token model quickly and helped us build a market structure our community could trust.”',
                author: 'Founder',
                role: 'Emerging Layer-1 project',
                logo: 'images/coinbase.png',
                logoAlt: 'Project partner',
            },
        ];

        let index = 0;
        let autoplayId = null;
        const AUTOPLAY_MS = 7000;

        function render(newIndex) {
            index = (newIndex + testimonials.length) % testimonials.length;
            const data = testimonials[index];

            // Fade out, swap content, fade back in
            track.classList.add('is-fading');
            window.setTimeout(() => {
                quoteEl.textContent = data.quote;
                authorEl.textContent = data.author;
                roleEl.textContent = data.role;
                logoEl.src = data.logo;
                logoEl.alt = data.logoAlt;
                track.classList.remove('is-fading');
            }, 180);

            dots.forEach((dot, i) => {
                const active = i === index;
                dot.classList.toggle('dot--active', active);
                dot.setAttribute('aria-selected', String(active));
            });
        }

        function next() {
            render(index + 1);
        }
        function prev() {
            render(index - 1);
        }

        function startAutoplay() {
            stopAutoplay();
            autoplayId = window.setInterval(next, AUTOPLAY_MS);
        }
        function stopAutoplay() {
            if (autoplayId) window.clearInterval(autoplayId);
        }

        prevBtn && prevBtn.addEventListener('click', () => { prev(); startAutoplay(); });
        nextBtn && nextBtn.addEventListener('click', () => { next(); startAutoplay(); });
        dots.forEach((dot, i) => dot.addEventListener('click', () => { render(i); startAutoplay(); }));

        root.addEventListener('mouseenter', stopAutoplay);
        root.addEventListener('mouseleave', startAutoplay);
        root.addEventListener('focusin', stopAutoplay);
        root.addEventListener('focusout', startAutoplay);

        startAutoplay();
    }

    document.addEventListener('DOMContentLoaded', () => {
        header();
        mobileNav();
        dropdown();
        revealOnScroll();
        countUp();
        marquee();
        testimonialCarousel();
    });
})();