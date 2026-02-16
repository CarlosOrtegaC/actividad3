import { render, screen } from '@testing-library/react';
import { MainLayout } from '../components/layout/MainLayout';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const mockAuthValue = {
    user: { id: 1, name: 'User', username: 'user' },
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: true,
    reserveSpace: vi.fn(),
    purchases: [],
    buyBook: vi.fn(),
    reservations: [],
    addPurchase: vi.fn()
};

const mockUnauthValue = {
    ...mockAuthValue,
    user: null,
    isAuthenticated: false
};

describe('MainLayout', () => {
    it('renders header and renders Nexus title', () => {
        render(
            <AuthContext.Provider value={mockUnauthValue}>
                <MemoryRouter>
                    <MainLayout />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Nexus')).toBeInTheDocument();
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        // Use getAllByRole because there might be multiple "Acceder" links (desktop/mobile)
        expect(screen.getAllByText('Acceder').length).toBeGreaterThan(0);
    });

    it('renders user functionality when authenticated', () => {
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <MemoryRouter>
                    <MainLayout />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('User')).toBeInTheDocument();
        // Again, handle potential multiple "Salir" buttons
        expect(screen.getAllByText('Salir').length).toBeGreaterThan(0);
    });
});
