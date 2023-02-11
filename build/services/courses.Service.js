"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesService = void 0;
const sequelize_1 = require("sequelize");
const models_1 = require("../models");
exports.coursesService = {
    findByIdEpisode: async (id) => {
        const courseWithEpisodes = await models_1.Course.findByPk(id, {
            attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
            include: {
                association: "episodes",
                attributes: [
                    "id",
                    "name",
                    "synopsis",
                    "order",
                    ["video_url", "videoUrl"],
                    ["seconds_long", "secondsLong"],
                ],
                order: [["order", "ASC"]],
                separate: true,
            },
        });
        return courseWithEpisodes;
    },
    getRadomFeaturedCourses: async () => {
        const featuredCourses = await models_1.Course.findAll({
            attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
            where: {
                featured: true,
            },
        });
        const radomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random());
        return featuredCourses.slice(0, 3);
    },
    getTopTenNewest: async () => {
        const courses = await models_1.Course.findAll({
            limit: 10,
            order: [["createdAt", "DESC"]],
        });
        return courses;
    },
    findByName: async (name, page, perPage) => {
        const { count, rows } = await models_1.Course.findAndCountAll({
            attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
            where: {
                name: {
                    [sequelize_1.Op.like]: `%${name}%`,
                },
            },
            limit: perPage,
            offset: (page - 1) * perPage,
        });
        return {
            courses: rows,
            page,
            perPage,
            total: count,
        };
    },
    getTopTenBylikes: async () => {
        const result = await models_1.Course.sequelize?.query(`
      SELECT
        courses.id,
        courses.name,
        courses.synopsis,
        courses.thumbnail_url AS "thumbnailUrl",
        COUNT(users.id) AS likes
      FROM courses
      LEFT OUTER JOIN likes 
      ON courses.id = likes.course_id
      iNNER JOIN users
      ON  users.id = likes.user_id 

      GROUP BY courses.id
      ORDER BY likes DESC
      LIMIT 10
      `);
        if (result) {
            const [topten] = result;
            return topten;
        }
        else {
            return null;
        }
    },
};
