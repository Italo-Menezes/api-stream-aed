"use strict";
// src/services/likeService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeService = void 0;
const models_1 = require("../models");
exports.likeService = {
    create: async (userId, courseId) => {
        /* criar e deletar o like  */
        const like = await models_1.Like.findOne({ where: { userId, courseId } });
        if (like) {
            await like.destroy();
            const msg = "Like deletado";
            return msg;
        }
        await models_1.Like.create({ userId, courseId });
        const msg = "Like criado";
        return msg;
    },
    isliked: async (userId, courseId) => {
        const like = await models_1.Like.findOne({ where: { userId, courseId } });
        if (like) {
            return true;
        }
        return false;
    }
};
