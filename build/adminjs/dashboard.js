"use strict";
// src/adminjs/dashboard.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardOptions = void 0;
const adminjs_1 = __importDefault(require("adminjs"));
const models_1 = require("../models");
exports.dashboardOptions = {
    component: adminjs_1.default.bundle('../adminjs/components/Dashboard'),
    handler: async (req, res, context) => {
        const courses = await models_1.Course.count();
        const episodes = await models_1.Episode.count();
        const category = await models_1.Category.count();
        const standardUsers = await models_1.User.count({ where: { role: 'user' } });
        res.json({
            'Cursos': courses,
            'Episódios': episodes,
            'Categorias': category,
            'Usuários Padrão': standardUsers
        });
    },
};
