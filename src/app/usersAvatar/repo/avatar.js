/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindAvatarById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.users_avatar WHERE user_id = $1;', [id]),
});

const canFindAllAvatars = (state) => ({
  findAll: () => state.query('SELECT * FROM public.users_avatar;'),
});

const canInsertAvatar = (state) => ({
  insert: ({ filepath }) => state.query('INSERT INTO public.users_avatar (filename) VALUES($1) RETURNING *;', [filepath]),
});

const canUpdateAvatar = (state) => ({
  update: ({ filepath }, id) => state.query('UPDATE public.users_avatar SET filename = $1 WHERE id = $2 RETURNING *;', [filepath, id]),
});

const canDeleteAvatar = (state) => ({
  delete: (id) => state.query('DELETE FROM public.users_avatar WHERE id = $1;', [id]),
});

const canPurgeAvatars = (state) => ({
  purge: () => state.query('DELETE FROM public.users_avatar;'),
});

const UserAvatarRepo = (client) => {
  const avatarTable = client;

  return {
    ...canFindAvatarById(avatarTable),
    ...canFindAllAvatars(avatarTable),
    ...canInsertAvatar(avatarTable),
    ...canUpdateAvatar(avatarTable),
    ...canDeleteAvatar(avatarTable),
    ...canPurgeAvatars(avatarTable),
  };
};

const repo = UserAvatarRepo(cli);

module.exports = repo;
