import emailTemplates from './email_template';

const { confirmEmailTemplate, passwordResetTemplate } = emailTemplates;

let html;
const emailTemplatesFunction = (category, data) => {
  switch (category) {
    case 'confirmEmail':
      html = confirmEmailTemplate(data);
      return {
        subject: 'Confirm your Email Account',
        html
      };
    case 'passwordReset':
      html = passwordResetTemplate(data);
      return {
        subject: 'Reset your password',
        html
      };
    default:
      return false;
  }
};

export default emailTemplatesFunction;
