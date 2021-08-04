const OutputAvatar = (avatar) => ({
  file: avatar.file,
});

const OutputFullUser = (user, avatar) => ({
  id: user.id,
  username: user.username,
  phoneNumber: user.phone_number,
  email: user.email,
  avatar: OutputAvatar(avatar),
  createdAt: user.created_at,
  updatedAt: user.updated_at,
});

const OutputPartialUser = (user) => ({
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
    user: OutputPartialUser(res.locals.user),
  });
};

const UserItemSerializer = async (req, res) => {
  res.json({
    message: 'User Profile',
    data: OutputFullUser(res.locals.user, res.locals.avatarUser),
  });
};

const UpdateUserItemSerializer = async (req, res) => {
  res.json({
    message: 'User Updated',
    data: OutputPartialUser(res.locals.user),
  });
};

const UploadAvatarUserItemSerializer = async (req, res) => {
  res.json({
    message: 'Avatar Uploaded.',
    data: OutputFullUser(res.locals.userAuthenticated, res.locals.avatarUser),
  });
};

module.exports = {
  UserCreatedItemSerializer,
  UserItemSerializer,
  UpdateUserItemSerializer,
  UploadAvatarUserItemSerializer,
};
