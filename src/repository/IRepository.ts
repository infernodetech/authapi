import {Scope, User} from "@prisma/client";

export default interface IRepository<T> {
    findAll() : Promise<T[]>
    findById(id : string) : Promise<T>
    save(object : T) : Promise<T>
    update(object : T) : Promise<T>
    delete(id : string) : Promise<T>
}


export interface IUserRepository extends IRepository<User> {
    findByUsername(username : string) : Promise<User>
}

export interface IScopeRepository extends IRepository<Scope> {
    findScopeByTokenandClientId(tokenId : string, clientId : string) : Promise<Scope>
}
