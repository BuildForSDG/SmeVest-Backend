import emailTemplates from './email_template';

const { confirmEmailTemplate } = emailTemplates;

let html;
const emailTemplatesFunction = (category, data) => {
  switch (category) {
    case 'confirmEmail':
      html = confirmEmailTemplate(data);
      return {
        subject: 'Confirm your Email Account',
        html
      };
    default:
      return false;
  }
};

export default emailTemplatesFunction;
