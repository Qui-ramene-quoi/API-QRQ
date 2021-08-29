const joi = require('joi');
const JoiPhoneNumber = joi.extend(require('joi-phone-number'));
const Response = require('../../../core/response');

const firstStep = joi.object({
  phoneNumber: JoiPhoneNumber.string()
    .phoneNumber({
      defaultCountry: 'FR',
      format: 'e164',
      strict: true,
    })
    .required(),
});

const secondStep = joi.object({
  phoneNumber: JoiPhoneNumber.string()
    .phoneNumber({
      defaultCountry: 'FR',
      format: 'e164',
    })
    .required(),
  otp: joi.number().required(),
});

const UpdatePhoneNumberUserValidator = async (req, res, next) => {
  if (req.body.phoneNumber !== undefined && req.body.otp === undefined) {
    try {
      const result = await firstStep.validateAsync({
        phoneNumber: req.body.phoneNumber,
      });
      res.locals.user = result;
      res.locals.step = true;
      next();
    } catch (err) {
      res.status(400);
      res.send(Response(res.statusCode, 'user.validation_failed', err.message));
    }
  } else if (req.body.phoneNumber !== undefined && req.body.otp !== undefined) {
    try {
      const result = await secondStep.validateAsync({
        phoneNumber: req.body.phoneNumber,
        otp: req.body.otp,
      });
      res.locals.user = result;
      res.locals.step = false;
      next();
    } catch (err) {
      res.status(400);
      res.send(Response(res.statusCode, 'user.validation_failed', err.message));
    }
  }
};

module.exports = UpdatePhoneNumberUserValidator;
