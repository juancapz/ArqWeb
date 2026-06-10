import { users } from "../data/users.js";

export function findById(id) {
    return users.find(u => u, id === id);
}