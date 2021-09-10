/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const findAvatarByUserId = (state) => ({
  findByUserId: (userId) => state.query('SELECT * FROM public.users_avatar WHERE user_id = $1;', [userId]),
});

const insertAvatarUser = (state) => ({
  insert: (userId, img) => state.query('INSERT INTO public.users_avatar (user_id, filename) VALUES($1, $2) RETURNING *;', [userId, img]),
});

const updateAvatarUser = (state) => ({
  update: (userId, file) => state.query('UPDATE public.users_avatar SET file = $2 WHERE user_id = $1 RETURNING *;', [userId, file]),
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
