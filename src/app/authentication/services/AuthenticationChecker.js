const VerifyJWT = require('./JWTService');

const AuthenticationChecker = async (authorizationHeader) => {
  if (authorizationHeader === undefined) {
    throw new Error('authentication.unauthorized.token_required');
  } else {
    const token = authorizationHeader.split(' ')[1];

    if (token === undefined || token.length === 0) {
      throw new Error('authentication.unauthorized.token_required');
    }

    try {
      VerifyJWT(token);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new Error('authentication.unauthorized.token_expired');
      }

      if (err.name === 'JsonWebTokenError') {
        switch (err.message) {
          case 'jwt malformed':
            throw new Error('authentication.unauthorized.token_malformed');
          case 'jwt signature is required':
            throw new Error(
              'authentication.unauthorized.token_signature_required',
            );
          case 'invalid signature':
            throw new Error(
              'authentication.unauthorized.token_signature_invalid',
            );
          default:
            break;
        }
      }
    }

    return token;
  }
};

module.exports = AuthenticationChecker;
