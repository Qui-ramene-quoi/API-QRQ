const express = require('express');

/** Authentication Provider */
const AuthenticationProvider = require('../../authentication/services/AuthenticationProvider');

/** Controllers */
const Controller = require('../controllers/user');

const userController = new Controller();

/** Resources Provider */

/** Validators */
const CreateUserValidator = require('../middlewares/validators/CreateUserValidator');
const UpdateUserValidator = require('../middlewares/validators/UpdateUserValidator');
const UploadAvatarUserValidator = require('../middlewares/validators/UploadAvatarUserValidator');

/** Serializers */
const {
  UserCreatedItemSerializer,
  UserItemSerializer,
  UpdateUserItemSerializer,
  UploadAvatarUserItemSerializer,
} = require('../middlewares/serializers/itemSerializer');

const router = express.Router();

router.post(
  '/',
  CreateUserValidator,
  userController.createUser,
  UserCreatedItemSerializer,
);

router.get(
  '/me',
  AuthenticationProvider,
  userController.getUser,
  UserItemSerializer,
);

router.put(
  '/me',
  AuthenticationProvider,
  UpdateUserValidator,
  userController.updateUser,
  UpdateUserItemSerializer,
);

router.post(
  '/me/avatar',
  AuthenticationProvider,
  UploadAvatarUserValidator,
  userController.uploadAvatar,
  UploadAvatarUserItemSerializer,
);

router.delete('/:id', userController.deleteUser);

router.delete('/', userController.purgeUsers);

module.exports = router;
