import { Model } from "sequelize";
export interface WatchTimeAttributes {
    seconds: number;
    userId: number;
    episodeId: number;
}
export interface WatchTimeInstance extends Model<WatchTimeAttributes>, WatchTimeAttributes {
}
export declare const WatchTime: import("sequelize").ModelCtor<WatchTimeInstance>;
