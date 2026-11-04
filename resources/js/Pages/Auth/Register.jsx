import { Head } from '@inertiajs/react';
import { AuthUI } from '@/Components/UI/auth-ui';

function Register() {
    return (
        <>
            <Head title="Sign up" />
            <AuthUI mode="signup" />
        </>
    );
}

Register.layout = (page) => page;

export default Register;
