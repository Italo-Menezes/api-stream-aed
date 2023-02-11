"use strict";
// src/controllers/likesController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.likesController = void 0;
const like_service_1 = require("../services/like.service");
exports.likesController = {
    // POST /likes
    save: async (req, res) => {
        const userId = req.user.id;
        const { courseId } = req.body;
        try {
            const like = await like_service_1.likeService.create(userId, courseId);
            return res.status(201).json(like);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
