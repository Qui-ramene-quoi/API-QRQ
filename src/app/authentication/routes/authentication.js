const express = require('express');

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

module.exports = router;
