import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function Purchases() {
    const { purchases } = useAuth();

    if (purchases.length === 0) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Aún no hay compras</h2>
                <p className="text-muted-foreground">Explora nuestra librería para encontrar tu próxima lectura.</p>
                <Button asChild>
                    <Link to="/library/top10">Explorar Librería</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Mis Compras</h1>
            <div className="grid gap-4">
                {purchases.map((book, index) => (
                    <Card key={`${book.id}-${index}`} className="flex flex-row items-center p-4 gap-4">
                        <div className="h-16 w-12 bg-muted rounded flex items-center justify-center flex-shrink-0 text-lg font-bold overflow-hidden">
                            {book.image ? (
                                <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                            ) : (
                                book.title.charAt(0)
                            )}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">Comprado el {new Date().toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                                <Link to={`/books/${book.id}`}>Ver</Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
