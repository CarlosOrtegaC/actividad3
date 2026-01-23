import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/button";
import {
    BookOpen,
    Building2,
    LogOut,
    User,
    Home,
    ShoppingCart,
    List
} from "lucide-react";

export function MainLayout() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-primary">
                        <BookOpen className="h-6 w-6" />
                        <span>Nexxus</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link
                            to="/"
                            className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            Inicio
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link
                                    to="/library/top10"
                                    className={`hover:text-primary transition-colors ${isActive('/library') || isActive('/books') ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    Librería
                                </Link>
                                <Link
                                    to="/coworking"
                                    className={`hover:text-primary transition-colors ${isActive('/coworking') ? 'text-primary' : 'text-muted-foreground'}`}
                                >
                                    Coworking
                                </Link>
                            </>
                        )}
                    </nav>

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span className="hidden sm:inline">{user?.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" onClick={handleLogout}>
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Salir
                                </Button>
                            </>
                        ) : (
                            <Button asChild variant="default" size="sm">
                                <Link to="/login">Acceder</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 container mx-auto px-4 py-8 gap-8">
                {/* Sidebar - Only show for authenticated routes that are NOT the landing/login */}
                {isAuthenticated && location.pathname !== '/' && (
                    <aside className="w-64 flex-shrink-0 hidden lg:block space-y-6">
                        {isActive('/library') || isActive('/books') ? (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Menú Librería</h3>
                                <nav className="flex flex-col gap-2">
                                    <Button variant={location.pathname === '/library/top10' ? "secondary" : "ghost"} className="justify-start" asChild>
                                        <Link to="/library/top10"><Home className="mr-2 h-4 w-4" /> Top 10</Link>
                                    </Button>
                                    <Button variant={isActive('/books') && location.pathname !== '/books/purchases' ? "secondary" : "ghost"} className="justify-start" asChild>
                                        <Link to="/books"><List className="mr-2 h-4 w-4" /> Catálogo</Link>
                                    </Button>
                                    <Button variant={location.pathname === '/books/purchases' ? "secondary" : "ghost"} className="justify-start" asChild>
                                        <Link to="/books/purchases"><ShoppingCart className="mr-2 h-4 w-4" /> Mis Compras</Link>
                                    </Button>
                                </nav>
                            </div>
                        ) : isActive('/coworking') ? (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Menú Coworking</h3>
                                <nav className="flex flex-col gap-2">
                                    <Button variant={location.pathname === '/coworking' ? "secondary" : "ghost"} className="justify-start" asChild>
                                        <Link to="/coworking"><Building2 className="mr-2 h-4 w-4" /> Espacios</Link>
                                    </Button>
                                </nav>
                            </div>
                        ) : null}
                    </aside>
                )}

                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
