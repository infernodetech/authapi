import CustomError from "../errors/CustomError";
import {AdministrationRoles, Administrator, Role, User} from "@prisma/client";

export default interface IRepository<T> {
    findAll() : Promise<T[]>
    findById(id : string) : Promise<T>
    save(object : T) : Promise<T>
    update(object : T) : Promise<T>
    delete(id : string) : Promise<T>
}

export  interface UserRepository extends IRepository<User> {
    findByUsername(username : string) : User
}
