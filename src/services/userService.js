import * as userRepository from '../repositories/userRepository.js';
import { NotFoundError, ValidationError } from './errors.js';
import { validate } from './userValidator.js';

export function getAll() {
    return userRepository.findAll();
}

export function getById(id) {
    const user = userRepository.findById(id);
    if (!user) {
        throw new NotFoundError(`No existe un usuario con id ${id}`);
    }
    return user;
}

export function create(data) {
    validate(data);
    if (userRepository.findByEmail(data.email)) {
        throw new ValidationError(`Ya existe un usuario con email ${data.email}`);
    }
    return userRepository.create(data);
}

export function update(id, data) {
    validate(data);
    if (!userRepository.findById(id)) {
        throw new NotFoundError(`No existe un usuario con id ${id}`);
    }
    const existing = userRepository.findByEmail(data.email);
    if (existing && existing.id !== id) {
        throw new ValidationError(`Ya existe un usuario con email ${data.email}`);
    }
    return userRepository.update(id, data);
}

export function remove(id) {
    const wasRemoved = userRepository.remove(id);
    if (!wasRemoved) {
        throw new NotFoundError(`No existe un usuario con id ${id}`);
    }
}