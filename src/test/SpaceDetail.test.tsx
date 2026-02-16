import { render, screen, waitFor } from '@testing-library/react';
import SpaceDetail from '../pages/coworking/SpaceDetail';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { api } from '@/services/api';

// Mock api
vi.mock('@/services/api', () => ({
    api: {
        getSpaceById: vi.fn(),
    }
}));

const mockSpace = { id: 1, name: 'Space 1', capacity: 10, hasProjector: true, hasWhiteboard: true, status: 'available', hourlyRate: 50, description: 'desc space' };

describe('SpaceDetail Page', () => {
    beforeAll(() => {
        (api.getSpaceById as any).mockResolvedValue(mockSpace);
    });

    it('renders space details', async () => {
        render(
            <MemoryRouter initialEntries={['/coworking/1']}>
                <Routes>
                    <Route path="/coworking/:id" element={<SpaceDetail />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Space 1')).toBeInTheDocument();
            expect(screen.getByText('50 €/hr')).toBeInTheDocument();
        });
    });
});
