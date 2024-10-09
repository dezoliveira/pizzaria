import prismaClient from "../../prisma";

interface ProductsRequest {
  name: string
  price: string
  description: string
  banner: string
  category_id: string
}

class CreateProductService{
  async execute({name, price, description, banner, category_id}: ProductsRequest) {
    
    return { ok: true }
  }
}

export { CreateProductService }