const express = require('express');

const router = express.Router();

/* Imports Routes */

const authentication = require('../app/authentication/routes/authentication');
const user = require('../app/user/routes/users');
const event = require('../app/event/routes/events');
const usersAvatar = require('../app/usersAvatar/routes/avatars');
const eventsAvatar = require('../app/eventsAvatar/routes/eventsAvatars');
const place = require('../app/place/routes/places');
const friend = require('../app/friend/routes/friends');
const invitation = require('../app/invitation/route/invitations');
const beverage = require('../app/beverage/routes/beverages');
const eventsBeverages = require('../app/eventsBeverages/routes/eventsBeverages');

/* Use routes */

const prefix = '/api/';

/**
 * Authentication's routes
 */
router.use(`${prefix}auth`, authentication);
/**
 * User's routes
 */
router.use(`${prefix}users`, user);

router.use('/events', event);

user.use('/:id/avatars', usersAvatar);
user.use('/id/friends', friend);
user.use('/id/invitations', invitation);
user.use('/:id/beverages', beverage);
event.use('/:id/avatars', eventsAvatar);
event.use('/:id/places', place);
event.use('/:id/eventsBeverages', eventsBeverages);

/**
 * GET v1/status
 */
router.get(`${prefix}/status`, (req, res) => res.send('OK'));

module.exports = router;
