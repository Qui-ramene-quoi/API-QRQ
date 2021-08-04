const express = require('express');

/** Controllers */
const Controller = require('../controllers/event');

const EventController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router();

router.get('/', EventController.getEvents);

router.post('/', EventController.insertEvent);

router.get('/:id', EventController.getEvent);

router.put('/:id', EventController.updateEvent);

router.put('/:id/publish', EventController.publishEvent);

router.get('/:id/guests', EventController.getEventGuests);

router.delete('/:id', EventController.deleteEvent);

router.delete('/', EventController.purgeEvents);

module.exports = router;
