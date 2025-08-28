import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, ArrowLeft, Edit, Calendar } from 'lucide-react';

interface Country {
    id: number;
    name: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Países',
        href: '/countries',
    },
    {
        title: 'Detalles del País',
        href: '#',
    },
];

export default function ShowCountry({ country }: { country: Country }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`País - ${country.name}`} />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-green-600" />
                    <h1 className="text-2xl font-bold text-gray-900">{country.name}</h1>
                    <Badge 
                        variant={country.active ? "default" : "secondary"}
                        className={country.active 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-gray-100 text-gray-800"
                        }
                    >
                        {country.active ? 'Activo' : 'Inactivo'}
                    </Badge>
                </div>
                <div className="flex items-center space-x-3">
                    <Link href={`/countries/${country.id}/edit`}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                        </Button>
                    </Link>
                    <Link href="/countries">
                        <Button variant="outline">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Información del País */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Información básica */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                            Información Básica
                        </h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500">ID</label>
                                <p className="text-gray-900">#{country.id}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500">Nombre</label>
                                <p className="text-gray-900 font-medium">{country.name}</p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500">Estado</label>
                                <div className="mt-1">
                                    <Badge 
                                        variant={country.active ? "default" : "secondary"}
                                        className={country.active 
                                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                            : "bg-gray-100 text-gray-800"
                                        }
                                    >
                                        {country.active ? 'Activo' : 'Inactivo'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fechas */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                            Fechas
                        </h3>
                        
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium text-gray-500 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Fecha de Creación
                                </label>
                                <p className="text-gray-900">
                                    {new Date(country.created_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            
                            <div>
                                <label className="text-sm font-medium text-gray-500 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Última Actualización
                                </label>
                                <p className="text-gray-900">
                                    {new Date(country.updated_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}