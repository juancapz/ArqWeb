import { createIdGenerator } from './idGenerator.js';

/**
 * Array en memoria con los usarios del sistema.
 * inicilizado con datos de seeed para testear mas facil
 */
export let users = [
    {
        id: 1,
        name: "Juan Perez",
        email: "juan.perez@gmail.com",
        role: "Analista de seguridad",
    },
    {
        id: 2,
        name: "Pablo Fernandez",
        email: "pablo.fernandez@gmail.com",
        role: "Administrador de sistemas",
    },
    {
        id: 3,
        name: "Mauro Pino",
        email: "mauro.pino@gmail.com",
        role: "Desarrollador",
    }
];

/**
 * Generador de IDs autoincrementales para usuarios.
 * Arranca dsps del ultimo ID del seed.
 */

export const nextUserId = createIdGenerator(4); //arranca en 4 pq ya se uso 1, 2 y 3 en el seed
