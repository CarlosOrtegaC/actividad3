import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function Top10() {
    const { data: books, loading: loadingBooks, error } = useFetch(api.getTop10Books);
    const { data: authors, loading: loadingAuthors } = useFetch(api.getAuthors);

    const getAuthorName = (authorId: number) => {
        return authors?.find(a => a.id === authorId)?.name || "Desconocido";
    };

    if (loadingBooks || loadingAuthors) return <div className="p-8 text-center animate-pulse">Cargando Top 10...</div>;
    if (error) return <div className="p-8 text-center text-red-500">Error cargando datos</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Top 10 Más Vendidos</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books?.map((book, index) => (
                    <Card key={book.id} className="flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden">
                        <div className="aspect-[2/3] w-full relative bg-muted">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="object-cover w-full h-full"
                            />
                            <Badge variant="secondary" className="absolute top-2 left-2 shadow-sm">#{index + 1}</Badge>
                        </div>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-bold text-green-600 ml-auto">{book.price} €</span>
                            </div>
                            <CardTitle className="line-clamp-1 text-lg mb-1" title={book.title}>
                                <Link to={`/books/${book.id}`} className="hover:underline">
                                    {book.title}
                                </Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 pt-0 text-sm space-y-1">
                            <div className="font-medium">
                                Nombre del autor: <span className="text-muted-foreground">{getAuthorName(book.authorId)}</span>
                            </div>
                            <div className="font-medium">
                                Año de Publicación : <span className="text-muted-foreground">{book.year}</span>
                            </div>
                            <p className="text-muted-foreground line-clamp-3 mt-2">
                                {book.description || "Sin descripción disponible."}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild variant="outline">
                                <Link to={`/books/${book.id}`}>Ver Detalles</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
