import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Counter({ end, suffix = '', duration = 2, className = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: end,
            duration,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.floor(obj.val)),
        });
    }, [isInView, end, duration]);

    return (
        <span ref={ref} className={className}>
            {count}{suffix}
        </span>
    );
}
