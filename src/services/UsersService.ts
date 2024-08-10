import UserRepository from "../repository/UserRepository";
import UserDTOConverter, {UserDTO} from "../dto/UserDTO";
import {AdministrationRoles, Administrator, Role, User} from "@prisma/client";
import CustomError from "../errors/CustomError";
import 'reflect-metadata';
import {inject, injectable} from "tsyringe";
import {compare, genSalt, hash} from "bcrypt";
import IService from "./IService";
import Service from "./Service";
import IRepository, {IUserRepository} from "../repository/IRepository";
@injectable()
export default class UsersService extends Service implements IService<User, UserDTO> {
    constructor(
        @inject('UserRepository') private _repository: IUserRepository
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
        let salt = await genSalt(10)
        user.password = await new Promise<string>((resolve, reject) => {
            hash(user.password, salt, (error, result) => {
                if(error) {
                    reject(new CustomError('Invalid credentials', 401))
                } else {
                    resolve(result)
                }
            })
        })
         let createdUser :   User & {
             administrator: (Administrator & {
                 administratorRoles: (AdministrationRoles & { role: Role })[]
             }) | null
         }


        try {
          createdUser = await this._repository.save(user)
        } catch (e) {
           throw this.translateError((e as Error))
        }
        return UserDTOConverter.getConverter().convertToDTO(createdUser)
    }


    async getById(id: string): Promise<UserDTO> {
        let user: User & {
            administrator: (Administrator & {
                administratorRoles: (AdministrationRoles & { role: Role })[]
            }) | null;
        } | null= null
        try {
            user = await this._repository.findById(id);
        }  catch(e) {
            throw this.translateError((e as Error))
        }
        if(user === null) throw new CustomError(`The user with id ${id} does not exists`, 404)
        return UserDTOConverter.getConverter().convertToDTO(user);
    }


    async getByUsername(username : string) : Promise<UserDTO> {

       return  await  this.getByUsernameCallback(username, (user :  User & {
           administrator: (Administrator & {
               administratorRoles: (AdministrationRoles & { role: Role })[]
           }) | null;
       }) => {
            return UserDTOConverter.getConverter().convertToDTO(user);
        })
    }


    private async getByUsernameCallback(username : string, cb : Function) {
        let user : User & {
            administrator: (Administrator & {
                administratorRoles: (AdministrationRoles & { role: Role })[]
            }) | null;
        } | null = null
        try {
            user = await this._repository.findByUsername(username)
        } catch(e) {
            throw this.translateError((e as Error))
        }
        if(user === null) throw new CustomError(`The user with username ${username} does not exist`, 404)
       return  cb(user)
    }

    async singIn(username : string, password : string) : Promise<UserDTO> {
        let user = await this.getByUsernameCallback(username,
            (user : User & {
                administrator: (Administrator & {
                    administratorRoles: (AdministrationRoles & { role: Role })[]
                }) | null;
            }) => {
                    return user
        })
        let result = await compare(password, user.password);
        if (!result) {
            throw new CustomError('Invalid credentials', 401);
        }

        return UserDTOConverter.getConverter().convertToDTO(user);
    }

    async remove(id: string): Promise<UserDTO> {
        let user :  User & {
            administrator: (Administrator & {
                administratorRoles: (AdministrationRoles & { role: Role })[]
            }) | null;
        } | null= null;
         try {
             user = await this._repository.delete(id)
         } catch(e) {
            throw this.translateError((e as Error))
         }
        return UserDTOConverter.getConverter().convertToDTO(user);

    }

    async update(user: User): Promise<UserDTO> {
        let updatedUser :   User & {
            administrator: (Administrator & {
                administratorRoles: (AdministrationRoles & { role: Role })[]
            }) | null;
        } | null = null
        try {
            updatedUser = await this._repository.update(user)
        } catch(e) {
            throw this.translateError((e as Error))
        }
        return UserDTOConverter.getConverter().convertToDTO(updatedUser)
    }

}
