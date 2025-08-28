import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

import {
  Table,
  TableBody,
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
  Building,
  Filter,
  Download,
  Users,
  Building2
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Secciones',
        href: '/sections',
    },
];

interface Company {
    id: number;
    name: string;
    code: string;
}

interface Section {
    id: number;
    name: string;
    code?: string;
    description?: string;
    manager?: string;
    employees_count?: number;
    active?: boolean;
    company: Company;
}

export default function Index({ sections }: { sections: Section[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

    // Filtrar departamentos
    const filteredSections = sections.filter(section => {
        const matchesSearch = 
            section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (section.code && section.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (section.manager && section.manager.toLowerCase().includes(searchTerm.toLowerCase())) ||
            section.company.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = 
            statusFilter === 'all' || 
            (statusFilter === 'active' && section.active) ||
            (statusFilter === 'inactive' && !section.active);

        return matchesSearch && matchesStatus;
    });

    const handleDelete = (section: Section) => {
        router.delete(`/sections/${section.id}`);
    };

    const SectionActions = ({ section }: { section: Section }) => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Abrir menú</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/sections/${section.id}`} className="flex items-center">
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/sections/${section.id}/edit`} className="flex items-center">
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
                                Esta acción no se puede deshacer. Se eliminará permanentemente el departamento 
                                <strong> {section.name}</strong> del sistema.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction 
                                onClick={() => handleDelete(section)}
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
            <Head title="Departamentos" />
            
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                    <Building className="h-6 w-6 text-purple-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Secciones</h1>
                    <Badge variant="secondary" className="ml-2">
                        {filteredSections.length} secciones
                    </Badge>
                </div>
                <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Exportar
                    </Button>
                    <Link href="/sections/create">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Nueva Sección
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
                            placeholder="Buscar por nombre, código, gerente o empresa..."
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
                            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="active">Activos</option>
                            <option value="inactive">Inactivos</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            {filteredSections.length === 0 ? (
                <div className="bg-white rounded-lg border shadow-sm p-12 text-center">
                    <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {sections.length === 0 ? 'No hay departamentos registrados' : 'No se encontraron departamentos'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {sections.length === 0 
                            ? 'Comienza agregando tu primer departamento al sistema.'
                            : 'Intenta ajustar los filtros de búsqueda.'
                        }
                    </p>
                    {sections.length === 0 && (
                        <Link href="/sections/create">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Crear Primer Sección
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
                                <TableHead className="font-semibold">Empresa</TableHead>
                                <TableHead className="font-semibold">Código</TableHead>
                                <TableHead className="font-semibold">Descripción</TableHead>
                                <TableHead className="font-semibold">Gerente</TableHead>
                                <TableHead className="font-semibold">Empleados</TableHead>
                                <TableHead className="font-semibold">Estado</TableHead>
                                <TableHead className="font-semibold text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSections.map((section) => (
                                <TableRow key={section.id} className="hover:bg-gray-50">
                                    <TableCell className="font-medium text-gray-900">
                                        #{section.id}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <Building className="h-4 w-4 text-purple-600" />
                                            </div>
                                            <span className="font-medium">{section.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center">
                                                <Building2 className="h-3 w-3 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-sm">{section.company.name}</div>
                                                <div className="text-xs text-gray-500">{section.company.code}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {section.code ? (
                                            <Badge variant="outline" className="font-mono">
                                                {section.code}
                                            </Badge>
                                        ) : (
                                            <span className="text-gray-400 text-sm">-</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="max-w-xs truncate" title={section.description}>
                                        {section.description || <span className="text-gray-400 text-sm">-</span>}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {section.manager || <span className="text-gray-400 text-sm">-</span>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-1">
                                            <Users className="h-4 w-4 text-gray-500" />
                                            <span className="font-medium">{section.employees_count || 0}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={section.active !== false ? "default" : "secondary"}
                                            className={section.active !== false 
                                                ? "bg-green-100 text-green-800 hover:bg-green-100" 
                                                : "bg-gray-100 text-gray-800"
                                            }
                                        >
                                            {section.active !== false ? 'Activo' : 'Inactivo'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <SectionActions section={section} />
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
