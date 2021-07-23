/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindEventAvatarById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.events_avatar WHERE user_id = $1;', [id]),
});

const canFindAllEventAvatars = (state) => ({
  findAll: () => state.query('SELECT * FROM public.events_avatar;'),
});

const canInsertEventAvatar = (state) => ({
  insert: ({ filepath }) => state.query('INSERT INTO public.events_avatar (filename) VALUES($1) RETURNING *;', [filepath]),
});

const canUpdateEventAvatar = (state) => ({
  update: ({ filepath }, id) => state.query('UPDATE public.events_avatar SET filename = $1 WHERE id = $2 RETURNING *;', [filepath, id]),
});

const canDeleteEventAvatar = (state) => ({
  delete: (id) => state.query('DELETE FROM public.events_avatar WHERE id = $1;', [id]),
});

const canPurgeEventAvatars = (state) => ({
  purge: () => state.query('DELETE FROM public.users_avatar;'),
});

const EventAvatarRepo = (client) => {
  const avatarTable = client;

  return {
    ...canFindEventAvatarById(avatarTable),
    ...canFindAllEventAvatars(avatarTable),
    ...canInsertEventAvatar(avatarTable),
    ...canUpdateEventAvatar(avatarTable),
    ...canDeleteEventAvatar(avatarTable),
    ...canPurgeEventAvatars(avatarTable),
  };
};

const repo = EventAvatarRepo(cli);

module.exports = repo;
