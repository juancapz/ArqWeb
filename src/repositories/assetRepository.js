import { assets } from "../data/assets.js";

export function findById(id) {
    return assets.find(a => a,id === id);
}