import { useState, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { api } from "../../services/api";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";


export default function BookList() {
    const { data: books, loading: loadingBooks } = useFetch(api.getBooks);
    const { data: categories, loading: loadingCats } = useFetch(api.getCategories);
    const { data: authors, loading: loadingAuthors } = useFetch(api.getAuthors);

    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [yearFilter, setYearFilter] = useState<string>("all");

    // Extract unique years
    const years = useMemo(() => {
        if (!books) return [];
        const uniqueYears = Array.from(new Set(books.map(b => b.year)));
        return uniqueYears.sort((a, b) => b - a);
    }, [books]);

    const filteredBooks = useMemo(() => {
        if (!books) return [];
        return books.filter(book => {
            const matchCategory = selectedCategory === "all" || book.categoryId.toString() === selectedCategory;
            const matchYear = yearFilter === "all" || book.year.toString() === yearFilter;
            const matchSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchYear && matchSearch;
        });
    }, [books, selectedCategory, yearFilter, searchQuery]);

    const getAuthorName = (authorId: number) => {
        return authors?.find(a => a.id === authorId)?.name || "Desconocido";
    };

    if (loadingBooks || loadingCats || loadingAuthors) return <div className="p-8 text-center animate-pulse">Cargando Catálogo...</div>;

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-64 space-y-6">
                <div>
                    <h3 className="font-semibold mb-4">Buscar</h3>
                    <Input
                        placeholder="Buscar por título..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Categorías</h3>
                    <div className="flex flex-col gap-2">
                        <Button
                            variant={selectedCategory === "all" ? "secondary" : "ghost"}
                            className="justify-start h-8 px-2"
                            onClick={() => setSelectedCategory("all")}
                        >
                            Todas
                        </Button>
                        {categories?.map(cat => (
                            <Button
                                key={cat.id}
                                variant={selectedCategory === cat.id.toString() ? "secondary" : "ghost"}
                                className="justify-start h-8 px-2"
                                onClick={() => setSelectedCategory(cat.id.toString())}
                            >
                                {cat.name}
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold mb-4">Año de Publicación</h3>
                    <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccionar Año" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            {years.map(year => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Catálogo</h1>
                    <span className="text-muted-foreground">{filteredBooks.length} resultados</span>
                </div>

                {filteredBooks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        No se encontraron libros.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map((book) => (
                            <Card key={book.id} className="flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden">
                                <div className="aspect-[2/3] w-full bg-muted">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="object-cover w-full h-full"
                                    />
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
                                        {book.description || "Sin descripción."}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" asChild>
                                        <Link to={`/books/${book.id}`}>Ver Detalles</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
