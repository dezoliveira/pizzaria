// imports
import express, { Request, Response, NextFunction } from 'express'
import { router } from './routes'

// express
const app = express()
app.use(express.json())

// router
app.use(router)

// server watch
app.listen(3000, () => console.table(['Listen on http://localhost:3000']))