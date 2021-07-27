const UserServiceClass = require('../service/user');
const userRepo = require('../repo/user');
const Response = require('../../core/response');
const { sendSMSVerify, verifyCode } = require('../../core/twilioVerify');
const { CreateJWT } = require('../../authentication/services/JWTService');

const userTable = new UserServiceClass(userRepo);

const userController = function () {};

userController.prototype.getUsers = async (req, res) => {
  this.query = null;
  try {
    this.query = await userTable.findAll();
    res.status(200).json({
      code: 200,
      users: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.getUser = async (req, res) => {
  this.query = null;
  try {
    this.query = await userTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      user: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.createUser = async (req, res, next) => {
  this.query = null;
  const requestBody = res.locals.user;

  if (res.locals.step) {
    this.query = await userTable.findByPhone(requestBody.phoneNumber);

    if (this.query.length === 0) {
      try {
        this.query = await userTable.insert(requestBody);

        sendSMSVerify(requestBody.phoneNumber);

        res.status(428);
        res.send(
          Response(res.statusCode, 'user.precondition_required', {
            message: 'The request must be resent with the OTP received by SMS.',
            data: { tokenConfirm: this.query[0].token_confirm },
          })
        );
      } catch (err) {
        res.status(500);
        res.send(
          Response(
            res.statusCode,
            'user.internal_server_error',
            'An error occured, please retry later.',
          )
        );
      }
    } else if (
      this.query[0].token_confirm === null &&
      this.query[0].confirmed === true
    ) {
      res.status(409);
      res.send(
        Response(
          res.statusCode,
          'user.phone_number_already_exist',
          'Phone number is already take by another user.',
        )
      );
    } else {
      try {
        sendSMSVerify(requestBody.phoneNumber);
      } catch (err) {
        res.status(500);
        res.send(
          Response(
            res.statusCode,
            'user.internal_server_error',
            'An error occured, please retry later.',
          )
        );
      }

      res.status(428);
      res.send(
        Response(res.statusCode, 'user.precondition_required', {
          message: 'The request must be resent with the OTP received by SMS.',
          data: { tokenConfirm: this.query[0].token_confirm },
        })
      );
    }
  } else {
    this.query = await userTable.findByPhoneNumberAndTokenConfirm(
      requestBody.phoneNumber,
      requestBody.tokenConfirm,
    );

    if (this.query.length === 0) {
      res.status(404);
      res.send(Response(res.statusCode, 'user.not_found', 'User not found.'));
    } else {
      try {
        verifyCode(requestBody.phoneNumber, requestBody.otp);
      } catch (err) {
        res.status(500);
        res.send(
          Response(
            res.statusCode,
            'user.internal_server_error',
            'An error occured, please retry later.',
          )
        );
      }

      this.query = await userTable.confirmUser(this.query[0].id);

      const accessToken = CreateJWT({
        id: this.query[0].id,
        username: this.query[0].username,
        phoneNumber: this.query[0].phone_number,
        email: this.query[0].email,
        createdAt: new Date(),
      });

      res.status(201);
      res.locals.authentication = accessToken;
      [res.locals.user] = this.query;
      next();
    }
  }
};

userController.prototype.updateUser = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await userTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      user: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.deleteUser = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await userTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.purgeUsers = async (req, res) => {
  this.query = null;
  try {
    this.query = await userTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = userController;
