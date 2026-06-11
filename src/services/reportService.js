import * as vulnerabilityRepository from '../repositories/vulnerabilityRepository.js';

/**
 * Devuelve la cantidad de vulnerabilidades agrupadas por severidad.
 * @returns {object} Ejemplo: { "Crítica": 3, "Alta": 7, "Media": 12, "Baja": 5 }
 */
export function getSeverityDistribution() {
    const vulnerabilities = vulnerabilityRepository.findAll();
    
    // Inicializamos el resultado con las 4 severidades en 0
    const distribution = {
        'Crítica': 0,
        'Alta': 0,
        'Media': 0,
        'Baja': 0
    };
    
    // Recorremos las vulnerabilidades e incrementamos el contador correspondiente
    for (const vulnerability of vulnerabilities) {
        if (distribution[vulnerability.severity] !== undefined) {
            distribution[vulnerability.severity]++;
        }
    }
    
    return distribution;
}