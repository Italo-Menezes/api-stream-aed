import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
import { coursesService } from "../services/courses.Service";
import { favoriteService } from "../services/favorite.Service";
import { likeService } from "../services/like.service";

export const coursesController = {
  show: async (req: AuthenticatedRequest, res: Response) => {
    const courseId = req.params.id;
    const userId = req.user!.id;

    try {
      const course = await coursesService.findByIdEpisode(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const Liked = await likeService.isliked(userId, Number(courseId));
      const Favorite = await favoriteService.isFavorite(userId, Number(courseId));
      return res.status(200).json({ ...course.get(), Liked , Favorite });



    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  featured: async (req: Request, res: Response) => {
    try {
      const featuredCourses = await coursesService.getRadomFeaturedCourses();

      return res.status(200).json(featuredCourses);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  newest: async (req: Request, res: Response) => {
    try {
      const newestCourses = await coursesService.getTopTenNewest();
      return res.status(200).json(newestCourses);
    }
    catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }

  },

  search: async (req: Request, res: Response) => {
    const { name } = req.query;
    const [page, perPage] = getPaginationParams(req.query);

    try {
      if (typeof name !== "string") throw new Error("Name is required");
      const course = await coursesService.findByName(name, page, perPage);

      return res.status(200).json(course);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  topTen: async (req: Request, res: Response) => {
    try {
      const topTenCourses = await coursesService.getTopTenBylikes();

      return res.status(200).json(topTenCourses);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  }
};
