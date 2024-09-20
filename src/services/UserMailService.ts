import Service from "./Service";
import {generateToken} from "../util/token";
import MailService from "./MailService";
import {User} from "@prisma/client";
import app from "../app";

export default class UserMailService extends MailService {

    public sendEmailVerification = async( to: string, subject: string, html: string, userid : string) => {
        let link = await generateToken({
            userid: userid,
            email: to
        })
        link = `${process.env.MAIN_URL}/api/users/email-confirm/${link}`
        await this.sendMail( to , subject, html, link)
    }

    public sendResetPasswordEmail = async(to: string, subject: string, html: string, userid : string) => {
        let link = await generateToken({
            userid: userid,
            passwordRestToken: process.env.PWDRST_KEY
        })
        link = `${process.env.MAIN_URL}/api/users/password-reset/${link}`
        await this.sendMail( to , subject, html, link)
    }
}
