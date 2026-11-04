import PrimaryButton from '@/Components/PrimaryButton';

import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Email Verification" />

            <div className="transition-colors duration-200">
                <div className="mb-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Thanks for signing up! Before getting started, could you verify
                    your email address by clicking on the link we just emailed to
                    you? If you didn't receive the email, we will gladly send you
                    another.
                </div>

                {status === 'verification-link-sent' && (
                    <div className="mb-4 text-sm font-medium text-[#3F5A38]">
                        A new verification link has been sent to the email address
                        you provided during registration.
                    </div>
                )}

                <form onSubmit={submit}>
                    <div className="mt-4 flex items-center justify-between">
                        <PrimaryButton disabled={processing}>
                            Resend Verification Email
                        </PrimaryButton>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-full text-sm underline underline-offset-4 transition-colors focus:outline-none focus:ring-2 focus:ring-bronze-500/40" style={{ color: 'var(--color-text-secondary)' }}
                        >
                            Log Out
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
}
