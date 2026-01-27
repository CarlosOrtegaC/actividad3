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
    image?: string;
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
    nextAvailable?: string;
}

export const AUTHORS: Author[] = [
    { "id": 1, "name": "Samantha Shannon" },
    { "id": 2, "name": "Ken Follet" },
    { "id": 3, "name": "Carlos Ruiz Zafón" },
    { "id": 4, "name": "Brandon Sanderson" },
    { "id": 5, "name": "Elisabet Benavent" },
    { "id": 6, "name": "Laura Alvea y José Ortuño" },
    { "id": 7, "name": "Santiago Posteguillo" },
    { "id": 8, "name": "R. J. Palacio" },
    { "id": 9, "name": "Marta Jiménez Serrano" },
    { "id": 10, "name": "Mario Benedetti" }
];

export const CATEGORIES: Category[] = [
    { "id": 1, "name": "Fantasía" },
    { "id": 2, "name": "Aventura" },
    { "id": 3, "name": "Misterio" },
    { "id": 4, "name": "Ciencia Ficción" },
    { "id": 5, "name": "Romance" },
    { "id": 6, "name": "Terror" },
    { "id": 7, "name": "Historia" },
    { "id": 8, "name": "Juvenil" },
    { "id": 9, "name": "No Ficción" },
    { "id": 10, "name": "Poesía" }
];

export const BOOKS: Book[] = [
    { "id": 1, "title": "El Priorato del Naranjo", "year": 2019, "authorId": 1, "categoryId": 1, price: 15.99, description: "Una épica historia de dragones y magia.", image: "/images/books/PrioratoNaranjo.jpg" },
    { "id": 2, "title": "Los Pilares de la Tierra", "year": 1989, "authorId": 2, "categoryId": 2, price: 12.50, description: "La construcción de una catedral gótica en la Inglaterra del siglo XII.", image: "/images/books/PilaresTierra.jpg" },
    { "id": 3, "title": "El Príncipe de la Niebla", "year": 1993, "authorId": 3, "categoryId": 3, price: 18.20, description: "Un misterio oscuro en un pueblo costero.", image: "/images/books/PrincipeNiebla.jpg" },
    { "id": 4, "title": "Escuadrón", "year": 2018, "authorId": 4, "categoryId": 4, price: 14.00, description: "Una joven piloto sueña con alcanzar las estrellas.", image: "/images/books/Escuadron.jpg" },
    { "id": 5, "title": "Un Cuento Perfecto", "year": 2020, "authorId": 5, "categoryId": 5, price: 11.99, description: "Una historia de amor moderna y refrescante.", image: "/images/books/CuentoPerfecto.jpg" },
    { "id": 6, "title": "El Pacto", "year": 2022, "authorId": 6, "categoryId": 6, price: 16.50, description: "Un thriller psicológico que te mantendrá en vilo.", image: "/images/books/Pacto.jpg" },
    { "id": 7, "title": "Roma Soy Yo", "year": 2022, "authorId": 7, "categoryId": 7, price: 13.75, description: "La verdadera historia de Julio César.", image: "/images/books/RomaSoyYo.jpg" },
    { "id": 8, "title": "La Lección de August", "year": 2012, "authorId": 8, "categoryId": 8, price: 10.99, description: "Una historia inspiradora sobre la bondad y la aceptación.", image: "/images/books/LeccionAugust.jpg" },
    { "id": 9, "title": "Los nombres Propios", "year": 2021, "authorId": 9, "categoryId": 9, price: 19.99, description: "Una exploración de la identidad y el crecimiento personal.", image: "/images/books/NombresPropios.jpg" },
    { "id": 10, "title": "El amor, las mujeres y la vida", "year": 1995, "authorId": 10, "categoryId": 10, price: 9.50, description: "Los mejores poemas de amor de Benedetti.", image: "/images/books/AmorMujeresVida.jpg" }
];

export const COWORKING_SPACES: CoworkingSpace[] = [
    { id: 1, name: "Zona Silenciosa A", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 5, status: 'available' },
    { id: 2, name: "Zona Silenciosa B", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 5, status: 'occupied', currentOccupant: "Juan Pérez", nextAvailable: "2023-10-27T14:00:00" },
    { id: 3, name: "Sala de Reuniones 1", capacity: 4, hasProjector: true, hasWhiteboard: true, hourlyRate: 20, status: 'available' },
    { id: 4, name: "Sala de Reuniones 2", capacity: 6, hasProjector: true, hasWhiteboard: true, hourlyRate: 25, status: 'maintenance' },
    { id: 5, name: "Escritorio Abierto 1", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 3, status: 'available' },
    { id: 6, name: "Escritorio Abierto 2", capacity: 1, hasProjector: false, hasWhiteboard: false, hourlyRate: 3, status: 'occupied', currentOccupant: "Ana López", nextAvailable: "2023-10-27T16:30:00" },
];
