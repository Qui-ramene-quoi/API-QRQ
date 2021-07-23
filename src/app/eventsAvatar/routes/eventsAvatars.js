const express = require('express');

/** Controllers */
const Controller = require('../controllers/eventsAvatar');

const eventAvatarController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router();

router.get('/', eventAvatarController.getEventAvatars);

router.post('/', eventAvatarController.insertEventAvatar);

router.get('/:id', eventAvatarController.getEventAvatar);

router.put('/:id', eventAvatarController.updateEventAvatar);

router.delete('/:id', eventAvatarController.deleteEventAvatar);

router.delete('/', eventAvatarController.purgeEventAvatars);

module.exports = router;
