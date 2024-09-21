import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";
import UserController from "../controllers/UserController";
import {encoder} from "../util/token";

const authentication =  ( controller : UserController) => {

        return async (req: Request, res: Response, next: NextFunction) => {
            let userCookie = req.cookies.UserCookie;
            if (userCookie) {
                try {
                    const { payload } = await jwtVerify(userCookie, encoder.encode(process.env.JWT_SECRET_TOKEN));
                    req.body.userid = (payload as any).data.userid
                    if(!req.body.userid) return res.status(401)
                    return next()
                } catch (e) {
                    return res.status(401).json('Invalid token');
                }
            }

            return res.status(401).json('User must be logged in');
        };
}

export default authentication;
