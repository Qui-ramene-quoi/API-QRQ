const express = require('express');

/** Controllers */
const Controller = require('../controllers/user');

const userController = new Controller();

/** Resources Provider */

/** Validators */
const CreateUserValidator = require('../middlewares/validators/CreateUserValidator');

/** Serializers */
const UserItemSerializer = require('../middlewares/serializers/itemSerializer');

const router = express.Router();

router.get('/', userController.getUsers);

router.post(
  '/',
  CreateUserValidator,
  userController.createUser,
  UserItemSerializer,
);

router.get('/:id', userController.getUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.delete('/', userController.purgeUsers);

module.exports = router;
