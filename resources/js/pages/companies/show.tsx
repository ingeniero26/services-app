//import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
//import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
//import { dashboard } from '@/routes';
//import companies from '@/routes/companies';
import { type BreadcrumbItem } from '@/types';

import { Head, Link } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Detalles',
        href: '/companies/create'
    },
];

interface Company {
    id: number;
    name: string;
    code: string;
    email: string;
    phone: string;
    address: string;
    active: boolean;
}

export default function Show({company}: {company: Company}) {
  


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
           <Head title={`Empresa: ${company.name}`} />
            <div className="max-w-xl mx-auto mt-10 bg-white shadow rounded-lg p-8">
                <h1 className="text-2xl font-bold mb-6 text-blue-700">Detalles de la Empresa</h1>
                <div className="space-y-4">
                    <div>
                        <span className="font-semibold">Nombre:</span> {company.name}
                    </div>
                    <div>
                        <span className="font-semibold">Código:</span> {company.code}
                    </div>
                    <div>
                        <span className="font-semibold">Email:</span> {company.email}
                    </div>
                    <div>
                        <span className="font-semibold">Teléfono:</span> {company.phone}
                    </div>
                    <div>
                        <span className="font-semibold">Dirección:</span> {company.address}
                    </div>
                    <div>
                        <span className="font-semibold">Estado:</span> {company.active ? 'Activo' : 'Inactivo'}
                    </div>
                </div>
                <div className="mt-8 flex gap-4">
                    <Link href="/companies" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                        Volver al listado
                    </Link>
                    <Link href={`/companies/${company.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Editar
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}