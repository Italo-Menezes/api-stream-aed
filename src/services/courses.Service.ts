import { Op } from "sequelize";
import { Course } from "../models";

export const coursesService = {
  findByIdEpisode: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis",  ["thumbnail_url", "thumbnailUrl"]],
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
    const featuredCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        featured: true,
      },
    });

    const radomFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random()
    );

    return featuredCourses.slice(0, 3);
  },


  getTopTenNewest: async () => {
    const courses = await Course.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]],
    })

    return courses
  },







  findByName: async (name: string, page: number, perPage: number) => {
    const { count, rows } = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        name: {
          [Op.like]: `%${name}%`,
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
    const result = await Course.sequelize?.query(`
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
      `)

      if(result){
        const [topten] = result 
        return topten
      }else {
        return null 
      }
  },
};
