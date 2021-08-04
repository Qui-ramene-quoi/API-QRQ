const joi = require('joi');
const Response = require('../../../core/response');

const schema = joi.object({
  img: joi.string().dataUri().required(),
});

const UploadAvatarUserValidator = async (req, res, next) => {
  try {
    const result = await schema.validateAsync({ img: req.body.img });
    res.locals.avatarUser = result;
    next();
  } catch (err) {
    res.status(400);
    res.send(
      Response(res.statusCode, 'user.avatar.validation_failed', err.message),
    );
  }
};

module.exports = UploadAvatarUserValidator;
