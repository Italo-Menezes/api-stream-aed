import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
export declare const episodesController: {
    stream: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getWatchtime: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    setWatchtime: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
