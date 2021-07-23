const EventAvatarServiceClass = require('../service/eventsAvatar');
const eventAvatarRepo = require('../repo/eventsAvatar');

const eventsAvatarTable = new EventAvatarServiceClass(eventAvatarRepo);

const eventAvatarController = function () {};

eventAvatarController.prototype.getEventAvatars = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventsAvatarTable.findAll();
    res.status(200).json({
      code: 200,
      avatars: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventAvatarController.prototype.getEventAvatar = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventsAvatarTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      avatar: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventAvatarController.prototype.insertEventAvatar = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await eventsAvatarTable.insert(input);
    res.status(201).json({
      code: 201,
      avatar: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventAvatarController.prototype.updateEventAvatar = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await eventsAvatarTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      avatar: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventAvatarController.prototype.deleteEventAvatar = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await eventsAvatarTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventAvatarController.prototype.purgeEventAvatars = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventsAvatarTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = eventAvatarController;
