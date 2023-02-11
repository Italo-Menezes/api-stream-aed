"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCOntrller = void 0;
const jwt_service_1 = require("../services/jwt.service");
const user_service_1 = require("../services/user.service");
exports.authCOntrller = {
    register: async (req, res) => {
        const { firstName, lastName, phone, birth, email, password } = req.body;
        try {
            const userAlreadyExists = await user_service_1.UserService.findByEmail(email);
            console.log(userAlreadyExists);
            if (userAlreadyExists) {
                throw new Error("User already exists");
            }
            const user = await user_service_1.UserService.create({
                firstName,
                lastName,
                phone,
                birth,
                email,
                password,
                role: "user"
            });
            return res.status(201).json(user); // 201: Created
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await user_service_1.UserService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'E-mail não registrado' });
            }
            user.checkPassword(password, (err, isSame) => {
                if (err) {
                    return res.status(400).json({ message: err.message });
                }
                if (!isSame) {
                    return res.status(401).json({ message: 'Senha incorreta' });
                }
                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                };
                const token = jwt_service_1.jwtService.singToken(payload, '7d');
                return res.json({ authenticated: true, ...payload, token });
            });
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ message: err.message });
            }
        }
    }
};
