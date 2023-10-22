const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = ({ to, link }) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USERNAME, 
            pass: process.env.MAILTRAP_PASSWORD, 
        },
    });

    const mailOptions = {
        from: 'p.jankowski931026@gmail.com',
        to,
        subject: 'Here is your verification link!',
        text: `Please click on the enclosed link to activate your account: ${link}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;

