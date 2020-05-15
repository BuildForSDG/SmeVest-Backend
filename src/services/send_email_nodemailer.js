import nodemailer from 'nodemailer';
import { emailTemplateFunction } from '../utils';
import config from '../config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.mailUser,
    pass: config.mailPassword
  }
});


/**
 * Creates an instance of sendMail.
 *
 * @constructor
 * @param {string} receiver The desired email addres of the recipient.
 * @param {string} data.url The URL to be passed as string.
 * @returns {Object} e.g. {success: true, message: 'Email sent successfully'}
 *  or {success: false, error: 'Unauthorised'}
 */


export default async (receiver, category, data) => {
  try {
    const retrievedData = emailTemplateFunction(category, data);
    const {
      html,
      subject
    } = retrievedData;
    const msg = {
      to: receiver,
      from: '"SmeVest" smevest20@gmail.com',
      subject,
      html
    };
    const response = await transporter.sendMail(msg);
    let successRes;
    if (response && response.messageId) {
      successRes = { success: true, message: 'Email sent successfully' };
    }

    return successRes;
  } catch (error) {
    return { success: false, error };
  }
};
