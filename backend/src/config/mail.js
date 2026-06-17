import nodemailer from 'nodemailer';
const MAIL_HOST = process.env.MAIL_HOST;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: Number(MAIL_PORT), // ✅ ensure number
    secure: Number(MAIL_PORT) === 465, // ✅ strict check
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // prevents local TLS issues
    }
});

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Error:', error);
    } else {
        console.log('✅ SMTP Server is ready to take messages');
    }
});

// Verify connection configuration
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ SMTP Connection Error:', error);
    } else {
        console.log('✅ SMTP Server is ready to take messages');
    }
});

const sendEmail = async (options) => {
    try {
        const message = {
            from: `Votify Team <${MAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        const info = await transporter.sendMail(message);
        console.log('✅ Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('❌ Email error:', error);
        throw error;
    }
};

export default sendEmail;