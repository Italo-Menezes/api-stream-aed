"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const adminjs_1 = require("./adminjs");
const routes_1 = require("./routes");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/* confg */
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({}));
/* routes */
app.use(adminjs_1.adminJs.options.rootPath, adminjs_1.adminJsRouter);
app.use(routes_1.router);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, async () => {
    await database_1.sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    }).catch(err => {
        console.error("Unable to connect to the database:", err);
    });
    console.log(`Server started on port ${port} good`);
});
