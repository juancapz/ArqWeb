import { ValidationError } from './errors.js';

const VALID_ROLES = ['Analista de seguridad', 'Desarrollador', 'Administrador de sistemas'];
//validación de formato de email con una regex básica que verifica la estructura local@dominio.tld
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(data) {
    if (!data || typeof data !== 'object') {
        throw new ValidationError('El body debe ser un objeto JSON válido');
    }
    if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
        throw new ValidationError('El campo "name" es obligatorio y debe ser un string no vacío');
    }
    if (!data.email || typeof data.email !== 'string') {
        throw new ValidationError('El campo "email" es obligatorio');
    }
    if (!EMAIL_REGEX.test(data.email)) {
        throw new ValidationError('El campo "email" no tiene un formato válido');
    }
    if (!data.role) {
        throw new ValidationError('El campo "role" es obligatorio');
    }
    if (!VALID_ROLES.includes(data.role)) {
        throw new ValidationError(`El campo "role" debe ser uno de: ${VALID_ROLES.join(', ')}`);
    }
}