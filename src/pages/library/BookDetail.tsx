import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api, type Book, type Author } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ArrowLeft, ShoppingCart } from "lucide-react";

export default function BookDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { buyBook } = useAuth();
    const [book, setBook] = useState<Book | null>(null);
    const [author, setAuthor] = useState<Author | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        const fetchData = async () => {
            const bookData = await api.getBookById(Number(id));
            setBook(bookData || null);

            if (bookData) {
                const authors = await api.getAuthors();
                const foundAuthor = authors.find(a => a.id === bookData.authorId);
                setAuthor(foundAuthor);
            }
            setLoading(false);
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="p-8 text-center animate-pulse">Cargando Detalles...</div>;
    if (!book) return <div className="p-8 text-center text-red-500">Libro no encontrado</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver
            </Button>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Image Placeholder */}
                <div className="md:col-span-1 bg-muted rounded-lg aspect-[2/3] overflow-hidden shadow-lg">
                    <img
                        src={book.image}
                        alt={book.title}
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Details */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <div className="flex justify-between items-start">
                            <h1 className="text-3xl font-bold tracking-tight mb-2">{book.title}</h1>
                            <span className="text-2xl font-bold text-green-600">{book.price} €</span>
                        </div>
                        <h2 className="text-xl text-muted-foreground mb-4">
                            Por {author?.name || "Autor Desconocido"}
                        </h2>
                        <div className="flex gap-2 mb-4">
                            <Badge variant="secondary">Año: {book.year}</Badge>
                            <Badge variant="outline">Cat ID: {book.categoryId}</Badge>
                        </div>
                    </div>

                    <div className="prose max-w-none text-muted-foreground">
                        <p>{book.description || "No hay descripción disponible para este título."}</p>
                    </div>

                    <div className="pt-6 border-t">
                        <Button size="lg" className="w-full md:w-auto" onClick={() => buyBook(book)}>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Comprar Libro
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
