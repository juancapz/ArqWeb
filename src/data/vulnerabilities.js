import { createIdGenerator } from "./idGenerator.js";

export let vulnerabilities = [
    {
        id: 1,
        title: "SQL Injection en formulario de autenticación",
        description: "El campo de usuario del login no sanitiza inputs, permitiendo ejecución de consultas SQL arbitrarias contra la base de datos backend.",
        cve: "CVE-2023-45678",
        severity: "Crítica",
        cvssScore: 9.8,
        status: "Abierta",
        assetId: 2,
        assignedTo: 3,
        discoveredAt: "2025-08-12"
    },
    {
        id: 2,
        title: "Versión de Apache vulnerable a Path Traversal",
        description: "La versión 2.3 de Apache HTTP Server contiene una vulnerabilidad que permite acceder a archivos fuera del document root mediante secuencias '../' en la URL.",
        cve: "CVE-2021-41773",
        severity: "Alta",
        cvssScore: 7.5,
        status: "En progreso",
        assetId: 1,
        assignedTo: 2,
        discoveredAt: "2025-09-03"
    },
    {
        id: 3,
        title: "Puerto SSH expuesto a internet sin restricción de IPs",
        description: "El firewall permite conexiones SSH desde cualquier dirección IP, ampliando la superficie de ataque para intentos de fuerza bruta.",
        severity: "Media",
        status: "Abierta",
        assetId: 3,
        discoveredAt: "2025-09-20"
    },
    {
        id: 4,
        title: "Certificado TLS próximo a vencer",
        description: "El certificado del servicio expira en menos de 15 días. Su no renovación provocará interrupción del servicio HTTPS.",
        severity: "Baja",
        cvssScore: 3.1,
        status: "En progreso",
        assetId: 2,
        assignedTo: 1,
        discoveredAt: "2025-10-01"
    },
    {
        id: 5,
        title: "Antivirus desactualizado en endpoint",
        description: "La laptop del usuario tiene firmas de antivirus desactualizadas hace más de 30 días.",
        severity: "Media",
        status: "Resuelta",
        assetId: 4,
        assignedTo: 2,
        discoveredAt: "2025-07-15",
        fixedAt: "2025-08-02"
    },
    {
        id: 6,
        title: "Cross-Site Scripting (XSS) reflejado en barra de búsqueda",
        description: "El parámetro 'q' del endpoint de búsqueda refleja directamente el input del usuario en el HTML de respuesta sin escapado.",
        cve: "CVE-2024-12345",
        severity: "Alta",
        cvssScore: 6.1,
        status: "Resuelta",
        assetId: 1,
        assignedTo: 3,
        discoveredAt: "2025-06-10",
        fixedAt: "2025-07-05"
    }
];

export const nextVulnerabilityId = createIdGenerator(7);
