"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesController = void 0;
const getPaginationParams_1 = require("../helpers/getPaginationParams");
const courses_Service_1 = require("../services/courses.Service");
const favorite_Service_1 = require("../services/favorite.Service");
const like_service_1 = require("../services/like.service");
exports.coursesController = {
    show: async (req, res) => {
        const courseId = req.params.id;
        const userId = req.user.id;
        try {
            const course = await courses_Service_1.coursesService.findByIdEpisode(courseId);
            if (!course) {
                return res.status(404).json({ message: "Course not found" });
            }
            const Liked = await like_service_1.likeService.isliked(userId, Number(courseId));
            const Favorite = await favorite_Service_1.favoriteService.isFavorite(userId, Number(courseId));
            return res.status(200).json({ ...course.get(), Liked, Favorite });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    featured: async (req, res) => {
        try {
            const featuredCourses = await courses_Service_1.coursesService.getRadomFeaturedCourses();
            return res.status(200).json(featuredCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    newest: async (req, res) => {
        try {
            const newestCourses = await courses_Service_1.coursesService.getTopTenNewest();
            return res.status(200).json(newestCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    search: async (req, res) => {
        const { name } = req.query;
        const [page, perPage] = (0, getPaginationParams_1.getPaginationParams)(req.query);
        try {
            if (typeof name !== "string")
                throw new Error("Name is required");
            const course = await courses_Service_1.coursesService.findByName(name, page, perPage);
            return res.status(200).json(course);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    topTen: async (req, res) => {
        try {
            const topTenCourses = await courses_Service_1.coursesService.getTopTenBylikes();
            return res.status(200).json(topTenCourses);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
