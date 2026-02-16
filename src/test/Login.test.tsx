import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Mock AuthContext
const mockLogin = vi.fn();
const mockAuthValue = {
    user: null,
    login: mockLogin,
    logout: vi.fn(),
    isAuthenticated: false,
    reserveSpace: vi.fn(),
    purchases: [],
    buyBook: vi.fn(),
    reservations: [],
    addPurchase: vi.fn()
};

describe('Login Page', () => {
    it('renders login form', () => {
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByLabelText(/usuario/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('calls login on submit', () => {
        mockLogin.mockReturnValue(true);
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'admin' } });
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'admin' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        expect(mockLogin).toHaveBeenCalledWith('admin', 'admin');
    });

    it('shows error on invalid credentials', () => {
        mockLogin.mockReturnValue(false);
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        fireEvent.change(screen.getByLabelText(/usuario/i), { target: { value: 'wrong' } });
        fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: 'wrong' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument();
    });
});
