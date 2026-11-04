import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import AdminLayout from '@/Layouts/AdminLayout';
import { ToastProvider } from '@/Components/ToastContext';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        );

        return page.then(module => {
            const defaultExport = module.default;

            if (name.startsWith('Auth/') || name.startsWith('Public/') || name === 'Welcome') {
                defaultExport.layout = defaultExport.layout || ((page) => <GuestLayout children={page} />);
            }

            return module;
        });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <>
                <div className="grain-overlay" />
                <ToastProvider>
                    <App {...props} />
                </ToastProvider>
            </>
        );
    },
    progress: {
        color: '#644424',
    },
});
