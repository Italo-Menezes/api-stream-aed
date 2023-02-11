"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminJsRouter = exports.adminJs = void 0;
const adminjs_1 = __importDefault(require("adminjs"));
const express_1 = __importDefault(require("@adminjs/express"));
const sequelize_1 = __importDefault(require("@adminjs/sequelize"));
const resources_1 = require("./resources");
const locale_1 = require("./locale");
const dashboard_1 = require("./dashboard");
const branding_1 = require("./branding");
const authentication_1 = require("./authentication");
const database_1 = require("../database");
adminjs_1.default.registerAdapter(sequelize_1.default);
exports.adminJs = new adminjs_1.default({
    databases: [database_1.sequelize],
    resources: resources_1.adminJsResources,
    rootPath: '/admin',
    dashboard: dashboard_1.dashboardOptions,
    locale: locale_1.locale,
    branding: branding_1.brandingOptions
});
exports.adminJsRouter = express_1.default.buildAuthenticatedRouter(exports.adminJs, authentication_1.authtenticationOptions, null, { resave: false, saveUninitialized: false });
