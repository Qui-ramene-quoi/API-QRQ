const EventServiceClass = require('../service/event');
const EventRepo = require('../repo/event');
const InvitationServiceClass = require('../../invitation/service/invitation');
const InvitationRepo = require('../../invitation/repo/invitation');
const eventSerializer = require('../middlewares/serializers/event');
const eventDetailSerializer = require('../middlewares/serializers/eventDetail');

const eventTable = new EventServiceClass(EventRepo);
const invitationTable = new InvitationServiceClass(InvitationRepo);

const eventController = function () {};

eventController.prototype.getEvents = async (req, res) => {
  this.query = null;
  try {
    // User Id is needed
    this.query = await eventTable.findAll(req.body.userId);
    res.status(200).json({
      code: 200,
      events: this.query.map((value) => eventSerializer(value)),
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
      events: this.query.map((value) => eventDetailSerializer(value)),
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventController.prototype.insertEvent = async (req, res) => {
  this.query = null;
  this.invitationAuthorQuery = null;
  const input = req.body;
  try {
    this.query = await eventTable.insert(input);
    this.invitationAuthorQuery = await invitationTable.insertAuthor({
      userId: this.query[0].user_id,
      eventId: this.query[0].id,
    });
    res.status(201).json({
      code: 201,
      eventId: this.query[0].id,
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
    this.query = await eventTable.purge(req.body.id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = eventController;
