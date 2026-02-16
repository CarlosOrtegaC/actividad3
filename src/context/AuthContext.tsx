import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Book } from '../services/api';

interface User {
    username: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
    purchases: Book[];
    buyBook: (book: Book) => void;
    reservations: { spaceId: number, date: string }[];
    reserveSpace: (spaceId: number, date: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [purchases, setPurchases] = useState<Book[]>([]);
    const [reservations, setReservations] = useState<{ spaceId: number, date: string }[]>([]);

    const login = (username: string, password: string) => {
        // Hardcoded check as requested
        if (username === 'admin' && password === 'admin') {
            setUser({ username, name: 'Admin User' });
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        setPurchases([]);
        setReservations([]);
    };

    const buyBook = (book: Book) => {
        setPurchases(prev => [...prev, book]);
        alert(`Has comprado: ${book.title}`);
    };

    const reserveSpace = (spaceId: number, date: string) => {
        setReservations(prev => [...prev, { spaceId, date }]);
        alert(`Reserva confirmada para el espacio #${spaceId} el ${date}`);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, purchases, buyBook, reservations, reserveSpace }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
