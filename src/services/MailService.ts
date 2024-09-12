import nodemailer from 'nodemailer';

import dotenv from "dotenv";
import Service from "./Service";
dotenv.config();


export default class MailService extends Service {
    sendMail = async (from: string, to: string, subject: string, html: string) => {
        const transporter = nodemailer.createTransport({
            service: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html
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
