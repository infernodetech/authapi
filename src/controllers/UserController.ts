import Controller from "./Controller";
import {UserDTO} from "../dto/UserDTO";
import UsersService from "../services/UsersService";
import {NextFunction, Request, Response} from 'express'
import 'reflect-metadata'
import {inject, injectable} from "tsyringe";
import {encoder, generateToken} from "../util/token";
import CustomError from "../errors/CustomError"
@injectable()
export default class UserController extends Controller {

   constructor(
       @inject("UsersService") private _service: UsersService
   ) {
       super()                                          ;
   }



   obtainAll = async (req : Request, res : Response, next : NextFunction) => {
       try {
           res.status(200).send({users: [...await this._service.getAll()]})
       } catch(e) {
           next(e);
       }
   }
   async getUserFromDatabase(userId : string) {
      return await this._service.getById(userId)
   }

   obtainById = async (req : Request, res : Response, next : NextFunction) => {

       try {
           if(!req.params.id) res.send('An id should be provided')
           res.status(200).json(await this.getUserFromDatabase(req.params.id))
       } catch (e) {
           next(e)
       }
   }


   obtainUser = async(req : Request, res : Response) => {
       res.status(200).send({user : req.body.user})
   }



   signUp = async (req : Request, res : Response, next : NextFunction) => {
       try {
           if(!req.body.user) throw new CustomError('User must be specified', 400)
           res.status(201).json({user: await this._service.create(req.body.user)})
       } catch(e) {
           next(e)
       }
   }

   login = async(req : Request, res : Response, next : NextFunction) => {
       try {
           let credentials = req.headers.authorization;
           if (!credentials || !credentials.startsWith('Basic ')) {
               throw new CustomError('Authorization header missing or incorrect', 401);
           }
           credentials = credentials.split(' ')[1]
           credentials = Buffer.from(credentials, 'base64').toString('ascii')
           let user : string | UserDTO = credentials.split(":")[0]
           let password = credentials.split(":")[1]
           if (!user || !password) {
               throw new CustomError('Invalid Authorization header format', 401);
           }
            user = await this._service.singIn(user, password)
           res.cookie('UserCookie',  await generateToken({
               userid: user.id
           }), {
               maxAge: 60 * 60 * 3600,
               secure: true,
               sameSite: "none"
           })
           return res.status(200).json({user: {...user}})
       } catch(e) {
          return next(e)
       }
   }

   emailConfirmation = async(req : Request, res : Response, next : NextFunction) => {
       try {
           return res.status(200).json({
               user: await this._service.verifyEmail(req.body.data.userid),
               verifiedEmail: req.body.data.email
           }

           )

       } catch(e) {
           return next(e)
       }
   }


   resetPassword = async(req : Request, res : Response, next : NextFunction) => {
       try {
           if(!req.body.newPassword) throw new CustomError(`A new password must be provided`, 400)
           if(!req.body.data.passwordResetToken) throw new CustomError(`The current password must be provided`, 401)
           return res.status(200).json({
               user : await this._service.resetPassword(req.body.data.userid, req.body.newPassword, req.body.data.passwordResetToken),
           })
       } catch(e) {
           return next(e)
       }
   }

 }
