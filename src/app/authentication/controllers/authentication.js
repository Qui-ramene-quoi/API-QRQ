const UserServiceClass = require('../../user/service/user');
const userRepo = require('../../user/repo/user');
const Response = require('../../core/response');
const { sendSMSVerify, verifyCode } = require('../../core/twilioVerify');
const { CreateJWT } = require('../services/JWTService');
const {
  DelAuthentication,
  SetAuthentication,
} = require('../repositories/AuthenticationRepository');

const userTable = new UserServiceClass(userRepo);

const authenticationController = function () {};

authenticationController.prototype.createAccessToken = async (
  req,
  res,
  next
) => {
  this.query = null;
  const requestBody = res.locals.user;

  if (res.locals.step) {
    this.query = await userTable.findByPhone(requestBody.phoneNumber);
    if (this.query.length === 0) {
      res.status(401);
      res.send(
        Response(
          res.statusCode,
          'authentication.unauthorized',
          'Your phone number is invalid.'
        )
      );
    } else {
      try {
        await sendSMSVerify(this.query[0].phone_number);

        res.status(428);
        res.send(
          Response(res.statusCode, 'authentication.precondition_required', {
            message: 'The request must be resent with the OTP received by SMS.',
          })
        );
      } catch (err) {
        res.status(500);
        res.send(
          Response(
            res.statusCode,
            err.message,
            'An error occured, please retry later.'
          )
        );
      }
    }
  } else {
    this.query = await userTable.findByPhone(requestBody.phoneNumber);

    if (this.query.length === 0) {
      res.status(404);
      res.send(
        Response(
          res.statusCode,
          'authentication.unauthorized',
          'Your phone number is invalid.'
        )
      );
    } else {
      try {
        await verifyCode(requestBody.phoneNumber, requestBody.otp);

        const accessToken = CreateJWT({
          id: this.query[0].id,
          username: this.query[0].username,
          phoneNumber: this.query[0].phone_number,
          email: this.query[0].email,
          createdAt: new Date(),
        });

        const authenticationKey = `authentication:${this.query[0].id}`;

        try {
          await DelAuthentication(authenticationKey);
        } catch (err) {
          res.status(401);
          res.json(
            Response(
              res.statusCode,
              'authentication.unauthorized',
              'Your phone number is invalid.'
            )
          );
        }

        try {
          await SetAuthentication(authenticationKey, accessToken);
        } catch (err) {
          if (err) {
            res.status(401);
            res.json(
              Response(
                res.statusCode,
                'authentication.unauthorized',
                'Your phone number is invalid.'
              )
            );
          }
        }

        res.status(201);
        res.locals.authentication = accessToken;
        [res.locals.user] = this.query;
        next();
      } catch (err) {
        if (err.message === 'authentication.unauthorized.otp_invalid') {
          res.status(401);
          res.send(
            Response(res.statusCode, err.message, 'Your OTP is invalid.')
          );
        } else {
          res.status(500);
          res.send(
            Response(
              res.statusCode,
              err.message,
              'An error occured, please retry later.'
            )
          );
        }
      }
    }
  }
};

module.exports = authenticationController;
