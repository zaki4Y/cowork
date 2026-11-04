import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import Toast from '@/Components/Toast';

const ToastContext = createContext();

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = ++toastId;
        setToasts(prev => [...prev, { id, type, message }]);
        return id;
    }, []);

    const dismiss = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    const success = useCallback((msg) => addToast(msg, 'success'), [addToast]);
    const error = useCallback((msg) => addToast(msg, 'error'), [addToast]);
    const warning = useCallback((msg) => addToast(msg, 'warning'), [addToast]);
    const info = useCallback((msg) => addToast(msg, 'info'), [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, dismiss, success, error, warning, info }}>
            {children}
            <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                <div className="pointer-events-auto flex flex-col gap-2">
                    <AnimatePresence>
                        {toasts.map(t => (
                            <Toast key={t.id} {...t} onDismiss={dismiss} />
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </ToastContext.Provider>
    );
}

/**
 * This component listens for Inertia flash messages and shows toasts.
 * It MUST be rendered inside the Inertia <App> tree (i.e., inside a layout or page)
 * because it uses usePage().
 */
export function FlashToastListener() {
    const { addToast } = useToast();
    const { flash } = usePage().props;
    const shown = useRef({});

    useEffect(() => {
        if (!flash) return;
        const map = { success: 'success', error: 'error', warning: 'warning', info: 'info', status: 'info' };
        Object.entries(map).forEach(([key, type]) => {
            const msg = flash[key];
            if (msg && shown.current[key] !== msg) {
                shown.current[key] = msg;
                addToast(msg, type);
            }
        });
    }, [flash]);

    return null;
}

export function useToast() {
    return useContext(ToastContext);
}
