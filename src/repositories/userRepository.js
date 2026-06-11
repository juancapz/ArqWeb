import { users, nextUserId } from '../data/users.js';

export function findAll() {
    return users;
}

export function findById(id) {
    return users.find(u => u.id === id);
}

export function findByEmail(email) {
    return users.find(u => u.email === email);
}

export function create(data) {
    const nuevo = { id: nextUserId(), ...data };
    users.push(nuevo);
    return nuevo;
}

export function update(id, data) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return undefined;

    const actualizado = { ...data, id };
    users[index] = actualizado;
    return actualizado;
}

export function remove(id) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
}