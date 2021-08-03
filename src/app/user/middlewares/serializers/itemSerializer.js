const OutputUser = (user) => ({
  id: user.id,
  username: user.username,
  phoneNumber: user.phone_number,
  email: user.email,
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

const UserCreatedItemSerializer = async (req, res) => {
  res.json({
    accessToken: res.locals.authentication,
    user: OutputUser(res.locals.user),
  });
};

const UserItemSerializer = async (req, res) => {
  res.json({
    message: 'User Profile',
    data: OutputUser(res.locals.user),
  });
};

const UpdateUserItemSerializer = async (req, res) => {
  res.json({
    message: 'User Updated',
    data: OutputUser(res.locals.user),
  });
};

module.exports = {
  UserCreatedItemSerializer,
  UserItemSerializer,
  UpdateUserItemSerializer,
};
