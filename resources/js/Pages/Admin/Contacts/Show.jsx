import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';

export default function ContactsShow({ inquiry }) {
    return (
        <AdminLayout>
            <Head title="Inquiry Details" />

            <PageTransition>
                <div className="transition-colors duration-200">
                    <div className="mb-6">
                        <h1 className="text-2xl font-heading font-bold text-espresso-900">Inquiry Details</h1>
                        <p className="mt-1 text-sm text-sand-600">View message from {inquiry.name}.</p>
                    </div>

                    <Card className="max-w-3xl p-6" hover={false}>
                        <dl className="space-y-6">
                            <div>
                                <dt className="text-sm font-medium text-sand-600">Name</dt>
                                <dd className="mt-1 text-base text-espresso-900">{inquiry.name}</dd>
                            </div>

                            <div>
                                <dt className="text-sm font-medium text-sand-600">Email</dt>
                                <dd className="mt-1 text-base text-espresso-900">
                                    <a href={`mailto:${inquiry.email}`} className="text-bronze-700 hover:underline">
                                        {inquiry.email}
                                    </a>
                                </dd>
                            </div>

                            {inquiry.phone && (
                                <div>
                                    <dt className="text-sm font-medium text-sand-600">Phone</dt>
                                    <dd className="mt-1 text-base text-espresso-900">
                                        <a href={`tel:${inquiry.phone}`} className="text-bronze-700 hover:underline">
                                            {inquiry.phone}
                                        </a>
                                    </dd>
                                </div>
                            )}

                            <div>
                                <dt className="text-sm font-medium text-sand-600">Message</dt>
                                <dd className="mt-2 text-base text-espresso-900 whitespace-pre-wrap leading-relaxed">
                                    {inquiry.message}
                                </dd>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <div>
                                    <dt className="text-sm font-medium text-sand-600">Received At</dt>
                                    <dd className="mt-1 text-base text-espresso-900">{inquiry.created_at}</dd>
                                </div>
                                <div>
                                    <dt className="text-sm font-medium text-sand-600">Status</dt>
                                    <dd className="mt-1">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            inquiry.is_read
                                                ? 'bg-emerald-100 text-emerald-700'
                                                : 'bg-bronze-100 text-bronze-700'
                                        }`}>
                                            <span className={`h-1.5 w-1.5 rounded-full ${
                                                inquiry.is_read ? 'bg-emerald-500' : 'bg-bronze-400'
                                            }`} />
                                            {inquiry.is_read ? 'Read' : 'Unread'}
                                        </span>
                                    </dd>
                                </div>
                            </div>
                        </dl>

                        <div className="mt-8 pt-6 border-t border-sand-200 ">
                            <Link href={route('admin.contacts.index')}>
                                <Button variant="secondary">Back to Inquiries</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </PageTransition>
        </AdminLayout>
    );
}
