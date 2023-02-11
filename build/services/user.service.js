"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const models_1 = require("../models");
function filterLastEpisodesByCourse(episodes) {
    const courseOnList = [];
    const lastEpisodes = episodes.reduce((currentList, episode) => {
        if (!courseOnList.includes(episode.courseId)) {
            courseOnList.push(episode.courseId);
            currentList.push(episode);
            return currentList;
        }
        const episodeFromSameCourse = currentList.find((ep) => ep.courseId === episode.courseId);
        if (episodeFromSameCourse.order > episode.order) {
            return currentList;
        }
        const ListWithoutEpisodeFromSameCourse = currentList.filter((ep) => ep.courseId !== episode.courseId);
        ListWithoutEpisodeFromSameCourse.push(episode);
        return ListWithoutEpisodeFromSameCourse;
    }, []);
    return lastEpisodes;
}
exports.UserService = {
    findByEmail: async (email) => {
        const user = await models_1.User.findOne({
            where: {
                email,
            },
        });
        return user;
    },
    create: async (attributes) => {
        const user = await models_1.User.create(attributes);
        return user;
    },
    getKeepWatchList: async (id) => {
        const userWartchEpisodes = await models_1.User.findByPk(id, {
            include: {
                association: "Episodes",
                attributes: [
                    "id",
                    "name",
                    "synopsis",
                    "order",
                    ["video_url", "videoURL"],
                    "secondsLong",
                    ["course_id", "courseId"],
                ],
                include: [
                    {
                        association: "Course",
                        attributes: [
                            "id",
                            "name",
                            "synopsis",
                            ["thumbnail_url", "thumbnailUrl"],
                        ],
                        as: "course",
                    },
                ],
                through: {
                    as: "watchTime",
                    attributes: ["seconds", ["updated_at", "updatedAt"]],
                },
            },
        });
        if (!userWartchEpisodes)
            throw new Error("User not found");
        const keepWatchList = filterLastEpisodesByCourse(userWartchEpisodes.Episodes);
        //@ts-ignore
        keepWatchList.sort((a, b) => a.watchTime.updatedAt < b.watchTime.updatedAt ? 1 : -1);
        return keepWatchList;
    },
    upudate: async (id, attributes) => {
        const [affectedRows, upudateUsers] = await models_1.User.update(attributes, {
            where: { id } /* returning  para mysql*/,
            returning: true,
        });
        return upudateUsers[0];
    },
    upudateSenha: async (id, password) => {
        const [affectedRows, upudateUsers] = await models_1.User.update({ password }, {
            where: { id },
            returning: true,
            individualHooks: true,
        });
        return upudateUsers[0];
    },
};
