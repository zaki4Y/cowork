export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full bg-[#B3402E] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-cream-50 transition duration-150 ease-in-out hover:bg-[#9A3526] focus:outline-none focus:ring-2 focus:ring-[#B3402E]/40 focus:ring-offset-2 active:bg-[#8A2F1F] ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
