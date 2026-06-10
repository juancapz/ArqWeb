/**
 * Es para crear un generador de IDs autoincrementales.
 * asi cada llamada al gen devuelve el siguiente ID disponible
 * 
 * @param {number} startValue - el primer Id a devolver
 * @returns {function} - funcion que al llamarse devuelve el nuevo ID
 */

export function createIdGenerator (startValue = 1) {
    let nextId = startValue;
    return () => nextId++;
}