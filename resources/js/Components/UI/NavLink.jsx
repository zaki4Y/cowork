import { Link } from '@inertiajs/react';

export default function NavLink({ href, active, children }) {
    return (
        <Link
            href={href}
            className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                active
                    ? 'text-ochre-700 bg-ochre-50'
                    : 'text-base-500 hover:text-base-800 hover:bg-base-100'
            }`}
        >
            {children}
            {active && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-ochre-600 rounded-full" />
            )}
        </Link>
    );
}
