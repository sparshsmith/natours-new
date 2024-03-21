const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Sparsh Singh <${process.env.EMAIL_FROM}>`
    }

    newTransport() {
        if (process.env.NODE_ENV !== 'production') {
            return nodemailer.createTransport({
                service: 'SendinBlue',

                auth: {
                    user: process.env.SENDINBLUE_USERNAME,
                    pass: process.env.SENDINBLUE_SECRET
                }
            });
        }

        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            logger: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            },
            connectionTimeout: 10000,
            // Activate in gmail "less secure app" option
        })
    }

    async send(template, subject) {
        // 1. render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // 2. Define the email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.convert(html),
        };

        // 3. Create a transport and send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Natours Family!');
    }

    async senPasswordReset() {
        await this.send('passwordReset', 'Your password reset token(Valid for 10 mins)!');
    }
}
