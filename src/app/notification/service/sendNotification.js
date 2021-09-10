const NotificationServiceClass = require('./notification');
const userRepo = require('../repo/notification');

const notificationTable = new NotificationServiceClass(userRepo);

const NotificationSender = async (title, message, type, userId) => {
  this.query = null;

  try {
    this.query = await notificationTable.insert({
      title,
      message,
      type,
      userId,
    });

    return this.query;
  } catch (err) {
    return err;
  }
};

module.exports = NotificationSender;
