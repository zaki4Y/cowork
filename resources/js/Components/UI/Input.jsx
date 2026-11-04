export default function Input({ label, error, ...props }) {
    return (
        <div>
            {label && <label className="block text-sm font-medium text-espresso-800 mb-1.5">{label}</label>}
            <input
                className={`w-full rounded-full border ${error ? 'border-[#B3402E]' : 'border-sand-300'} bg-cream-50 text-espresso-900 px-5 py-2.5 text-sm placeholder:text-sand-500 focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 transition-all duration-200 premium-ring`}
                {...props}
            />
            {error && <p className="mt-1.5 text-sm text-[#B3402E]">{error}</p>}
        </div>
    );
}
