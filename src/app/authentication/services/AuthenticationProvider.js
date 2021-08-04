const UserServiceClass = require('../../user/service/user');
const userRepo = require('../../user/repo/user');
const Response = require('../../core/response');
const AuthenticationChecker = require('./AuthenticationChecker');
const { DecodeJWT } = require('./JWTService');

const userTable = new UserServiceClass(userRepo);

const AuthenticationProvider = async (req, res, next) => {
  this.query = null;
  let token = null;

  try {
    token = await AuthenticationChecker(req.headers.authorization);
  } catch (err) {
    res.status(401);
    res.json(Response(res.statusCode, err.name, err.message));
  }

  const tokenDecoded = DecodeJWT(token);

  this.query = await userTable.findById(tokenDecoded.payload.id);

  res.locals.userAuthenticated = {
    id: this.query[0].id,
    phone_number: this.query[0].phone_number,
    username: this.query[0].username,
    email: this.query[0].email,
    created_at: this.query[0].created_at,
    updated_at: this.query[0].updated_at,
  };
  next();
};

module.exports = AuthenticationProvider;
