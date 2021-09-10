const OutputNotification = (notification) => ({
  id: notification.id,
  title: notification.title,
  message: notification.message,
  type: notification.type,
  read: notification.read,
  readAt: notification.read_at,
  createdAt: notification.created_at,
  updatedAt: notification.updated_at,
});

const NotificationItemSerializer = async (req, res) => {
  res.json({
    message: 'Notification Details',
    data: OutputNotification(res.locals.notification),
  });
};

const NotificationCollectionSerializer = async (req, res) => {
  const notificationsSerialized = [];

  for (let i = 0; i < res.locals.notifications.length; i += 1) {
    notificationsSerialized.push(
      OutputNotification(res.locals.notifications[i]),
    );
  }

  res.json({
    message: 'Notifications List',
    data: notificationsSerialized,
  });
};

module.exports = {
  NotificationItemSerializer,
  NotificationCollectionSerializer,
};
