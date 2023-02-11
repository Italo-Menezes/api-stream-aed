import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
export declare const coursesController: {
    show: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    featured: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    newest: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    search: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    topTen: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
