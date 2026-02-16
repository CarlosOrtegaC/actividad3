import { render, screen, waitFor } from '@testing-library/react';
import BookList from '../pages/library/BookList';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { api } from '@/services/api';

// Mock api
vi.mock('@/services/api', () => ({
    api: {
        getBooks: vi.fn(),
        getCategories: vi.fn(),
        getAuthors: vi.fn(),
    }
}));

const mockBooks = [
    { id: 1, title: 'Book 1', authorId: 1, categoryId: 1, year: 2023, price: 10, image: 'img1.jpg', description: 'desc 1' },
    { id: 2, title: 'Book 2', authorId: 2, categoryId: 2, year: 2022, price: 20, image: 'img2.jpg', description: 'desc 2' },
];

const mockCategories = [
    { id: 1, name: 'Fiction' },
    { id: 2, name: 'Science' }
];

const mockAuthors = [
    { id: 1, name: 'Author 1' },
    { id: 2, name: 'Author 2' }
];

describe('BookList Page', () => {
    beforeAll(() => {
        (api.getBooks as any).mockResolvedValue(mockBooks);
        (api.getCategories as any).mockResolvedValue(mockCategories);
        (api.getAuthors as any).mockResolvedValue(mockAuthors);
    });

    it('renders book list', async () => {
        render(
            <MemoryRouter>
                <BookList />
            </MemoryRouter>
        );

        expect(screen.getByText(/cargando catálogo/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Book 1')).toBeInTheDocument();
            expect(screen.getByText('Book 2')).toBeInTheDocument();
        });
    });
});
