"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthVideo = exports.ensureAuth = void 0;
const jwt_service_1 = require("../services/jwt.service");
const user_service_1 = require("../services/user.service");
function ensureAuth(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    const token = authorizationHeader.replace(/Bearer /, "");
    jwt_service_1.jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === "undefined") {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const user = await user_service_1.UserService.findByEmail(decoded.email);
        req.user = user;
        next();
    });
}
exports.ensureAuth = ensureAuth;
const ensureAuthVideo = (req, res, next) => {
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
    jwt_service_1.jwtService.verifyToken(token, async (err, decoded) => {
        if (err || typeof decoded === "undefined") {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const user = await user_service_1.UserService.findByEmail(decoded.email);
        req.user = user;
        next();
    });
};
exports.ensureAuthVideo = ensureAuthVideo;
