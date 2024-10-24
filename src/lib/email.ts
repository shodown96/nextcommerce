"use server"

import axios from 'axios';
import nodemailer from 'nodemailer';

const pathKVP = {
    contact: '/templates/contact.html',
}

type PathKVPType = 'contact'


const fetchHTML = async (url: string) => {
    const result = await axios.get(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/${url}`)
    return result.data
}


interface HTMLEmailProps {
    subject: string,
    params: any,
    emailType: PathKVPType
}

export const sendHTML = async ({
    subject,
    params,
    emailType
}: HTMLEmailProps) => {
    // const template = path.join(process.cwd(), pathKVP[emailType]);
    // const htmlTemplate = fs.readFileSync(template, 'utf-8');
    const htmlTemplate = await fetchHTML(pathKVP[emailType]);
    // Replace template placeholders with dynamic data
    const filledTemplate = htmlTemplate.replace(/{{(\w+)}}/g, (match: any, p1: any) => {
        return params[p1] || match;
    });
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const sent = await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_CONTACT_ADDRESS,
            subject: subject,
            html: filledTemplate,
        });
        if (sent) {
            if (process.env.NODE_ENV === 'development') {
                console.log('[email]: Email sent sucessfully!');
            }
            return true
        }
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.log('[email]: Email not sent!', error);
        }
        return false
    }
};