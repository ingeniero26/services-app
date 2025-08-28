import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Globe, ArrowLeft } from 'lucide-react';

interface Country {
    id: number;
    name: string;
    active: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Países',
        href: '/countries',
    },
    {
        title: 'Editar País',
        href: '#',
    },
];

export default function EditCountry({ country }: { country: Country }) {
    const { data, setData, put, processing, errors } = useForm({
        name: country.name,
        active: country.active,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/countries/${country.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar País - ${country.name}`} />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-green-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Editar País</h1>
                </div>
                <Link href="/countries">
                    <Button variant="outline">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Button>
                </Link>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-lg border shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nombre */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre del País *</Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej: Colombia"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        {/* Estado */}
                        <div className="space-y-2">
                            <Label>Estado</Label>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="active"
                                    checked={data.active}
                                    onCheckedChange={(checked) => setData('active', !!checked)}
                                />
                                <Label htmlFor="active" className="text-sm font-normal">
                                    País activo
                                </Label>
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                        <Link href="/countries">
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar País'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}