import UsersService from "./services/UsersService";
import UserRepository from "./repository/UserRepository";
import UserController from "./controllers/UserController";
import {container} from "tsyringe";
import {IScopeRepository, IUserRepository} from "./repository/IRepository";
import ScopeService from "./services/ScopeService";
import ScopeRepository from "./repository/ScopeRepository";
container.registerSingleton('UsersService', UsersService);
container.registerSingleton<IUserRepository>('UserRepository',  UserRepository);
container.registerSingleton<IScopeRepository>('ScopeRepository', ScopeRepository);
container.registerSingleton('UserController', UserController);
container.registerSingleton('ScopeService', ScopeService)
