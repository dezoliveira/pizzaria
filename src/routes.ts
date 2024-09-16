import { Router } from 'express'

import { CreateUserController } from './controllers/user/CreateUserController'

const router = Router()

// ***ROUTES***
// users 
router.post('/users', new CreateUserController().handle)

export { router }