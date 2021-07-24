const express = require('express');

/** Controllers */
const Controller = require('../controllers/place');

const PlaceController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router({ mergeParams: true });

router.get('/', PlaceController.getPlaces);

router.post('/', PlaceController.insertPlace);

router.get('/:id', PlaceController.getPlace);

router.put('/:id', PlaceController.updatePlace);

router.delete('/:id', PlaceController.deletePlace);

router.delete('/', PlaceController.purgePlaces);

module.exports = router;
