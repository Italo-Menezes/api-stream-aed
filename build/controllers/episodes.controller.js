"use strict";
// src/controllers/episodesController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.episodesController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const episodes_service_1 = require("../services/episodes.service");
exports.episodesController = {
    // GET /episodes/stream
    stream: async (req, res) => {
        const { videoUrl } = req.query;
        try {
            if (typeof videoUrl !== "string") {
                throw new Error("videoUrl must be of type 'string'");
            }
            const filePath = path_1.default.join(__dirname, "..", "..", "uploads", videoUrl);
            const fileStat = fs_1.default.statSync(filePath);
            const range = req.headers.range;
            if (range) {
                const parts = range.replace(/bytes=/, '').split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1;
                const chunkSize = (end - start) + 1;
                const file = fs_1.default.createReadStream(filePath, { start, end });
                const head = {
                    "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
                    "Accept-Ranges": "bytes",
                    "Content-Length": chunkSize,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(206, head);
                file.pipe(res);
            }
            else {
                const head = {
                    "Content-Length": fileStat.size,
                    "Content-Type": "video/mp4",
                };
                res.writeHead(200, head);
                fs_1.default.createReadStream(filePath).pipe(res);
            }
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // GET /episodes/:ID/watchTime
    getWatchtime: async (req, res) => {
        const UserId = req.user.id;
        const EpisodeId = req.params.id;
        try {
            const watchTime = await episodes_service_1.episodeService.getWatchTime(UserId, Number(EpisodeId));
            return res.status(200).json(watchTime);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    // POST /episodes/:ID/watchTime
    setWatchtime: async (req, res) => {
        const UserId = req.user.id;
        const EpisodeId = req.params.id;
        const { seconds } = req.body;
        try {
            console.log(seconds);
            const watchTime = await episodes_service_1.episodeService.setWatchTime({ episodeId: Number(EpisodeId), userId: UserId, seconds });
            return res.status(200).json(watchTime);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
};
