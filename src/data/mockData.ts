export interface Author {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Book {
    id: number;
    title: string;
    year: number;
    authorId: number;
    categoryId: number;
    description?: string;
    image?: string; // Para imágenes locales, colocar en 'public/images/books' y usar ruta: "/images/books/nombre.jpg"
    price: number;
}

export interface CoworkingSpace {
    id: number;
    name: string;
    capacity: number;
    hasProjector: boolean;
    hasWhiteboard: boolean;
    hourlyRate: number;
    status: 'available' | 'occupied' | 'maintenance';
    currentOccupant?: string;
    nextAvailable?: string; // ISO String
}

export const AUTHORS: Author[] = [
    { "id": 1, "name": "Alice Walker" },
    { "id": 2, "name": "Bruno García" },
    { "id": 3, "name": "Carla Rossi" },
    { "id": 4, "name": "Daniel Kim" }
];

export const CATEGORIES: Category[] = [
    { "id": 1, "name": "Fantasía" },
    { "id": 2, "name": "Aventura" },
    { "id": 3, "name": "Misterio" },
    { "id": 4, "name": "Ciencia Ficción" },
    { "id": 5, "name": "Romance" },
    { "id": 6, "name": "Terror" },
    { "id": 7, "name": "Histórica" },
    { "id": 8, "name": "Juvenil" },
    { "id": 9, "name": "No Ficción" },
    { "id": 10, "name": "Poesía" }
];

export const BOOKS: Book[] = [
    { "id": 1, "title": "Viaje al Norte", "year": 2000, "authorId": 1, "categoryId": 1, price: 15.99, description: "Un viaje épico a través de páramos helados.", image: "https://placehold.co/300x450/2a9d8f/white?text=Viaje+al+Norte" },
    { "id": 2, "title": "Secretos del Bosque", "year": 2001, "authorId": 2, "categoryId": 2, price: 12.50, description: "¿Qué yace bajo el antiguo dosel?", image: "https://placehold.co/300x450/e9c46a/black?text=Secretos+del+Bosque" },
    { "id": 3, "title": "Océano a Medianoche", "year": 2002, "authorId": 3, "categoryId": 3, price: 18.20, description: "Un misterio en un viaje transatlántico.", image: "https://placehold.co/300x450/264653/white?text=Oceano" },
    { "id": 4, "title": "Perdido en la Ciudad", "year": 2003, "authorId": 4, "categoryId": 4, price: 14.00, description: "Thriller de ciencia ficción urbana.", image: "https://placehold.co/300x450/e76f51/white?text=Perdido" },
    { "id": 5, "title": "Estrellas Sobre Nosotros", "year": 2004, "authorId": 1, "categoryId": 5, price: 11.99, description: "Un romance escrito en las estrellas.", image: "https://placehold.co/300x450/f4a261/black?text=Estrellas" },
    { "id": 6, "title": "Susurros del Tiempo", "year": 2005, "authorId": 2, "categoryId": 6, price: 16.50, description: "El tiempo se acaba en este clásico de terror.", image: "https://placehold.co/300x450/000000/white?text=Susurros" },
    { "id": 7, "title": "Bajo el Viejo Árbol", "year": 2006, "authorId": 3, "categoryId": 7, price: 13.75, description: "Drama histórico ambientado en el siglo XIX.", image: "https://placehold.co/300x450/8d99ae/white?text=Viejo+Arbol" },
    { "id": 8, "title": "Camino al Mañana", "year": 2007, "authorId": 4, "categoryId": 8, price: 10.99, description: "Madurez en un futuro distópico.", image: "https://placehold.co/300x450/ef233c/white?text=Manana" },
    { "id": 9, "title": "Voces en la Lluvia", "year": 2008, "authorId": 1, "categoryId": 9, price: 19.99, description: "Ensayos sobre la naturaleza y la humanidad.", image: "https://placehold.co/300x450/457b9d/white?text=Voces" },
    { "id": 10, "title": "Luz en la Oscuridad", "year": 2009, "authorId": 2, "categoryId": 10, price: 9.50, description: "Una conmovedora colección de poesía moderna.", image: "https://placehold.co/300x450/a8dadc/black?text=Luz" }
];

export const COWORKING_SPACES: CoworkingSpace[] = [
    { id: 1, name: "Zona Silenciosa A", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 5, status: 'available' },
    { id: 2, name: "Zona Silenciosa B", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 5, status: 'occupied', currentOccupant: "Juan Pérez", nextAvailable: "2023-10-27T14:00:00" },
    { id: 3, name: "Sala de Reuniones 1", capacity: 4, hasProjector: true, hasWhiteboard: true, hourlyRate: 20, status: 'available' },
    { id: 4, name: "Sala de Reuniones 2", capacity: 6, hasProjector: true, hasWhiteboard: true, hourlyRate: 25, status: 'maintenance' },
    { id: 5, name: "Escritorio Abierto 1", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 3, status: 'available' },
    { id: 6, name: "Escritorio Abierto 2", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 3, status: 'occupied', currentOccupant: "Ana López", nextAvailable: "2023-10-27T16:30:00" },
];
