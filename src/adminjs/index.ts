import Adminjs from "adminjs";
import AdminjsExpress from "@adminjs/express";
import AdminjsSequelize, { Database } from "@adminjs/sequelize";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from './dashboard'
import { brandingOptions } from './branding'
import { authtenticationOptions } from './authentication'
import { sequelize } from "../database";

Adminjs.registerAdapter(AdminjsSequelize)

export const adminJs = new Adminjs({
  databases: [sequelize],
  resources: adminJsResources,
  rootPath: '/admin',
  dashboard: dashboardOptions,
  locale: locale,
  branding: brandingOptions
})

export const adminJsRouter = AdminjsExpress.buildAuthenticatedRouter(
  adminJs,
  authtenticationOptions,
  null,
  { resave: false, saveUninitialized: false }
)

