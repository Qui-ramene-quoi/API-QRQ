const EventServiceClass = require('../service/event');
const EventRepo = require('../repo/event');

const eventTable = new EventServiceClass(EventRepo);

const eventController = function () {};

eventController.prototype.getEvents = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventTable.findAll();
    res.status(200).json({
      code: 200,
      events: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventController.prototype.getEvent = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      events: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventController.prototype.insertEvent = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await eventTable.insert(input);
    res.status(201).json({
      code: 201,
      event: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventController.prototype.updateEvent = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await eventTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      event: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventController.prototype.publishEvent = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventTable.publish(req.params.id);
    res.status(200).json({
      code: 200,
      event: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventController.prototype.deleteEvent = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await eventTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventController.prototype.purgeEvents = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = eventController;
