import { AUTHORS, BOOKS, type Book, CATEGORIES, COWORKING_SPACES, type CoworkingSpace } from "../data/mockData";
export type { Book, CoworkingSpace, Author, Category } from "../data/mockData";

const DELAY = 500; // Simulate network latency

export const api = {
    getBooks: (): Promise<Book[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...BOOKS]), DELAY);
        });
    },

    getBookById: (id: number): Promise<Book | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(BOOKS.find(b => b.id === id)), DELAY);
        });
    },

    getCategories: (): Promise<typeof CATEGORIES> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...CATEGORIES]), DELAY);
        });
    },

    getAuthors: (): Promise<typeof AUTHORS> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...AUTHORS]), DELAY);
        });
    },

    getTop10Books: (): Promise<Book[]> => {
        // In reality this might be sorted by sales, mock just returns all 10 since we have 10
        return new Promise((resolve) => {
            setTimeout(() => resolve([...BOOKS].slice(0, 10)), DELAY);
        });
    },

    getCoworkingSpaces: (): Promise<CoworkingSpace[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve([...COWORKING_SPACES]), DELAY);
        });
    },

    getSpaceById: (id: number): Promise<CoworkingSpace | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(COWORKING_SPACES.find(s => s.id === id)), DELAY);
        });
    }
};
