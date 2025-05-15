import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email", // SMTP server host
    port: process.env.smtp_port || 587, // SMTP server port
    //secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
    auth: {
        user: process.env.smtp_user || "ethereal.user", // Email username
        pass: process.env.smtp_pass || "ethereal.pass", // Email password
    },
});

export default transporter;