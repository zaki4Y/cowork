export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-full border border-sand-300 bg-cream-50 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-espresso-800 transition duration-150 ease-in-out hover:bg-sand-200 focus:outline-none focus:ring-2 focus:ring-bronze-500/40 focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
