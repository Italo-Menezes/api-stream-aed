import { Model } from "sequelize";
export interface Like {
    userId: number;
    courseId: number;
}
export interface LikeInstance extends Model<Like>, Like {
}
export declare const Like: import("sequelize").ModelCtor<LikeInstance>;
