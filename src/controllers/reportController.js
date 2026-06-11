import * as reportService from '../services/reportService.js';

export function getSeverityDistribution(req, res) {
    try {
        const distribution = reportService.getSeverityDistribution();
        res.status(200).json(distribution);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}