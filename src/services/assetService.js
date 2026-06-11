import * as assetRepository from '../repositories/assetRepository.js';
import { NotFoundError } from './errors.js';
import { validate } from './assetValidator.js';

export function getAll(filters = {}) {
    let result = assetRepository.findAll();

    if (filters.type) {
        result = result.filter(a => a.type === filters.type);
    }
    if (filters.environment) {
        result = result.filter(a => a.environment === filters.environment);
    }
    if (filters.criticality) {
        result = result.filter(a => a.criticality === filters.criticality);
    }

    return result;
}

export function getById(id) {
    const asset = assetRepository.findById(id);
    if (!asset) {
        throw new NotFoundError(`No existe un asset con id ${id}`);
    }
    return asset;
}

export function create(data) {
    validate(data);
    return assetRepository.create(data);
}

export function update(id, data) {
    validate(data);
    if (!assetRepository.findById(id)) {
        throw new NotFoundError(`No existe un asset con id ${id}`);
    }
    return assetRepository.update(id, data);
}

export function remove(id) {
    const wasRemoved = assetRepository.remove(id);
    if (!wasRemoved) {
        throw new NotFoundError(`No existe un asset con id ${id}`);
    }
}