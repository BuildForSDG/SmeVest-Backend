const sendMailMock = jest.fn();

module.exports = {
  createTransport: jest.fn().mockReturnValue({ sendMail: sendMailMock })
};
