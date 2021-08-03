const OutputAccesToken = (accessToken) => ({
  accessToken,
});

const AuthenticationItemSerializer = async (req, res) => {
  res.json({
    message: 'Authentication success',
    data: OutputAccesToken(res.locals.authentication),
  });
};

module.exports = AuthenticationItemSerializer;
