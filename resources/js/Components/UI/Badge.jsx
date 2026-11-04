export default function Badge({ children, variant = 'default', className = '' }) {
    const styles = {
        default: 'bg-sand-200 text-espresso-800',
        success: 'bg-[#E6EFE4] text-[#3F5A38]',
        warning: 'bg-bronze-100 text-bronze-800',
        danger: 'bg-[#F6E3DE] text-[#8F3B2A]',
        info: 'bg-[#E8ECE4] text-[#47543E]',
        premium: 'bg-bronze-50 text-bronze-800 ring-1 ring-bronze-200',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-[0.08em] uppercase ${styles[variant]} ${className}`}>
            {children}
        </span>
    );
}
