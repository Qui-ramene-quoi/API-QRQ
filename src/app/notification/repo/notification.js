/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const findNotificationById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.notifications WHERE id = $1;', [id]),
});

const findAllNotificationsByUserId = (state) => ({
  findByUserId: (userId) => state.query('SELECT * FROM public.notifications WHERE user_id = $1;', [userId]),
});

const findAllNotificationsReadedByUserId = (state) => ({
  findAllReaded: (userId) => state.query('SELECT * FROM public.notifications WHERE user_id = $1 AND read = true;', [userId]),
});

const findAllNotificationsUnreadedByUserId = (state) => ({
  findAllUnreaded: (userId) => state.query('SELECT * FROM public.notifications WHERE user_id = $1 AND read = false;', [userId]),
});

const insertNotification = (state) => ({
  insert: ({
    title, message, type, userId,
  }) => state.query('INSERT INTO public.notifications (title, message, type, user_id, read) VALUES($1, $2, $3, $4, false) RETURNING *;', [title, message, type, userId]),
});

const readNotification = (state) => ({
  readNotification: (id) => state.query('UPDATE public.notifications SET read = true, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;', [id]),
});

const unreadNotification = (state) => ({
  unreadNotification: (id) => state.query('UPDATE public.notifications SET read = false, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;', [id]),
});

const UserRepo = (client) => {
  const userTable = client;

  return {
    ...findNotificationById(userTable),
    ...findAllNotificationsByUserId(userTable),
    ...findAllNotificationsReadedByUserId(userTable),
    ...findAllNotificationsUnreadedByUserId(userTable),
    ...insertNotification(userTable),
    ...readNotification(userTable),
    ...unreadNotification(userTable),
  };
};

const repo = UserRepo(cli);

module.exports = repo;
