const FriendServiceClass = require('../service/friend');
const FriendRepo = require('../repo/friend');

const friendTable = new FriendServiceClass(FriendRepo);

const friendController = function () {};

friendController.prototype.getFriends = async (req, res) => {
  this.query = null;
  try {
    this.query = await friendTable.findAll();
    res.status(200).json({
      code: 200,
      friends: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

friendController.prototype.getFriend = async (req, res) => {
  this.query = null;
  try {
    this.query = await friendTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      friends: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

friendController.prototype.insertFriend = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await friendTable.insert(input);
    res.status(201).json({
      code: 201,
      friend: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

friendController.prototype.updateFriend = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await friendTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      friend: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

friendController.prototype.deleteFriend = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await friendTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

friendController.prototype.purgeFriends = async (req, res) => {
  this.query = null;
  try {
    this.query = await friendTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = friendController;
