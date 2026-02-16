import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, Projector, Monitor } from "lucide-react";

export default function CoworkingList() {
    const { data: spaces, loading, error } = useFetch(api.getCoworkingSpaces);

    if (loading) return <div className="p-8 text-center animate-pulse">Cargando Espacios...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error cargando datos</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Espacios Coworking</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {spaces?.map((space) => (
                    <Card key={space.id} className="flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
                        {/* Status Indicator Strip */}
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${space.status === 'available' ? 'bg-green-500' :
                            space.status === 'occupied' ? 'bg-red-500' : 'bg-yellow-500'
                            }`} />

                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant={
                                    space.status === 'available' ? 'default' :
                                        space.status === 'occupied' ? 'destructive' : 'secondary'
                                } className={space.status === 'available' ? 'bg-green-600 hover:bg-green-700' : ''}>
                                    {space.status === 'available' ? 'DISPONIBLE' : space.status === 'occupied' ? 'OCUPADO' : 'MANTENIMIENTO'}
                                </Badge>
                                <span className="font-bold">{space.hourlyRate} €/hr</span>
                            </div>
                            <CardTitle className="mt-2">{space.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" /> Capacidad: {space.capacity}
                            </div>
                            {space.hasProjector && (
                                <div className="flex items-center gap-2">
                                    <Projector className="h-4 w-4" /> Proyector Disponible
                                </div>
                            )}
                            {space.hasWhiteboard && (
                                <div className="flex items-center gap-2">
                                    <Monitor className="h-4 w-4" /> Pizarra Disponible
                                </div>
                            )}
                            {space.status === 'occupied' && (
                                <div className="mt-2 p-2 bg-muted rounded text-xs">
                                    Ocupado por: {space.currentOccupant} <br />
                                    Hasta: {space.nextAvailable ? new Date(space.nextAvailable).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Desconocido'}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild variant="outline" disabled={space.status === 'occupied'}>
                                {space.status === 'occupied' ? (
                                    <span>Ocupado</span>
                                ) : (
                                    <Link to={`/coworking/${space.id}`}>Ver y Reservar</Link>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
