"use strict";
// src/services/episodeService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodeService = void 0;
const models_1 = require("../models");
exports.episodeService = {
    getWatchTime: async (userId, episodeId) => {
        const watchTime = await models_1.WatchTime.findOne({
            attributes: ['seconds'],
            where: {
                userId,
                episodeId
            }
        });
        return watchTime;
    },
    setWatchTime: async ({ userId, episodeId, seconds }) => {
        const watchTimeAlreadyExists = await models_1.WatchTime.findOne({
            where: {
                userId,
                episodeId
            }
        });
        if (watchTimeAlreadyExists) {
            watchTimeAlreadyExists.seconds = seconds;
            await watchTimeAlreadyExists.save();
            return watchTimeAlreadyExists;
        }
        else {
            const watchTime = await models_1.WatchTime.create({
                userId,
                episodeId,
                seconds
            });
            return watchTime;
        }
    }
};
