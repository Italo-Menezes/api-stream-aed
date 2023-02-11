// src/services/favoriteService.ts

import { Favorite } from "../models/Favorite";

export const favoriteService = {
  create: async (userId: number, courseId: number) => {
    /* verificar se ja está favorito se sim deletar se não criar */
    const favorite = await Favorite.findOne({ where: { userId, courseId } });

    if (favorite) {
      await favorite.destroy();
      const msg = "Deletado com sucesso";
      return msg;
    }

    

    const newFavorite = await Favorite.create({ userId, courseId });

    return newFavorite;
    
  },
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
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

  delete: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({ where: { userId, courseId } });

    /* vaerificar se esse id existe */
    if (!favorite) {
      const msg = "esse id não está favoritado";
      return msg;
    }

    await favorite.destroy();

    const msg = "Deletado com sucesso";

    return msg;
  },

  isFavorite: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({ where: { userId, courseId } });

    if (favorite) {
      return true;
    }

    return false;
  },
};
