import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Reservation from '../pages/coworking/Reservation';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '@/services/api';

// Mock api
vi.mock('@/services/api', () => ({
    api: {
        getSpaceById: vi.fn(),
    }
}));

const mockSpace = { id: 1, name: 'Space 1', capacity: 10, hasProjector: true, hasWhiteboard: true, status: 'available', hourlyRate: 50 };

const mockReserveSpace = vi.fn();
const mockAuthValue = {
    user: { id: 1, name: 'User', username: 'user' },
    login: vi.fn(),
    logout: vi.fn(),
    isAuthenticated: true,
    reserveSpace: mockReserveSpace,
    purchases: [],
    buyBook: vi.fn(),
    reservations: [],
    addPurchase: vi.fn()
};

describe('Reservation Page', () => {
    beforeAll(() => {
        (api.getSpaceById as any).mockResolvedValue(mockSpace);
    });

    it('renders reservation form', async () => {
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <MemoryRouter initialEntries={['/reservation/1']}>
                    <Routes>
                        <Route path="/reservation/:id" element={<Reservation />} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText(/reservar space 1/i)).toBeInTheDocument();
        });
    });

    it('submits reservation', async () => {
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <MemoryRouter initialEntries={['/reservation/1']}>
                    <Routes>
                        <Route path="/reservation/:id" element={<Reservation />} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        await waitFor(() => expect(screen.getByText(/reservar space 1/i)).toBeInTheDocument());

        fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: '2023-10-27' } });
        fireEvent.change(screen.getByLabelText(/hora/i), { target: { value: '10:00' } });

        fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));

        expect(mockReserveSpace).toHaveBeenCalled();
    });
});
