"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
exports.userController = {
    watching: async (req, res) => {
        const { id } = req.user;
        try {
            const watching = await user_service_1.UserService.getKeepWatchList(id);
            return res.status(200).json(watching);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    show: async (req, res) => {
        const currentuser = req.user;
        try {
            return res.status(200).json(currentuser);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    update: async (req, res) => {
        const { id } = req.user;
        const { firstName, lastName, phone, birth, email } = req.body;
        try {
            const user = await user_service_1.UserService.upudate(id, {
                firstName,
                lastName,
                phone,
                birth,
                email,
            });
            return res.status(200).json(user);
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    upudatePassword: async (req, res) => {
        const user = req.user;
        const { currentPassword, newPassword } = req.body;
        try {
            user.checkPassword(currentPassword, async (err, isSame) => {
                if (err)
                    res.status(400).json({ message: err.message });
                if (!isSame)
                    res.status(400).json({ message: "Senha atual incorreta" });
            });
            await user_service_1.UserService.upudateSenha(user.id, newPassword);
            return res.status(200).send();
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
};
