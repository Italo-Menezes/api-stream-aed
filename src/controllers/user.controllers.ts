import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth.middlewares";
import { UserService } from "../services/user.service";

export const userController = {
  watching: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;

    try {
      const watching = await UserService.getKeepWatchList(id);

      return res.status(200).json(watching);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  show: async (req: AuthenticatedRequest, res: Response) => {
    const currentuser = req.user!;

    try {
      return res.status(200).json(currentuser);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  update: async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.user!;
    const { firstName, lastName, phone, birth, email } = req.body;

    try {
      const user = await UserService.upudate(id, {
        firstName,
        lastName,
        phone,
        birth,
        email,
      });

      return res.status(200).json(user);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  upudatePassword: async (req: AuthenticatedRequest, res: Response) => {
    const user = req.user!
    const { currentPassword, newPassword } = req.body;

    try {
      user.checkPassword(currentPassword, async (err, isSame) => {  
        if (err) res.status(400).json({ message: err.message });
        if (!isSame) res.status(400).json({ message: "Senha atual incorreta" });
      });

      await UserService.upudateSenha(user.id, newPassword);

      return res.status(200).send();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
