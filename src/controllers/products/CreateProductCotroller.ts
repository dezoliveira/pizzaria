import { Request, Response } from 'express'
import { CreateProductService } from '../../services/product/CreateProductService'
import { UploadedFile } from 'express-fileupload'

import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

class CreateProductController {
  async handle(request: Request, response: Response) {

    const { name, price, description, category_id } = request.body

    const createProductService = new CreateProductService()

    if (!request.files || Object.keys(request.files).length === 0) {
      throw new Error("error upload file image")
    } else {
      const file: UploadedFile = request.files['file']
      
      const resultFile = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, function (error, result) {
          if (error) {
            reject(error)
            return
          }

          resolve(result)
        }).end(file.data)
      })

      console.log(resultFile)

      return response.json({})

      // const product = await createProductService.execute({
      //   name,
      //   price,
      //   description,
      //   category_id,
      //   banner
      // })
  
      // return response.json(product)

    }

  }
}

export { CreateProductController }