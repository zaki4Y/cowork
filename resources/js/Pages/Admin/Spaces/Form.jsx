import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PageTransition from '@/Components/Animations/PageTransition';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';
import SafeImage from '@/Components/SafeImage';

export default function SpacesForm({ space, amenities }) {
    const isEdit = !!space;

    const { data, setData, post, put, processing, errors } = useForm({
        name: space?.name || '',
        description: space?.description || '',
        type: space?.type || 'hot_desk',
        capacity: space?.capacity || '',
        price_per_hour: space?.price_per_hour || '',
        price_per_day: space?.price_per_day || '',
        price_per_month: space?.price_per_month || '',
        images: null,
        is_available: space?.is_available ?? true,
        amenities: space?.amenities?.map((a) => a.id) || [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.spaces.update', space.id));
        } else {
            post(route('admin.spaces.store'));
        }
    };

    const toggleAmenity = (id) => {
        setData(
            'amenities',
            data.amenities.includes(id)
                ? data.amenities.filter((a) => a !== id)
                : [...data.amenities, id],
        );
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? 'Edit Space' : 'Create Space'} />

            <PageTransition>
                <div className="transition-colors duration-200">
                    <div className="mb-6">
                        <h1 className="text-2xl font-heading font-bold text-espresso-900">
                            {isEdit ? 'Edit Space' : 'Create New Space'}
                        </h1>
                        <p className="mt-1 text-sm text-sand-600">
                            {isEdit ? 'Update the space details below.' : 'Fill in the details to add a new space.'}
                        </p>
                    </div>

                    <Card className="max-w-3xl p-6" hover={false}>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                label="Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                            />

                            <div>
                                <label className="block text-sm font-medium text-espresso-800 mb-1.5">Description</label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className={`w-full rounded-xl border ${errors.description ? 'border-[#B3402E]' : 'border-sand-300'} bg-cream-50 text-espresso-900 px-4 py-2.5 text-sm placeholder:text-sand-500 focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 premium-ring transition-all duration-200`}
                                />
                                {errors.description && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-espresso-800 mb-1.5">Images</label>
                                {space?.images?.[0] && !data.images && (
                                    <div className="mb-3 rounded-xl overflow-hidden w-full max-w-sm border border-sand-300">
                                        <SafeImage src={space.images[0]} alt="" className="w-full h-40 object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => setData('images', Array.from(e.target.files))}
                                    className={`w-full rounded-xl border ${errors.images ? 'border-[#B3402E]' : 'border-sand-300'} bg-cream-50 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-bronze-50 file:text-bronze-700 hover:file:bg-bronze-100  transition-all duration-200`}
                                />
                                {errors.images && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.images}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-espresso-800 mb-1.5">Type</label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full rounded-xl border border-sand-300 bg-cream-50 text-espresso-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-bronze-500/30 focus:border-bronze-500 premium-ring transition-all duration-200"
                                >
                                    <option value="hot_desk">Hot Desk</option>
                                    <option value="private_office">Private Office</option>
                                    <option value="meeting_room">Meeting Room</option>
                                    <option value="virtual_office">Virtual Office</option>
                                </select>
                                {errors.type && <p className="mt-1.5 text-sm text-[#B3402E]">{errors.type}</p>}
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <Input
                                    label="Capacity"
                                    type="number"
                                    min="1"
                                    value={data.capacity}
                                    onChange={(e) => setData('capacity', e.target.value)}
                                    error={errors.capacity}
                                />
                            </div>

                            <div className="grid gap-6 sm:grid-cols-3">
                                <Input
                                    label="Price per Hour ($)"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price_per_hour}
                                    onChange={(e) => setData('price_per_hour', e.target.value)}
                                    error={errors.price_per_hour}
                                />
                                <Input
                                    label="Price per Day ($)"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price_per_day}
                                    onChange={(e) => setData('price_per_day', e.target.value)}
                                    error={errors.price_per_day}
                                />
                                <Input
                                    label="Price per Month ($)"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price_per_month}
                                    onChange={(e) => setData('price_per_month', e.target.value)}
                                    error={errors.price_per_month}
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_available"
                                    checked={data.is_available}
                                    onChange={(e) => setData('is_available', e.target.checked)}
                                    className="h-4 w-4 rounded border-sand-300  text-bronze-600 focus:ring-bronze-500/40"
                                />
                                <label htmlFor="is_available" className="text-sm font-medium text-espresso-800">
                                    Available for booking
                                </label>
                            </div>

                            {amenities?.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-espresso-800 mb-2">Amenities</label>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {amenities.map((amenity) => (
                                            <label key={amenity.id} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg admin-row transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={data.amenities.includes(amenity.id)}
                                                    onChange={() => toggleAmenity(amenity.id)}
                                                    className="h-4 w-4 rounded border-sand-300  text-bronze-600 focus:ring-bronze-500/40"
                                                />
                                                <span className="text-sm text-espresso-800">{amenity.name}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 pt-4 border-t border-sand-200 ">
                                <Button variant="primary" type="submit" disabled={processing}>
                                    {isEdit ? 'Update Space' : 'Create Space'}
                                </Button>
                                <Link href={route('admin.spaces.index')}>
                                    <Button variant="secondary" type="button">Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </Card>
                </div>
            </PageTransition>
        </AdminLayout>
    );
}
