const express = require('express');

/** Authentication Provider */
const AuthenticationProvider = require('../services/AuthenticationProvider');

/** Controllers */
const Controller = require('../controllers/authentication');

const authenticationController = new Controller();

/** Resources Provider */

/** Validators */
const CreateAuthenticationValidator = require('../middlewares/validators/createAuthenticationValidator');

/** Serializers */
const AuthenticationItemSerializer = require('../middlewares/serializers/itemSerializer');

const router = express.Router();

router.post(
  '/',
  CreateAuthenticationValidator,
  authenticationController.createAccessToken,
  AuthenticationItemSerializer,
);

router.delete(
  '/',
  AuthenticationProvider,
  authenticationController.removeAccessToken,
);

module.exports = router;
