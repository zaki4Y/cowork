import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-bronze-400 bg-bronze-50 text-bronze-700 focus:border-bronze-600 focus:bg-bronze-100 focus:text-bronze-800'
                    : 'border-transparent text-sand-700 hover:border-sand-300 hover:bg-sand-100 hover:text-espresso-800 focus:border-sand-300 focus:bg-sand-100 focus:text-espresso-800'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
