import AppLayout from '@/layouts/app-layout';
//import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

import {
  Table,
  TableBody,
  //TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Building2,
  Filter,
  Download
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Empresas',
        href: '/companies',
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

export default function Index({ companies }: { companies: Company[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    // Filtrar empresas
    const filteredCompanies = companies.filter(company => {
        const matchesSearch = 
            company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            company.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
            statusFilter === 'all' || 
            (statusFilter === 'active' && company.active) ||
            (statusFilter === 'inactive' && !company.active);

        return matchesSearch && matchesStatus;
    });

    const handleDelete = (company: Company) => {
        router.delete(`/companies/${company.id}`);
    };

    const CompanyActions = ({ company }: { company: Company }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/companies/${company.id}`} className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/companies/${company.id}/edit`} className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                    </Link>
                </DropdownMenuItem>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente la empresa 
                                <strong> {company.name}</strong> del sistema.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={() => handleDelete(company)}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Empresas" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Building2 className="h-6 w-6 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Empresas</h1>
                    <Badge variant="secondary" className="ml-2">
                        {filteredCompanies.length} empresas
                    </Badge>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                    <Link href="/companies/create">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva Empresa
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filtros y búsqueda */}
            <div className="bg-white p-4 rounded-lg border shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Buscar por nombre, código o email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
                            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="active">Activas</option>
                            <option value="inactive">Inactivas</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            {filteredCompanies.length === 0 ? (
                <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
                    <Building2 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {companies.length === 0 ? 'No hay empresas registradas' : 'No se encontraron empresas'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {companies.length === 0 
                            ? 'Comienza agregando tu primera empresa al sistema.'
                            : 'Intenta ajustar los filtros de búsqueda.'
                        }
                    </p>
                    {companies.length === 0 && (
                        <Link href="/companies/create">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Crear Primera Empresa
                            </Button>
                        </Link>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="font-semibold">ID</TableHead>
                                <TableHead className="font-semibold">Nombre</TableHead>
                                <TableHead className="font-semibold">Código</TableHead>
                                <TableHead className="font-semibold">Email</TableHead>
                                <TableHead className="font-semibold">Teléfono</TableHead>
                                <TableHead className="font-semibold">Dirección</TableHead>
                                <TableHead className="font-semibold">Estado</TableHead>
                                <TableHead className="font-semibold text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCompanies.map((company) => (
                                <TableRow key={company.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium text-gray-900">
                                        #{company.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Building2 className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <span className="font-medium">{company.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="font-mono">
                                            {company.code}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-blue-600">
                                        <a href={`mailto:${company.email}`} className="hover:underline">
                                            {company.email}
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <a href={`tel:${company.phone}`} className="hover:text-blue-600">
                                            {company.phone}
                                        </a>
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate" title={company.address}>
                                        {company.address}
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={company.active ? "default" : "secondary"}
                                            className={company.active 
                                                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                                : "bg-gray-100 text-gray-800"
                                            }
                                        >
                                            {company.active ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <CompanyActions company={company} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}