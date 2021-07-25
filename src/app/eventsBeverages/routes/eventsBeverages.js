const express = require('express');

/** Controllers */
const Controller = require('../controllers/eventsBeverages');

const EventsBeverageController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router({ mergeParams: true });

router.get('/', EventsBeverageController.getEventsBeverages);

router.post('/', EventsBeverageController.insertEventsBeverage);

router.get('/:id', EventsBeverageController.getEventsBeverage);

router.put('/:id', EventsBeverageController.updateEventsBeverage);

router.delete('/:id', EventsBeverageController.deleteEventsBeverage);

router.delete('/', EventsBeverageController.purgeEventsBeverages);

module.exports = router;
