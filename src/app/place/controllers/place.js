const PlaceServiceClass = require('../service/place');
const PlaceRepo = require('../repo/place');

const placeTable = new PlaceServiceClass(PlaceRepo);

const placeController = function () {};

placeController.prototype.getPlaces = async (req, res) => {
  this.query = null;
  try {
    this.query = await placeTable.findAll();
    res.status(200).json({
      code: 200,
      places: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

placeController.prototype.getPlace = async (req, res) => {
  this.query = null;
  try {
    this.query = await placeTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      places: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

placeController.prototype.insertPlace = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await placeTable.insert(input);
    res.status(201).json({
      code: 201,
      place: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

placeController.prototype.updatePlace = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await placeTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      place: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

placeController.prototype.deletePlace = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await placeTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

placeController.prototype.purgePlaces = async (req, res) => {
  this.query = null;
  try {
    this.query = await placeTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = placeController;
