const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync(
  path.join(__dirname, '../../../config/jwt/private.key'),
  {
    encoding: 'utf8',
  },
);
const publicKey = fs.readFileSync(
  path.join(__dirname, '../../../config/jwt/public.key'),
  {
    encoding: 'utf8',
  },
);

const i = 'Qui ramène quoi ? (QRQ)';
const s = 'contact@qrq.com';
const a = 'https://qrq.com/';

const CreateJWT = (payload) => {
  const signOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: 60 * 60 * 24 * 15,
    algorithm: 'RS256',
  };

  return jwt.sign(payload, privateKey, signOptions);
};

const VerifyJWT = (token) => {
  const verifyOptions = {
    issuer: i,
    subject: s,
    audience: a,
    expiresIn: 60 * 60 * 24 * 15,
    algorithm: ['RS256'],
  };

  return jwt.verify(token, publicKey, verifyOptions);
};

const DecodeJWT = (token) => jwt.decode(token, { complete: true });

module.exports = { CreateJWT, VerifyJWT, DecodeJWT };
