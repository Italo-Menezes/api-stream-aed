"use strict";
// src/services/favoriteService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteService = void 0;
const Favorite_1 = require("../models/Favorite");
exports.favoriteService = {
    create: async (userId, courseId) => {
        /* verificar se ja está favorito se sim deletar se não criar */
        const favorite = await Favorite_1.Favorite.findOne({ where: { userId, courseId } });
        if (favorite) {
            await favorite.destroy();
            const msg = "Deletado com sucesso";
            return msg;
        }
        const newFavorite = await Favorite_1.Favorite.create({ userId, courseId });
        return newFavorite;
    },
    findByUserId: async (userId) => {
        const favorites = await Favorite_1.Favorite.findAll({
            attributes: [["user_id", "userId"]],
            where: { userId },
            include: {
                association: "Course",
                attributes: [
                    "id",
                    "name",
                    "synopsis",
                    ["thumbnail_url", "thumbnailUrl"],
                ],
            },
        });
        return {
            userId,
            courses: favorites.map((favorite) => favorite.Course),
        };
    },
    delete: async (userId, courseId) => {
        const favorite = await Favorite_1.Favorite.findOne({ where: { userId, courseId } });
        /* vaerificar se esse id existe */
        if (!favorite) {
            const msg = "esse id não está favoritado";
            return msg;
        }
        await favorite.destroy();
        const msg = "Deletado com sucesso";
        return msg;
    },
    isFavorite: async (userId, courseId) => {
        const favorite = await Favorite_1.Favorite.findOne({ where: { userId, courseId } });
        if (favorite) {
            return true;
        }
        return false;
    },
};
