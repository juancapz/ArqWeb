import { ValidationError } from './errors.js';

const VALID_TYPES = ['Servidor', 'Aplicación', 'Base de datos', 'Dispositivo de red', 'Endpoint'];
const VALID_ENVIRONMENTS = ['Producción', 'Staging', 'Desarrollo'];
const VALID_CRITICALITIES = ['Alta', 'Media', 'Baja'];

export function validate(data) {
    if (!data || typeof data !== 'object') {
        throw new ValidationError('El body debe ser un objeto JSON válido');
    }
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
        throw new ValidationError('El campo "name" es obligatorio y debe ser un string no vacío');
    }
    if (!data.type) {
        throw new ValidationError('El campo "type" es obligatorio');
    }
    if (!VALID_TYPES.includes(data.type)) {
        throw new ValidationError(`El campo "type" debe ser uno de: ${VALID_TYPES.join(', ')}`);
    }
    if (!data.environment) {
        throw new ValidationError('El campo "environment" es obligatorio');
    }
    if (!VALID_ENVIRONMENTS.includes(data.environment)) {
        throw new ValidationError(`El campo "environment" debe ser uno de: ${VALID_ENVIRONMENTS.join(', ')}`);
    }
    if (!data.criticality) {
        throw new ValidationError('El campo "criticality" es obligatorio');
    }
    if (!VALID_CRITICALITIES.includes(data.criticality)) {
        throw new ValidationError(`El campo "criticality" debe ser uno de: ${VALID_CRITICALITIES.join(', ')}`);
    }
    if (data.owner !== undefined && typeof data.owner !== 'string') {
        throw new ValidationError('El campo "owner" debe ser un string');
    }
}