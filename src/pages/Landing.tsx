import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { BookOpen, Building2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Landing() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-4 py-12">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                    Bienvenido a Nexxus
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Tu centro universitario de recursos y espacios de coworking.
                    Descubre libros, reserva espacios y gestiona tu vida académica.
                </p>
                {!isAuthenticated && (
                    <div className="pt-4">
                        <Button asChild size="lg">
                            <Link to="/login">Empezar</Link>
                        </Button>
                    </div>
                )}
            </section>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-6 w-6 text-primary" />
                            Librería Universitaria
                        </CardTitle>
                        <CardDescription>
                            Accede a nuestra vasta colección de libros y revistas.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Top 10 Más Vendidos</li>
                            <li>Catálogo Categorizado</li>
                            <li>Filtros de Búsqueda</li>
                        </ul>
                        <Button variant="secondary" className="w-full" asChild>
                            <Link to={isAuthenticated ? "/library/top10" : "/login"}>
                                Explorar Libros <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-6 w-6 text-primary" />
                            Espacios Coworking
                        </CardTitle>
                        <CardDescription>
                            Encuentra el lugar perfecto para estudiar o colaborar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>Disponibilidad en Tiempo Real</li>
                            <li>Mapa Interactivo</li>
                            <li>Reservas Instantáneas</li>
                        </ul>
                        <Button variant="secondary" className="w-full" asChild>
                            <Link to={isAuthenticated ? "/coworking" : "/login"}>
                                Buscar Espacio <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
