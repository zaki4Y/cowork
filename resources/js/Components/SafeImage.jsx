import { useState } from 'react';

const FALLBACK_GRADIENT = 'bg-gradient-to-br from-sand-200 to-sand-300';

export default function SafeImage({ src, alt, className = '', fallback, children }) {
    const [failed, setFailed] = useState(false);

    if (failed || !src) {
        return (
            <div className={`${FALLBACK_GRADIENT} ${className}`}>
                {fallback || children || null}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setFailed(true)}
            loading="lazy"
        />
    );
}
