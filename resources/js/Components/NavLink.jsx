import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-bronze-400 text-espresso-900 focus:border-bronze-600'
                    : 'border-transparent text-sand-600 hover:border-sand-300 hover:text-espresso-800 focus:border-sand-300 focus:text-espresso-800') +
                className
            }
        >
            {children}
        </Link>
    );
}
