const express = require('express');

/** Authentication Provider */
const AuthenticationProvider = require('../../authentication/services/AuthenticationProvider');

/** Controllers */
const Controller = require('../controllers/notification');

const notificationController = new Controller();

/** Serializers */
const {
  NotificationItemSerializer,
  NotificationCollectionSerializer,
} = require('../middlewares/serializers/notificationSerializer');

const router = express.Router();

router.get(
  '/',
  AuthenticationProvider,
  notificationController.getNotifications,
  NotificationCollectionSerializer,
);

router.put(
  '/:id',
  AuthenticationProvider,
  notificationController.readUnreadNotification,
  NotificationItemSerializer,
);

module.exports = router;
