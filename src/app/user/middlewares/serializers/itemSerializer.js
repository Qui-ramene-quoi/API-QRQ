const OutputUser = (user) => ({
  id: user.id,
  username: user.username,
  phoneNumber: user.phone_number,
  email: user.email,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});


const UserItemSerializer = async (req, res) => {
  res.json({
    accessToken: res.locals.authentication,
    user: OutputUser(res.locals.user),
  });
};

module.exports = UserItemSerializer;
