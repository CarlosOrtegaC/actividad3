import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, type CoworkingSpace } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";

export default function Reservation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { reserveSpace } = useAuth();
    const [space, setSpace] = useState<CoworkingSpace | null>(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        if (!id) return;
        api.getSpaceById(Number(id)).then(data => setSpace(data || null));
    }, [id]);

    const handleReserve = (e: React.FormEvent) => {
        e.preventDefault();
        if (space && date && time) {
            // Simulate reservation logic
            reserveSpace(space.id, `${date} ${time}`);
            navigate('/coworking');
        }
    };

    if (!space) return <div>Cargando...</div>;

    return (
        <div className="max-w-md mx-auto w-full px-4 sm:px-0">
            <Card>
                <CardHeader>
                    <CardTitle>Reservar {space.name}</CardTitle>
                </CardHeader>
                <form onSubmit={handleReserve}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Fecha</Label>
                            <Input
                                id="date"
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Hora</Label>
                            <Input
                                id="time"
                                type="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Confirmar Reserva</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
