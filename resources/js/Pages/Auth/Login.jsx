import { Head } from '@inertiajs/react';
import { AuthUI } from '@/Components/UI/auth-ui';

function Login({ status }) {
    return (
        <>
            <Head title="Sign in" />
            {status && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg border bg-emerald-50 border-emerald-200 text-emerald-700 text-sm">
                    {status}
                </div>
            )}
            <AuthUI mode="signin" />
        </>
    );
}

Login.layout = (page) => page;

export default Login;
