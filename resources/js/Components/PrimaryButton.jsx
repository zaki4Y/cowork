export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-full bg-espresso-700 px-6 py-2.5 text-sm font-medium tracking-wide text-cream-50 transition-all duration-200 hover:bg-espresso-800 active:scale-[0.98] ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
