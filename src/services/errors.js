/**
 * Error que se lanza cuando un recurso solicitado no existe.
 * el controller lo va a traducir a HTTP 404.
 */

export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

/**
 * Error que se lanza cuando los datos de entrada son invalidos
 * El controller lo va a traducir a HTTP 400
 */
export class ValidationError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ValidatrionError';
    }
}

