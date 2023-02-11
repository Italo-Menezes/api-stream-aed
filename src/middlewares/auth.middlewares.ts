import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwt.service";
import { UserService } from "../services/user.service";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authorizationHeader.replace(/Bearer /, "");

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await UserService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
}

export const ensureAuthVideo = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (typeof token !== "string") {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  jwtService.verifyToken(token, async (err, decoded) => {
    if (err || typeof decoded === "undefined") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const user = await UserService.findByEmail((decoded as JwtPayload).email);
    req.user = user;
    next();
  });
};
