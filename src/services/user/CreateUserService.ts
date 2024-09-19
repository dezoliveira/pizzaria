import prismaClient from "../../prisma"

interface UserRequest {
  name: string,
  email: string,
  password: string
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest){
  
    // Verifica se o email foi enviado
    if (!email) {
      throw new Error("Email incorrect")
    }

    // Verifica se o email já existe
    const userAlreadyExists = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const user = await prismaClient.user.create({
      data:{
        name: name,
        email: email,
        password: password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user
  }
}

export { CreateUserService }