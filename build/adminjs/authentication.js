"use strict";
// src/adminjs/authentication.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authtenticationOptions = void 0;
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.authtenticationOptions = {
    authenticate: async (email, password) => {
        const user = await models_1.User.findOne({ where: { email } });
        if (user && user.role === 'admin') {
            const matched = await bcrypt_1.default.compare(password, user.password);
            if (matched) {
                return user;
            }
        }
        return false;
    },
    cookiePassword: 'senha-do-cookie'
};
