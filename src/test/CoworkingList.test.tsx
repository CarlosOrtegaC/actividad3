import { render, screen, waitFor } from '@testing-library/react';
import CoworkingList from '../pages/coworking/CoworkingList';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { api } from '@/services/api';

// Mock api
vi.mock('@/services/api', () => ({
    api: {
        getCoworkingSpaces: vi.fn(),
    }
}));

const mockSpaces = [
    { id: 1, name: 'Space 1', capacity: 10, hasProjector: true, hasWhiteboard: true, status: 'available', hourlyRate: 50 },
    { id: 2, name: 'Space 2', capacity: 5, hasProjector: false, hasWhiteboard: false, status: 'occupied', hourlyRate: 30 },
];

describe('CoworkingList Page', () => {
    beforeAll(() => {
        (api.getCoworkingSpaces as any).mockResolvedValue(mockSpaces);
    });

    it('renders coworking spaces list', async () => {
        render(
            <MemoryRouter>
                <CoworkingList />
            </MemoryRouter>
        );

        expect(screen.getByText(/cargando esp/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Space 1')).toBeInTheDocument();
            expect(screen.getByText('Space 2')).toBeInTheDocument();
        });
    });
});
