import { Request, Response } from "express"
import { jwtService } from "../services/jwt.service";
import { UserService } from "../services/user.service";

export const authCOntrller = {
  register: async (req: Request, res: Response) => {
    const {firstName, lastName, phone, birth, email, password} = req.body

    try {
      const userAlreadyExists = await UserService.findByEmail(email)
      console.log(userAlreadyExists)

      if (userAlreadyExists) {
        throw new Error("User already exists")
      }

      const user = await UserService.create({
        firstName,
        lastName,
        phone,
        birth,
        email,
        password,
        role: "user"
      })

      return res.status(201).json(user) // 201: Created
   }
    catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  }, 

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
      const user = await UserService.findByEmail(email)

      if (!user) {
        return res.status(401).json({ message: 'E-mail não registrado' })
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) {
          return res.status(400).json({ message: err.message })
        }

        if (!isSame) {
          return res.status(401).json({ message: 'Senha incorreta' })
        }

				const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email
        }

        const token = jwtService.singToken(payload, '7d')

        return res.json({ authenticated: true, ...payload, token })
      })
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
      }
    }
  }
}

  


