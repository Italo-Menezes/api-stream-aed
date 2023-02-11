import { Response } from 'express';
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
export declare const favoritesController: {
    save: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    index: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
