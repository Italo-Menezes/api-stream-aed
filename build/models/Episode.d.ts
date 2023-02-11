import { Model, Optional } from 'sequelize';
import { WatchTimeInstance } from './WatchTime';
export interface Episode {
    id: number;
    name: string;
    synopsis: string;
    order: number;
    videoUrl: string;
    secondsLong: number;
    courseId: number;
}
export interface EpisodeCreationAttributes extends Optional<Episode, 'id' | 'videoUrl' | 'secondsLong'> {
}
export interface EpisodeInstance extends Model<Episode, EpisodeCreationAttributes>, Episode {
    watchTime?: WatchTimeInstance;
}
export declare const Episode: import("sequelize").ModelCtor<EpisodeInstance>;
