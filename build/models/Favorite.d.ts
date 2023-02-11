import { Model } from "sequelize";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";
export interface Favorite {
    userId: number;
    courseId: number;
}
export interface FavoriteInstance extends Model<Favorite>, Favorite {
    Course?: CourseInstance;
    User?: UserInstance;
}
export declare const Favorite: import("sequelize").ModelCtor<FavoriteInstance>;
