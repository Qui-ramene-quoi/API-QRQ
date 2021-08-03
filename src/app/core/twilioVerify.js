const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyService = process.env.TWILIO_SERVICE;
const client = require('twilio')(accountSid, authToken);

const sendSMSVerify = async (phoneNumber) => {
  let verification = null;

  try {
    verification = await client.verify
      .services(verifyService)
      .verifications.create({ to: phoneNumber, channel: 'sms' });
  } catch (err) {
    throw new Error('authentication.unauthorized.internal_error_server');
  }

  if (verification.sid === undefined) {
    throw new Error('authentication.unauthorized.otp_not_send');
  }
};

const verifyCode = async (phoneNumber, code) => {
  let verificationCheck = null;

  try {
    verificationCheck = await client.verify
      .services(verifyService)
      .verificationChecks.create({ to: phoneNumber, code });
  } catch (error) {
    throw new Error('authentication.unauthorized.internal_error_server');
  }

  if (verificationCheck.status !== 'approved') {
    throw new Error('authentication.unauthorized.otp_invalid');
  } else {
    return true;
  }
};

module.exports = { sendSMSVerify, verifyCode };
