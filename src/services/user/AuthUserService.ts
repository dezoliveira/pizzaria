import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'

interface AuthRequest{
  email: string
  password: string
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verify if email exists
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new Error("user/password incorrect")
    }

    // Verify if hash matches with password
    const passwordHash = await compare(password, user.password)

    if (!passwordHash) {
      throw new Error("user/password incorrect");
    }

    // JWT

    return { ok: true }
  }
}

export { AuthUserService }