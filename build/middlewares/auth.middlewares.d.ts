import { NextFunction, Request, Response } from "express";
import { UserInstance } from "../models/User";
export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null;
}
export declare function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare const ensureAuthVideo: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
