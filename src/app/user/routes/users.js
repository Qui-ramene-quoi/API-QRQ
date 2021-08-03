const express = require('express');

/** Authentication Provider */
const AuthenticationProvider = require('../../authentication/services/AuthenticationProvider');

/** Controllers */
const Controller = require('../controllers/user');

const userController = new Controller();

/** Resources Provider */

/** Validators */
const CreateUserValidator = require('../middlewares/validators/CreateUserValidator');

/** Serializers */
const {
  UserCreatedItemSerializer,
  UserItemSerializer,
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

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.delete('/', userController.purgeUsers);

module.exports = router;
