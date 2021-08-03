const joi = require('joi');
const Response = require('../../../core/response');

const schema = joi.object({
  username: joi.string().alphanum().lowercase().required(),
  email: joi.string().email().required(),
});

const UpdateUserValidator = async (req, res, next) => {
  try {
    const result = await schema.validateAsync({
      username: req.body.username,
      email: req.body.email,
    });
    res.locals.user = result;
    next();
  } catch (err) {
    res.status(400);
    res.send(Response(res.statusCode, 'user.validation_failed', err.message));
  }
};

module.exports = UpdateUserValidator;
