const UserAvatarServiceClass = require('../service/avatar');
const userAvatarRepo = require('../repo/avatar');

const userAvatarsTable = new UserAvatarServiceClass(userAvatarRepo);

const userAvatarController = function () {};

userAvatarController.prototype.getUserAvatars = async (req, res) => {
  this.query = null;
  try {
    this.query = await userAvatarsTable.findAll();
    res.status(200).json({
      code: 200,
      avatars: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userAvatarController.prototype.getUserAvatar = async (req, res) => {
  this.query = null;
  try {
    this.query = await userAvatarsTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      avatar: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userAvatarController.prototype.insertUserAvatar = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await userAvatarsTable.insert(input);
    res.status(201).json({
      code: 201,
      user: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userAvatarController.prototype.updateUserAvatar = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await userAvatarsTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      user: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userAvatarController.prototype.deleteUserAvatar = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await userAvatarsTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userAvatarController.prototype.purgeUserAvatars = async (req, res) => {
  this.query = null;
  try {
    this.query = await userAvatarsTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = userAvatarController;
