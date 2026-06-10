import { createIdGenerator } from "./idGenerator.js";

export let assets = [
    {
        id: 1,
        name: "apache 2.3",
        type: "Servidor",
        environment: "Desarrollo",
        criticality: "Media"
    },
    {
        id: 2,
        name: "MySQL",
        type: "Base de datos",
        environment: "Produccion",
        owner: "Mauro Pino",
        criticality: "Media"
    },
    {
        id: 3,
        name: "Cisco",
        type: "Dispositivo de red",
        environment: "Produccion",
        owner: "Pablo Fernandez",
        criticality: "Baja"
    },
    {
        id: 4,
        name: "Laptop 3",
        type: "Endpoint",
        environment: "Staging",
        owner: "Mauro Pino",
        criticality: "Alta"
    },
];

export const nextAssetId = createIdGenerator(5);