import * as userService from '../services/userService.js';
import { NotFoundError, ValidationError } from '../services/errors.js';

export function getAll(req, res) {
    try {
        const users = userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        handleError(error, res);
    }
}

export function getById(req, res) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'El id debe ser un entero positivo' });
        }
        const user = userService.getById(id);
        res.status(200).json(user);
    } catch (error) {
        handleError(error, res);
    }
}

export function create(req, res) {
    try {
        const created = userService.create(req.body);
        res.status(201).json(created);
    } catch (error) {
        handleError(error, res);
    }
}

export function update(req, res) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'El id debe ser un entero positivo' });
        }
        const updated = userService.update(id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        handleError(error, res);
    }
}

export function remove(req, res) {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'El id debe ser un entero positivo' });
        }
        userService.remove(id);
        res.status(204).send();
    } catch (error) {
        handleError(error, res);
    }
}

function handleError(error, res) {
    if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({ error: error.message });
    }
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
}