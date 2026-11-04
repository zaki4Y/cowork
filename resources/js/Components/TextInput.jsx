import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-full border border-sand-300 bg-cream-50 text-espresso-900 px-5 py-2.5 text-sm placeholder:text-sand-400 focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 premium-ring transition-all duration-200 ' +
                className
            }
            ref={localRef}
        />
    );
});
