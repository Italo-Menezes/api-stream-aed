import express from "express";
import { authCOntrller } from "./controllers/auth.controller";

import { categoriesController } from "./controllers/Categoreis.controller";
import { coursesController } from "./controllers/Courses.controller";
import { episodesController } from "./controllers/episodes.controller";
import { favoritesController } from "./controllers/favorites.Controller";
import { likesController } from "./controllers/like.controller";
import { userController } from "./controllers/user.controllers";
import { ensureAuth, ensureAuthVideo } from "./middlewares/auth.middlewares";

const router = express.Router();

router.post("/auth/register", authCOntrller.register);
router.post("/auth/login", authCOntrller.login);

router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/courses/popular", ensureAuth, coursesController.topTen);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/featured", coursesController.featured);
router.get("/courses/search", ensureAuth, coursesController.search);
router.get("/courses/:id", ensureAuth, coursesController.show);

router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)

router.get("/episodes/stream", ensureAuthVideo, episodesController.stream);
router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchtime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchtime)

router.post('/likes', ensureAuth, likesController.save)

router.get("/users/current/watching", ensureAuth, userController.watching);
router.get("/users/current", ensureAuth, userController.show);
router.put("/users/current", ensureAuth, userController.update);
router.put("/users/current/password", ensureAuth, userController.upudatePassword);



export { router };
