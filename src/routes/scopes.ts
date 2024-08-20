import {Router} from "express";
import {container} from "tsyringe";
import ScopeController from "../controllers/ScopeController";
import authentication from "../middleware/auth";
import UserController from "../controllers/UserController";

const router = Router()
const controller = container.resolve(ScopeController)
const userController = container.resolve(UserController)
router.get('/info', controller.obtainAll)
router.get('/id/:id', controller.obtainById)
router.post('/check', controller.checkToken)
router.use(authentication(userController))
router.post('/new', controller.createScope)

export default router
