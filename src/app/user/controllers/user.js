const UserServiceClass = require('../service/user');
const AvatarServiceClass = require('../service/avatar');
const userRepo = require('../repo/user');
const avatarRepo = require('../repo/avatar');
const Response = require('../../core/response');
const { sendSMSVerify, verifyCode } = require('../../core/twilioVerify');
const { CreateJWT } = require('../../authentication/services/JWTService');

const userTable = new UserServiceClass(userRepo);
const avatarTable = new AvatarServiceClass(avatarRepo);

const userController = function () {};

userController.prototype.getUser = async (req, res, next) => {
  this.queryUser = null;
  this.queryAvatar = null;
  try {
    this.queryUser = await userTable.findById(res.locals.userAuthenticated.id);
    this.queryAvatar = await avatarTable.findByUserId(
      res.locals.userAuthenticated.id,
    );

    if (this.queryUser.length === 0) {
      res.status(404);
      res.send(Response(res.statusCode, 'user.not_found', 'User not found.'));
    } else {
      [res.locals.user] = this.queryUser;
      [res.locals.avatarUser] = this.queryAvatar;
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(505);
    res.send(
      Response(
        res.statusCode,
        'user.internal_server_error',
        'An error occured, please retry later.',
      ),
    );
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

userController.prototype.updateUser = async (req, res, next) => {
  this.query = null;

  try {
    this.query = await userTable.update(
      res.locals.user,
      res.locals.userAuthenticated.id,
    );

    [res.locals.user] = this.query;
    next();
  } catch (e) {
    res.status(500);
    res.send(
      Response(
        res.statusCode,
        'user.internal_server_error',
        'An error occured, please retry later.',
      )
    );
  }
};

userController.prototype.uploadAvatar = async (req, res, next) => {
  this.query = null;

  this.query = await avatarTable.findByUserId(res.locals.userAuthenticated.id);

  if (this.query.length === 0) {
    try {
      this.query = await avatarTable.insert(
        res.locals.userAuthenticated.id,
        res.locals.avatarUser.img,
      );

      res.status(201);
      [res.locals.avatarUser] = this.query;
      next();
    } catch (e) {
      res.status(500);
      res.send(
        Response(
          res.statusCode,
          'user.internal_server_error',
          'An error occured, please retry later.',
        )
      );
    }
  } else {
    try {
      this.query = await avatarTable.update(
        res.locals.userAuthenticated.id,
        res.locals.avatarUser.img,
      );

      res.status(201);
      [res.locals.avatarUser] = this.query;
      next();
    } catch (e) {
      res.status(500);
      res.send(
        Response(
          res.statusCode,
          'user.internal_server_error',
          'An error occured, please retry later.',
        )
      );
    }
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
