/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const findAvatarByUserId = (state) => ({
  findByUserId: (userId) => state.query('SELECT * FROM public.user_avatars WHERE user_id = $1;', [userId]),
});

const insertAvatarUser = (state) => ({
  insert: (userId, img) => state.query('INSERT INTO public.user_avatars (user_id, file) VALUES($1, $2) RETURNING *;', [userId, img]),
});

const updateAvatarUser = (state) => ({
  update: (userId, file) => state.query('UPDATE public.user_avatars SET file = $2 WHERE user_id = $1 RETURNING *;', [userId, file]),
});

const UserRepo = (client) => {
  const userTable = client;

  return {
    ...findAvatarByUserId(userTable),
    ...insertAvatarUser(userTable),
    ...updateAvatarUser(userTable),
  };
};

const repo = UserRepo(cli);

module.exports = repo;
