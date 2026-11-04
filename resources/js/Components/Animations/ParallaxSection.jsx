import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxSection({ children, className = '', speed = 0.3 }) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        gsap.to(el, {
            y: () => (speed * 200),
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        return () => ScrollTrigger.getAll().forEach(t => t.kill());
    }, [speed]);

    return <div ref={ref} className={className}>{children}</div>;
}
