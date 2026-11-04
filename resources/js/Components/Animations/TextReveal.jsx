import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({ children, className = '', as: Tag = 'div' }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const chars = el.textContent.split('');
        el.innerHTML = chars.map(c => `<span class="char" style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`).join('');
        const spans = el.querySelectorAll('.char');

        gsap.fromTo(spans,
            { opacity: 0, y: 20, rotateX: -90 },
            {
                opacity: 1, y: 0, rotateX: 0,
                stagger: 0.02,
                duration: 0.6,
                ease: 'back.out(1.7)',
                scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
            }
        );

        return () => gsap.killTweensOf(spans);
    }, []);

    return <Tag ref={ref} className={className}>{children}</Tag>;
}
