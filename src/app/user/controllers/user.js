const UserServiceClass = require('../service/user');
const userRepo = require('../repo/userRepo');

const userTable = new UserServiceClass(userRepo);

const userController = function () {};

userController.prototype.getUsers = async (req, res) => {
  this.query = null;
  try {
    this.query = await userTable.findAll();
    res.status(200).json({
      code: 200,
      users: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.getUser = async (req, res) => {
  this.query = null;
  try {
    this.query = await userTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      user: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.insertUser = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await userTable.insert(input);
    res.status(201).json({
      code: 201,
      user: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.updateUser = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await userTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      user: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.deleteUser = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await userTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

userController.prototype.purgeUsers = async (req, res) => {
  this.query = null;
  try {
    this.query = await userTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = userController;
