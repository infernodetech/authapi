import Repository from "./Repository";
import IRepository, {IUserRepository} from "./IRepository";
import { User} from "@prisma/client";
import 'reflect-metadata'
import {injectable, singleton} from "tsyringe";

@injectable()
@singleton()
export default class UserRepository extends Repository implements IUserRepository {
   async  findAll(): Promise<User[]> {
        try {
            return await Repository.getPrismaClient().user.findMany({
            })
        } catch (e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async findByUsername(username: string): Promise<User> {
        try {
            let user = await Repository.getPrismaClient().user.findUnique({
                where: {
                    username: username
                },
            })
                return user!
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }

    async findByEmail(email : string) : Promise<User> {
       try {
           let user = await Repository.getPrismaClient().user.findUnique({
               where: {
                   email: email
               },
           })
           return user!
       } catch(e) {
           throw this.handlePrismaErrors(e)
       }
    }
    async findById(id: string): Promise<User> {
        try {
            let user = await Repository.getPrismaClient().user.findUnique({
                where: {
                    id: id
                },
            });

            return user!
        } catch (e) {
            throw this.handlePrismaErrors(e);
        }
    }
    async save(user: User): Promise<User> {
        try {
            let createdUser = await Repository.getPrismaClient().user.create({
                data: user,
            })
            return createdUser!
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async update(user: User): Promise<User> {
        try {
            return await Repository.getPrismaClient().user.update({
                where: {
                    id: user.id
                },

                data: user
            })
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }
    async delete(id: string): Promise<User> {
        try {
            return await Repository.getPrismaClient().user.delete({
                where: {
                    id: id
                },
            })
        } catch(e) {
            throw this.handlePrismaErrors(e)
        }
    }

}
