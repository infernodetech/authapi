import UserRepository from "../repository/UserRepository";
import UserDTOConverter, {UserDTO} from "../dto/UserDTO";
import {User} from "@prisma/client";
import CustomError from "../errors/CustomError";
import 'reflect-metadata';
import {inject, injectable} from "tsyringe";
import {compare, genSalt, hash} from "bcrypt";
import IService from "./IService";
import Service from "./Service";
import IRepository from "../repository/IRepository";
import {hashString} from "../util/utils";
import MailService from "./MailService";
import UserMailService from "./UserMailService";
@injectable()
export default class UsersService extends Service implements IService<User, UserDTO> {
    constructor(
        @inject('UserRepository') private _repository: UserRepository,
        @inject("UserMailService") private _mail : UserMailService
    ) {
        super()
    }
    async getAll() :  Promise<UserDTO[]> {
        let users : User[] = []
        try {
             users   = await this._repository.findAll()
        } catch(e) {
            throw this.translateError((e as Error) )
        }
        if(users.length <= 0) throw new CustomError('There are no users', 404)
        return UserDTOConverter.getConverter().convertListToDTO(users)

    }


    private async checkUserInfo(user : User) {
        if('username' in user && 'password' in user && 'email' in user && 'firstname' in user && 'lastname' in user) {
            if(typeof user.username !== 'string') {
                throw new CustomError(`The username ${user.username} must be a string`, 400)
            }
            if(typeof user.password !== 'string') {
                throw new CustomError(`The password ${user.password} must be a string`, 400)
            }
            if(typeof user.email !== 'string') {
                throw new CustomError(`The email ${user.email} must be a string`, 400)
            }

        } else {
            throw new CustomError('username, password, email, firstname and lastname must be specified', 400)
        }
    }


    async create(user : User) : Promise<UserDTO> {
        await this.checkUserInfo(user)
        user.password = await hashString(user.password, () => {
            new CustomError('Error creating credentials', 500)
        })
        try {
          user = await this._repository.save(user)
        } catch (e) {
           throw this.translateError((e as Error))
        }

        this._mail.sendEmailVerification(user.email, "Resetear contraseña", `Bienvenido ${user.firstname}, 
        Haz click en el enlace que se muestra a continuacion para verificar tu correo electronico`, user.id)
        return UserDTOConverter.getConverter().convertToDTO(user)
    }


    async getById(id: string): Promise<UserDTO> {
        return await this.getUserCallback(id, "id", (user : User) => {
            return UserDTOConverter.getConverter().convertToDTO(user);
        })

    }

    private async getUserCallback(searchParam: string, searchType: 'id' | 'email' | 'username', cb: Function) {
        let user: User | null = null;
        try {
            switch (searchType) {
                case 'id':
                    user = await this._repository.findById(searchParam);
                    break;
                case 'email':
                    user = await this._repository.findByEmail(searchParam);
                    break;
                case 'username':
                    user = await this._repository.findByUsername(searchParam);
                    break;
            }
        } catch(e) {
            this.translateError((e as Error))
        }


            if (user === null) {
                throw new CustomError(`The user with ${searchType} ${searchParam} does not exist`, 404);
            }



        return cb(user);
    }


    async singIn(username : string, password : string) : Promise<UserDTO> {
        let user = await this.getUserCallback(username, "username",
            (user : User | null) => {return user})


        if(!user.verifiedEmail) {
            throw new CustomError('Email not verified', 401)
        }
        if (!await compare(password, user.password)) {
            throw new CustomError('Invalid credentials', 401);
        }


        return UserDTOConverter.getConverter().convertToDTO(user);
    }

    async remove(id: string): Promise<UserDTO> {
        let user : User | null = null;
         try {
             user = await this._repository.delete(id)
         } catch(e) {
            throw this.translateError((e as Error))
         }
        return UserDTOConverter.getConverter().convertToDTO(user);

    }

    async update(user: User): Promise<UserDTO> {
        let updatedUser :   User | null = null
        try {
            updatedUser = await this._repository.update(user)
        } catch(e) {
            throw this.translateError((e as Error))
        }
        return UserDTOConverter.getConverter().convertToDTO(updatedUser)
    }

    async verifyEmail(id : string ) : Promise<UserDTO> {
      return this.getUserCallback(id, "id", async (user : User ) => {
          if(user.verifiedEmail) {
              throw new CustomError('Email already verified', 400)
          }

          user.verifiedEmail = true;
          return await this.update(user)
      })



    }


    async sendPasswordReset(email : string) : Promise<UserDTO> {
        return await this.getUserCallback(email, "email", (user : User) => {
            this._mail.sendResetPasswordEmail(user.email, "Reestablecer  contraseña", "Haz click en el siguiente link para reestablecer la contraseña", user.id)
        })
    }
    async resetPassword(email : string, newPassword : string, resetVerification : string) : Promise<UserDTO> {

        return await this.getUserCallback(email, "email", async(user : User) => {
            if(await compare(resetVerification, user.password) || await compare(process.env.PWDRST_KEY!, resetVerification)) {
                user.password = await hashString(newPassword, () => {
                    throw new CustomError(`There is been an error creating new password`, 500)
                })
                return this.update(user)
            } else {
                throw new CustomError('Invalid link', 401)
            }

        })
    }
}
