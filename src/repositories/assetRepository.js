import { assets, nextAssetId } from '../data/assets.js';

export function findAll() {
    return assets;
}

export function findById(id) {
    return assets.find(a => a.id === id);
}

export function create(data) {
    const nuevo = { id: nextAssetId(), ...data };
    assets.push(nuevo);
    return nuevo;
}

export function update(id, data) {
    const index = assets.findIndex(a => a.id === id);
    if (index === -1) return undefined;

    const actualizado = { ...data, id };
    assets[index] = actualizado;
    return actualizado;
}

export function remove(id) {
    const index = assets.findIndex(a => a.id === id);
    if (index === -1) return false;

    assets.splice(index, 1);
    return true;
}