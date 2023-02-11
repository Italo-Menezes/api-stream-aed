"use strict";
// src/controllers/favoritesController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesController = void 0;
const favorite_Service_1 = require("../services/favorite.Service");
exports.favoritesController = {
    // POST /favorites
    save: async (req, res) => {
        const userId = req.user.id;
        const { courseId } = req.body;
        try {
            const favorite = await favorite_Service_1.favoriteService.create(userId, Number(courseId));
            return res.status(201).json(favorite);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // GET /favorites
    index: async (req, res) => {
        const userId = req.user.id;
        try {
            const favorites = await favorite_Service_1.favoriteService.findByUserId(userId);
            return res.status(200).json(favorites);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
};
