import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Building, 
  ArrowLeft, 
  Save,
  Building2,
  User,
  FileText,
  Hash
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secciones',
        href: '/sections',
    },
    {
        title: 'Crear Secciones',
        href: '/sections/create',
    },
];

interface Company {
    id: number;
    name: string;
    code: string;
}

interface CreateProps {
    companies: Company[];
}

export default function Create({ companies }: CreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
        manager: '',
        company_id: '',
        active: true,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        post('/sections', {
            onSuccess: () => {
                // Redirect handled by controller
            },
            onError: (errors) => {
                console.error('Error al crear el departamento:', errors);
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Seccion" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Building className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Crear Sección</h1>
                        <p className="text-gray-600">Agrega un nuevo sección al sistema</p>
                    </div>
                </div>
                <Link href="/departments">
                    <Button variant="outline" className="flex items-center space-x-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Volver</span>
                    </Button>
                </Link>
            </div>

            <div className="max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <Building2 className="h-5 w-5 text-purple-600" />
                            <span>Información de la Sección</span>
                        </CardTitle>
                        <CardDescription>
                            Complete los datos del nuevo sección. Los campos marcados con * son obligatorios.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Empresa */}
                            <div className="space-y-2">
                                <Label htmlFor="company_id" className="flex items-center space-x-2">
                                    <Building2 className="h-4 w-4 text-gray-500" />
                                    <span>Empresa *</span>
                                </Label>
                                <Select 
                                    value={data.company_id} 
                                    onValueChange={(value) => setData('company_id', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona una empresa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {companies.map((company) => (
                                            <SelectItem key={company.id} value={company.id.toString()}>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium">{company.name}</span>
                                                    <span className="text-gray-500 text-sm">({company.code})</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.company_id && (
                                    <p className="text-sm text-red-600">{errors.company_id}</p>
                                )}
                            </div>

                            {/* Nombre */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center space-x-2">
                                    <Building className="h-4 w-4 text-gray-500" />
                                    <span>Nombre del Departamento *</span>
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Ej: Recursos Humanos, Ventas, IT..."
                                    className="w-full"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            {/* Código */}
                            <div className="space-y-2">
                                <Label htmlFor="code" className="flex items-center space-x-2">
                                    <Hash className="h-4 w-4 text-gray-500" />
                                    <span>Código</span>
                                </Label>
                                <Input
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    placeholder="Ej: RRHH, VEN, IT..."
                                    className="w-full"
                                />
                                {errors.code && (
                                    <p className="text-sm text-red-600">{errors.code}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Código único para identificar el departamento
                                </p>
                            </div>

                            {/* Gerente */}
                            <div className="space-y-2">
                                <Label htmlFor="manager" className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                    <span>Gerente/Responsable</span>
                                </Label>
                                <Input
                                    id="manager"
                                    type="text"
                                    value={data.manager}
                                    onChange={(e) => setData('manager', e.target.value)}
                                    placeholder="Nombre del gerente o responsable"
                                    className="w-full"
                                />
                                {errors.manager && (
                                    <p className="text-sm text-red-600">{errors.manager}</p>
                                )}
                            </div>

                            {/* Descripción */}
                            <div className="space-y-2">
                                <Label htmlFor="description" className="flex items-center space-x-2">
                                    <FileText className="h-4 w-4 text-gray-500" />
                                    <span>Descripción</span>
                                </Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe las funciones y responsabilidades del departamento..."
                                    className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    rows={4}
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            {/* Estado Activo */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="active"
                                    checked={data.active}
                                    onCheckedChange={(checked) => setData('active', checked as boolean)}
                                />
                                <Label htmlFor="active" className="text-sm font-medium">
                                    Sección activo
                                </Label>
                                {errors.active && (
                                    <p className="text-sm text-red-600">{errors.active}</p>
                                )}
                            </div>

                            {/* Botones */}
                            <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                                <Link href="/departments">
                                    <Button variant="outline" type="button">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-purple-600 hover:bg-purple-700"
                                >
                                    {processing ? (
                                        <div className="flex items-center space-x-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Guardando...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Save className="h-4 w-4" />
                                            <span>Crear Sección</span>
                                        </div>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}