import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import UserController from "../controllers/UserController";
const encoder = new TextEncoder();

const authentication =  ( controller : UserController) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            let userCookie = req.cookies.UserCookie;
            if (userCookie) {
                try {
                    const { payload } = await jwtVerify(userCookie, encoder.encode(process.env.JWT_SECRET_TOKEN));
                    if('uid' in payload && typeof payload.uid === 'string') {
                        req.body.user = await controller.getUserFromDatabase(payload.uid)
                        if(!req.body.user) return res.status(401)
                        return next()
                    }
                } catch (e) {
                    return res.status(401).json('Invalid token');
                }
            }

            return res.status(401).json('User must be logged in');
        };
}

export default authentication;
