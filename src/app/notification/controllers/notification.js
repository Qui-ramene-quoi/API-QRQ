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

notificationController.prototype.readUnreadNotification = async (
  req,
  res,
  next,
) => {
  this.queryFindNotification = null;
  this.queryUpdateNotification = null;

  try {
    this.queryFindNotification = await notificationTable.findById(
      req.params.id,
    );

    if (
      this.queryFindNotification === null ||
      this.queryFindNotification.length === 0
    ) {
      res.status(404);
      res.send(
        Response(
          res.statusCode,
          'notification.not_found',
          'Notification not found.',
        ),
      );
    } else if (this.queryFindNotification[0].read) {
      try {
        this.queryUpdateNotification = await notificationTable.unreadNotification(
          this.queryFindNotification[0].id,
        );

        res.locals.responseMessage = 'Notification unreaded.';
        [res.locals.notification] = this.queryUpdateNotification;
        next();
      } catch (err) {
        res.status(500);
        res.send(
          Response(
            res.statusCode,
            'notification.internal_server_error',
            'An error occured, please retry later.',
          ),
        );
      }
    } else {
      try {
        this.queryUpdateNotification = await notificationTable.readNotification(
          this.queryFindNotification[0].id,
        );

        res.locals.responseMessage = 'Notification readed.';
        [res.locals.notification] = this.queryUpdateNotification;
        next();
      } catch (err) {
        res.status(500);
        res.send(
          Response(
            res.statusCode,
            'notification.internal_server_error',
            'An error occured, please retry later.',
          ),
        );
      }
    }
  } catch (err) {
    res.status(500);
    res.send(
      Response(
        res.statusCode,
        'notification.internal_server_error',
        'An error occured, please retry later.',
      ),
    );
  }
};

module.exports = notificationController;
