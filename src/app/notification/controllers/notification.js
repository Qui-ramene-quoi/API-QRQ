const NotificationServiceClass = require('../service/notification');
const notificationRepo = require('../repo/notification');
const Response = require('../../core/response');

const notificationTable = new NotificationServiceClass(notificationRepo);

const notificationController = function () {};

notificationController.prototype.getNotifications = async (req, res, next) => {
  this.query = null;

  try {
    this.query = await notificationTable.findAllUnreaded(
      res.locals.userAuthenticated.id,
    );

    res.locals.notifications = this.query;
    res.status(200);
    next();
  } catch (err) {
    res.status(500);
    res.send(
      Response(
        res.statusCode,
        'user.internal_server_error',
        'An error occured, please retry later.',
      ),
    );
  }
};

module.exports = notificationController;
