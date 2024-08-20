import Repository from "./Repository";
import IRepository from "./IRepository";
import {Scope} from "@prisma/client";
import {injectable} from "tsyringe";
@injectable()
export default class ScopeRepository extends Repository implements IRepository<Scope> {
    async findAll(): Promise<Scope[]> {
        try {
            return await Repository.getPrismaClient().scope.findMany({
            })
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async findById(id: string): Promise<Scope> {
        try {
            let scope = await  Repository.getPrismaClient().scope.findUnique({
                where: {
                    id: id
                }
            })
            return scope!
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async save(scope: Scope): Promise<Scope> {
        try {
            let createdScope = await Repository.getPrismaClient().scope.create({
                data: scope
            })
            return createdScope!
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async update(scope: Scope): Promise<Scope> {
        try {
            let updatedScope = await Repository.getPrismaClient().scope.update({
                where: {
                    id: scope.id
                },
                data: scope
            })
            return updatedScope!
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
   async  delete(id: string): Promise<Scope> {
        try{
            return await Repository.getPrismaClient().scope.delete({
                where: {
                    id: id
                }
            })
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }


   async findScopeByTokenandClientId(tokenId : string, clientId : string) {
        try {
            return await Repository.getPrismaClient().scope.findFirst({
                where: {
                    tokenId: tokenId,
                    clientId: clientId
                }
            })
        }catch (e) {
            throw this.handlePrismaErrors(e)
        }
   }

}
