import express, { Router } from 'express'
import authentication from "../middleware/auth";
import {container} from "tsyringe";
import UserController from "../controllers/UserController";
const router = Router()
import '../containerConfig'
import tokenVerification from "../middleware/tokenVerification";

 const controller = container.resolve(UserController);
router.get('/email-confirm/:verificationToken', tokenVerification, controller.emailConfirmation)
router.post('/reset-password/:verificationToken', tokenVerification, controller.resetPassword)
router.post('/reset-password', controller.resetPassword)
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registers a new user.
 *     description: Registers a new user.
 *     parameters:
 *       - in: body
 *         name: user
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *             - email
 *             - firstname
 *             - lastname
 *           properties:
 *             username:
 *               type: string
 *               description: The username of the new user
 *             firstname:
 *               type: string
 *               description: Firstname of the person who is signing up
 *             lastname:
 *               type: string
 *               description: Lastname of the person who is signing up
 *             email:
 *               type: string
 *               description: Email of the new user
 *             password:
 *               type: string
 *               description: Password of the new user
 *     responses:
 *       '201':
 *         description: User was created successfully
 *       '400':
 *         description: Some of the required fields already exists
 *       '500':
 *         description: Internal server error
 */
router.post('/register', controller.signUp)
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Logs in the user.
 *     description: Logs in the user and returns a user object.
 *     components:
 *       securityDefinitions:
 *         basicAuth:
 *           type: http
 *           scheme: basic
 *     security:
 *       - basicAuth: []
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *       '422':
 *         description: The username or the email already exists
 *       '400':
 *         description: The format of some of the user fields is not valid or there is a duplicate value on db
 *       '500':
 *         description: Internal server error
 */

router.post('/login', controller.login)
router.use(authentication(controller))

/**
 * @swagger
 * /info:
 *   get:
 *     summary: Obtains all the users.
 *     description: Obtains the basic info off all the users.
 *     responses:
 *       '200':
 *         description: Showing all the users that are registered successfully
 *       '404':
 *         description: There are no users registered on the system
 *
 *       '500':
 *         description: Internal server error
 */
router.get('/info' , controller.obtainAll)
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtains a user.
 *     description: Obtains a user with the given id.
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       '200':
 *         description: User obtained successfully
 *       '404':
 *         description: The user  with the specified id does not exist
 *       '500':
 *         description: Internal server error
 */
router.get('/user/:id', controller.obtainById)
export default router
