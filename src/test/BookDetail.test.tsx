import { render, screen, waitFor } from '@testing-library/react';
import BookDetail from '../pages/library/BookDetail';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '@/services/api';

// Mock api
vi.mock('@/services/api', () => ({
    api: {
        getBookById: vi.fn(),
        getAuthors: vi.fn(), // If BookDetail uses it
        getCategories: vi.fn(), // If BookDetail uses it
    }
}));

const mockBook = { id: 1, title: 'Book 1', authorId: 1, categoryId: 1, year: 2023, price: 10, image: 'img1.jpg', description: 'desc 1' };
const mockAuthors = [{ id: 1, name: 'Author 1' }];
const mockCategories = [{ id: 1, name: 'Category 1' }];

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

describe('BookDetail Page', () => {
    beforeAll(() => {
        (api.getBookById as any).mockResolvedValue(mockBook);
        (api.getAuthors as any).mockResolvedValue(mockAuthors);
        (api.getCategories as any).mockResolvedValue(mockCategories);
    });

    it('renders book details', async () => {
        render(
            <AuthContext.Provider value={mockAuthValue}>
                <MemoryRouter initialEntries={['/books/1']}>
                    <Routes>
                        <Route path="/books/:id" element={<BookDetail />} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
            expect(screen.getByText('10 €')).toBeInTheDocument();
        });
    });
});
