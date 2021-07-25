const EventsBeverageServiceClass = require('../service/eventsBeverages');
const EventsBeverageRepo = require('../repo/eventsBeverages');

const eventsBeverageTable = new EventsBeverageServiceClass(EventsBeverageRepo);

const eventsBeverageController = function () {};

eventsBeverageController.prototype.getEventsBeverages = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventsBeverageTable.findAll();
    res.status(200).json({
      code: 200,
      eventsBeverages: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventsBeverageController.prototype.getEventsBeverage = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventsBeverageTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      eventsBeverages: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventsBeverageController.prototype.insertEventsBeverage = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await eventsBeverageTable.insert(input);
    res.status(201).json({
      code: 201,
      eventsBeverage: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventsBeverageController.prototype.updateEventsBeverage = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await eventsBeverageTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      eventsBeverage: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventsBeverageController.prototype.deleteEventsBeverage = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await eventsBeverageTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

eventsBeverageController.prototype.purgeEventsBeverages = async (req, res) => {
  this.query = null;
  try {
    this.query = await eventsBeverageTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = eventsBeverageController;
