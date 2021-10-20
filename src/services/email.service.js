const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { NO_REPLY_EMAIL_USER, NO_REPLY_EMAIL_PASSWORD } = require('../configs/config');
const { WRONG_EMAIL_ACTION } = require('../configs/error-messages.enum');
const { INTERNAL_SERVER_ERROR_500 } = require('../configs/status-codes.enum');
const allTemplates = require('../email-templates');
const Err = require('../errors/Err');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'src', 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: NO_REPLY_EMAIL_USER,
        pass: NO_REPLY_EMAIL_PASSWORD
    }
});

exports.sendEmail = async (userEmail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new Err(WRONG_EMAIL_ACTION, INTERNAL_SERVER_ERROR_500);
    }

    const { templateName, subject } = templateInfo;
    const html = await templateParser.render(templateName, context);

    return transporter.sendMail({
        from: 'no reply',
        to: userEmail,
        subject,
        html
    });
};
