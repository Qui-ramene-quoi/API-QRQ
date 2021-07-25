const express = require('express');

const router = express.Router();

/* Imports Routes */

const user = require('../app/user/routes/users');
const event = require('../app/event/routes/events');
const usersAvatar = require('../app/usersAvatar/routes/avatars');
const eventsAvatar = require('../app/eventsAvatar/routes/eventsAvatars');
const place = require('../app/place/routes/places');
const friend = require('../app/friend/routes/friends');

/* Use routes */

router.use('/users', user);
router.use('/events', event);

user.use('/:id/avatars', usersAvatar);
user.use('/id/friends', friend);
event.use('/:id/avatars', eventsAvatar);
event.use('/:id/places', place);

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

module.exports = router;
