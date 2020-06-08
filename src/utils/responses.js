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
  },
  resendEmailConfirm: {
    success: 'Email confirmation resent successfully',
    error: 'Error resending confirmation email, please try again',
    conflict: 'Email already confirmed please sign in',
    notfound: 'User Cannot be found'
  },
  forgotPassword: {
    success: 'Forgot password email sent',
    error: 'Error sending forgot password email, try again'
  },
  resetPassword: {
    success: 'Password has been reset',
    error: 'Error reseting password, try again'
  },
  createProfile: {
    success: 'Profile created successfully',
    error: 'Error creating profile, try again'
  },
  getProfile: {
    success: 'Profile retrieved successfully',
    error: 'Error retrieving profile, try again',
    notfound: 'Profile not found, please create one'
  },
  updateProfile: {
    success: 'Profile updated successfully',
    error: 'Error updating profile, try again'
  },
  getAllSmes: {
    success: 'All smes returned successfully',
    error: 'Error getting smes, try again',
    notfound: 'Smes cannot be found'
  },
  viewSmeProfile: {
    success: 'Sme profile displayed successfully',
    error: 'Error displaying sme profile, try again',
    notfound: 'Smes profile not found'

  },
  searchForSmes: {
    success: 'Smes searched successfully',
    error: 'Error searching sme, try again',
    notfound: 'Smes not found'
  },
  getAllInvestors: {
    success: 'All Investors returned successfully',
    error: 'Error getting investors, try again',
    notfound: 'Investors cannot be found'
  },
  viewInvestorProfile: {
    success: 'Investor profile displayed successfully',
    error: 'Error displaying investor profile, try again',
    notfound: 'Investor profile not found'
  },
  searchForInvestors: {
    success: 'Investors searched successfully',
    error: 'Error searching investor, try again',
    notfound: 'INvestors not found'
  },
  createConnection: {
    success: 'Connection requested successfully',
    error: 'Error requesting connection, try again'
  },
  acceptConnection: {
    success: 'Connection accepted successfully',
    error: 'Error accepting connection, try again'
  },
  declineConnection: {
    success: 'Connection declined successfully',
    error: 'Error declining connection, try again'
  },
  getConnection: {
    success: 'Connection retrieved successfully',
    error: 'Error retreiving connection details, try again',
    notfound: 'Connection not found'
  },
  getAllPendingConnections: {
    success: 'Connections retreived successfully',
    error: 'Error retreiving connection details, try again',
    notfound: 'Pending Connections not found'
  },
  getAllActiveConnections: {
    success: 'Connections retreived successfully',
    error: 'Error retreiving connection details, try again',
    notfound: 'Active Connections not found'
  },
  sendMessage: {
    success: 'Message sent successfully',
    error: 'Error sending message try again'
  },
  getAllMessages: {
    success: 'Messages retrieved successfully',
    error: 'Error retrieving messages, try again',
    notfound: 'Start sending messages now'
  },
  getMessage: {
    success: 'Message retrieved successfully',
    error: 'Error retrieving message, try again',
    notfound: 'Message not found'
  },
  updateMessage: {
    success: 'Message updated successfully',
    error: 'Error updating message, try again'
  },
  deleteMessage: {
    success: 'Message deleted successfully',
    error: 'Error deleting message, try again'
  },
  createProject: {
    success: 'Project created successfully',
    error: 'Error creating project, try again'
  },
  getProject: {
    success: 'Project retreived successfully',
    error: 'Error retrieving project, try again',
    notfound: 'Project not found'
  },
  updateProject: {
    success: 'Project updated successfully',
    error: 'Error updating project, try again'
  },
  getAllActiveProjects: {
    success: 'Active projects retreived successfully',
    error: 'Error retreiving active projects, try again',
    notfound: 'Active projects not found'
  },
  getAllGivenProjects: {
    success: 'Given projects retreived successfully',
    error: 'Error retreiving given projects, try again',
    notfound: 'Given projects not found'
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
