import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, type CoworkingSpace } from "../../services/api";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, CalendarCheck } from "lucide-react";

export default function SpaceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [space, setSpace] = useState<CoworkingSpace | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        api.getSpaceById(Number(id)).then(data => {
            setSpace(data || null);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <div className="p-8 text-center animate-pulse">Cargando Detalles...</div>;
    if (!space) return <div className="p-8 text-center text-red-500">Espacio no encontrado</div>;

    const translateStatus = (status: string) => {
        switch (status) {
            case 'available': return 'DISPONIBLE';
            case 'occupied': return 'OCUPADO';
            case 'maintenance': return 'MANTENIMIENTO';
            default: return status;
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>

            <div className="bg-card rounded-lg border shadow-sm p-6 space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{space.name}</h1>
                        <Badge variant="outline" className="mt-2">Capacidad: {space.capacity} Personas</Badge>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{space.hourlyRate} €/hr</div>
                        <Badge variant={space.status === 'available' ? 'default' : 'destructive'}
                            className={`mt-1 ${space.status === 'available' ? 'bg-green-600' : ''}`}>
                            {translateStatus(space.status)}
                        </Badge>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-semibold">Comodidades</h3>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {space.hasProjector && <li>Proyector</li>}
                            {space.hasWhiteboard && <li>Pizarra</li>}
                            <li>WiFi de Alta Velocidad</li>
                            <li>Tomas de Corriente</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-6 border-t flex gap-4">
                    <Button size="lg" className="w-full md:w-auto" asChild disabled={space.status !== 'available'}>
                        <Link to={`/coworking/reserve/${space.id}`}>
                            <CalendarCheck className="mr-2 h-4 w-4" />
                            Reservar Ahora
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
