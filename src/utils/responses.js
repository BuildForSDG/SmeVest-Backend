const messages = {
  signUp: {
    success: 'User Created Successfully',
    error: 'Could not sign up user try again',
    conflict: 'User with that email already exist'
  },
  signIn: {
    success: 'Successfully Signed In',
    notfound: 'User Cannot be found',
    error: 'Could not sign in user try again',
    invalid: 'Invalid Credentials',
    unverified: 'Email not verified, check your mail to verify'
  },
  emailConfirm: {
    success: 'Email confirmed successfully',
    error: 'Error confirming email, please try again'
  }
};


const forgeResponse = (res, statusCode, message, data = null, token = null) => {
  const response = {
    status: statusCode,
    message
  };

  if (data) response.data = data;
  if (data && token) response.data.token = token;
  return res.status(statusCode).json(response);
};

const successResponse = (res, statusCode,
  message, userData, token) => forgeResponse(res, statusCode, message, userData, token);

const errorResponse = (res, statusCode, message) => forgeResponse(res, statusCode, message);

const conflictResponse = (res, statusCode, message) => forgeResponse(res, statusCode, message);

export {
  successResponse,
  errorResponse,
  messages,
  conflictResponse
};
