import transporter from "../config/email.config.js";

class EmailProvider {
    async sendEmail(to, subject, text) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to,
                subject,
                text,
            };
            const info = await transporter.sendMail(mailOptions);
            return info; 
        } catch (err) {
            console.error("Error sending email:", err);
            throw new Error("Failed to send email");
        }
    }
}

export default new EmailProvider(); 