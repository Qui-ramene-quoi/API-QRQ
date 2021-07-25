const BeverageServiceClass = require('../service/beverage');
const BeverageRepo = require('../repo/beverage');

const beverageTable = new BeverageServiceClass(BeverageRepo);

const beverageController = function () {};

beverageController.prototype.getBeverages = async (req, res) => {
  this.query = null;
  try {
    this.query = await beverageTable.findAll();
    res.status(200).json({
      code: 200,
      beverages: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

beverageController.prototype.getBeverage = async (req, res) => {
  this.query = null;
  try {
    this.query = await beverageTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      beverages: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

beverageController.prototype.insertBeverage = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await beverageTable.insert(input);
    res.status(201).json({
      code: 201,
      beverage: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

beverageController.prototype.updateBeverage = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await beverageTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      beverage: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

beverageController.prototype.deleteBeverage = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await beverageTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

beverageController.prototype.purgeBeverages = async (req, res) => {
  this.query = null;
  try {
    this.query = await beverageTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = beverageController;
