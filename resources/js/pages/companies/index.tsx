//import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Empresas',
        href: dashboard().url,
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
    //created_at: Date;
   // updated_at: Date;
}


export default function Index({companies}: {companies: Company[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Empresas" />
            {companies.length > 0 && (
               <Table>
                <TableCaption>Listado de empresas.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Código</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="text-right">Teléfono</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.id}</TableCell>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.code}</TableCell>
                        <TableCell>{company.email}</TableCell>
                        <TableCell className="text-right">{company.phone}</TableCell>
                        <TableCell>{company.address}</TableCell>
                        <TableCell>{company.active ? 'Activo' : 'Inactivo'}</TableCell>
                        <TableCell>
                            <Button> Editar</Button>
                            <Button>Eliminar</Button>
                            <Button>Detalles</Button>

                        </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
            )}

           
        </AppLayout>
    );
}
