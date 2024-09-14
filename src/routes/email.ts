import {Router} from "express";
import {container} from "tsyringe";
import MailController from "../controllers/MailController";

const router = Router()
const controller = container.resolve(MailController)
router.post('/verification', controller.sendEmailVerification)
router.post('/new', controller.sendNewEmail)


export default router
