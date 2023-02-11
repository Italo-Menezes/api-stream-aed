"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// src/models/User.ts
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../database");
const sequelize_1 = require("sequelize");
exports.User = database_1.sequelize.define("users", {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER,
    },
    firstName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    phone: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    birth: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE,
    },
    email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isEmail: true,
        },
    },
    password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING,
        validate: {
            isIn: [["admin", "user"]],
        },
    },
}, {
    hooks: {
        beforeSave: async (user) => {
            if (user.isNewRecord || user.changed("password")) {
                user.password = await bcrypt_1.default.hash(user.password, 10);
            }
        },
    },
});
exports.User.prototype.checkPassword = function (password, callbackfn) {
    bcrypt_1.default.compare(password, this.password, (err, isSame) => {
        if (err) {
            callbackfn(err);
        }
        else {
            callbackfn(err, isSame);
        }
    });
};
