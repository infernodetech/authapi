import CustomError from "../errors/CustomError";
import {AdministrationRoles, Administrator, Role, User} from "@prisma/client";

export default interface IRepository<T> {
    findAll() : Promise<T[]>
    findById(id : string) : Promise<T>
    save(object : T) : Promise<T>
    update(object : T) : Promise<T>
    delete(id : string) : Promise<T>
}


export interface IUserRepository extends IRepository<User> {

    findByUsername(username : string) : Promise<User & {
        administrator: (Administrator & {
            administratorRoles: (AdministrationRoles & { role: Role })[]
        }) | null;
    }>

    findById(id : string) : Promise<User & {
        administrator: (Administrator & {
            administratorRoles: (AdministrationRoles & { role: Role })[]
        }) | null;
    }>

    save(user : User) : Promise<User & {
        administrator: (Administrator & {
            administratorRoles: (AdministrationRoles & { role: Role })[]
        }) | null;
    }>

    update(user : User) : Promise<User & {
        administrator: (Administrator & {
            administratorRoles: (AdministrationRoles & { role: Role })[]
        }) | null;
    }>

    delete(id : string) : Promise<User & {
        administrator: (Administrator & {
            administratorRoles: (AdministrationRoles & { role: Role })[]
        }) | null;
    }>
}
