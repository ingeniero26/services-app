//import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
//import { dashboard } from '@/routes';
//import companies from '@/routes/companies';
import { type BreadcrumbItem } from '@/types';

import { Head, useForm } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Crear',
        href: '/companies/create'
    },
];

export default function Create() {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        code: '',
        email: '',
        phone: '',
        address: '',
        active: true,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Opcional: Validación antes del envío
        if (!data.name || !data.code || !data.email) {
            alert('Campos requeridos faltantes');
            return;
        }

        post('/companies', {
            onSuccess: (response) => {
                // El reset automático del formulario ya lo maneja Inertia con useForm
                console.log('Empresa creada exitosamente:', response);
            },
            onError: (errors) => {
                console.error('Error al crear la empresa:', errors);
            },
            onFinish: () => {
                console.log('Petición finalizada');
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Empresa" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='space-y-2'>
                        <label htmlFor='name' className='block font-medium'>Nombre: </label>
                        <input 
                            id='name'
                            type='text'
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='code' className='block font-medium'>Código: </label>
                        <input 
                            id='code'
                            type='text'
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        {errors.code && <span className='text-red-500 text-sm'>{errors.code}</span>}
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='email' className='block font-medium'>Email: </label>
                        <input 
                            id='email'
                            type='email'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            required
                        />
                        {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='phone' className='block font-medium'>Teléfono: </label>
                        <input 
                            id='phone'
                            type='text'
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                        {errors.phone && <span className='text-red-500 text-sm'>{errors.phone}</span>}
                    </div>

                    <div className='space-y-2'>
                        <label htmlFor='address' className='block font-medium'>Dirección: </label>
                        <textarea 
                            id='address'
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            rows={3}
                        />
                        {errors.address && <span className='text-red-500 text-sm'>{errors.address}</span>}
                    </div>

                    <div className='flex items-center space-x-2'>
                        <input 
                            id='active'
                            type='checkbox' 
                            checked={data.active}
                            onChange={(e) => setData('active', e.target.checked)}
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500'
                        />
                        <label htmlFor='active' className='font-medium'>Activo</label>
                        {errors.active && <span className='text-red-500 text-sm'>{errors.active}</span>}
                    </div>

                    <Button 
                        type='submit' 
                        disabled={processing}
                        className='w-full sm:w-auto'
                    >
                        {processing ? 'Guardando...' : 'Guardar'}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}