import nodemailer from 'nodemailer';

import dotenv from "dotenv";
import Service from "./Service";
import {generateToken} from "../util/token";
import {injectable} from "tsyringe";
import CustomError from "../errors/CustomError";
dotenv.config();

@injectable()
export default class MailService extends Service {


    public validateEmailObject = async (email : JSON) => {
        if('from' in email && 'to' in email && 'subject' in email && 'html' in email) {
            for(const [key, value ] of Object.entries(email)) {
                if(typeof value !== 'string') {
                    throw new CustomError(`"${key} " : ${value} is not a valid string`, 400);
                }
            }

        } else {
            throw new CustomError(`The email object must contain from , to, subject and html text`, 400)
        }
    }
    public  sendMail = async (to: string, subject: string, html: string, link? : string) => {
        const transporter = nodemailer.createTransport({
            port: 587,
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USERNAME,
            to: to,
            subject: subject,
            html: link === null ? html : `${html}<div>Link: <a href="${link}">${link}</a></div>`
        };

        this.logger.info(`Sending mail to - ${to}`);
        transporter.sendMail(mailOptions, (error, info)=> {
            if (error) {
                this.logger.error(error);
            } else {
                this.logger.info('Email sent: ' + info.response);
            }
        });
    }


}
