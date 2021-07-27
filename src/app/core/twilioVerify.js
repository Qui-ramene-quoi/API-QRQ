const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyService = process.env.TWILIO_SERVICE;
const client = require('twilio')(accountSid, authToken);

const sendSMSVerify = (phoneNumber) => {
  client.verify
    .services(verifyService)
    .verifications.create({ to: phoneNumber, channel: 'sms' })
    .then((verification) => {
      if (verification.sid === undefined) {
        throw new Error('OTP not send.');
      }
    });
};

const verifyCode = (phoneNumber, code) => {
  client.verify
    .services(verifyService)
    .verificationChecks.create({ to: phoneNumber, code })
    .then((verificationCheck) => {
      if (verificationCheck.status !== 'approved') {
        throw new Error('OTP is not valid.');
      }
    });
};

module.exports = { sendSMSVerify, verifyCode };
