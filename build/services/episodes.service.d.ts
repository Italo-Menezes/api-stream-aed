import { WatchTimeAttributes } from "../models/WatchTime";
export declare const episodeService: {
    getWatchTime: (userId: number, episodeId: number) => Promise<import("../models/WatchTime").WatchTimeInstance | null>;
    setWatchTime: ({ userId, episodeId, seconds }: WatchTimeAttributes) => Promise<import("../models/WatchTime").WatchTimeInstance>;
};
