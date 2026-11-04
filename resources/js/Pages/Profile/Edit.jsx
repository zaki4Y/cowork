import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-sm uppercase tracking-[0.25em]" style={{ color: 'var(--color-text-secondary)' }}>
                    Membership — Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-14">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8 px-4">
                    <div className="rounded-[24px] p-6 sm:p-10" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="rounded-[24px] p-6 sm:p-10" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="rounded-[24px] p-6 sm:p-10" style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
