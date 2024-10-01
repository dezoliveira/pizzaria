import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken'

interface PayLoad{
  sub: string,
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  
  // get token
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).end()
  }

  const [, token] = authToken.split(" ")

  try {
    //Token validate
    const { sub } = verify(
      token,
      process.env.JWT_SECRET
    ) as PayLoad

    // recover token id and inject into user_id req (typescript)
    req.user_id = sub

    return next()

  } catch (err) {
    return res.status(401).end()
  }
}