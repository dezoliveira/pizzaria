// imports
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors  from 'cors';
import path from 'path'

// routes
import { router } from './routes'

// express
const app = express()
app.use(express.json())

// cors
app.use(cors())

// router
app.use(router)

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })
})

// server watch
app.listen(3000, () => console.table(['Listen on http://localhost:3000']))