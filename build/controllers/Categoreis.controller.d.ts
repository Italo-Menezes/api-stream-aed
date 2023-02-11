import { Request, Response } from "express";
declare const categoriesController: {
    index: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    show: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
export { categoriesController };
