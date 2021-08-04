/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindFriend = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.friends WHERE id = $1;', [id]),
  findByUserId: (userId) => state.query('SELECT * FROM public.friends WHERE requester_id = $1;', [userId]),
});

const canFindAllFriends = (state) => ({
  findAll: () => state.query('SELECT * FROM public.friends;'),
});

const canInsertFriend = (state) => ({
  insert: ({ requesterId, friendId }) => state.query('INSERT INTO public.friends (requester_id, friend_id) VALUES($1, $2) RETURNING *;', [requesterId, friendId]),
});

const canUpdateFriend = (state) => ({
  update: ({ requesterId, friendId }, id) => state.query('UPDATE public.friends SET requester_id = $1, friend_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *;', [requesterId, friendId, id]),
});

const canDeleteFriend = (state) => ({
  delete: (id) => state.query('DELETE FROM public.friends WHERE id = $1;', [id]),
});

const canPurgeFriends = (state) => ({
  purge: () => state.query('DELETE FROM public.friends;'),
});

const FriendRepo = (client) => {
  const friendTable = client;

  return {
    ...canFindFriend(friendTable),
    ...canFindAllFriends(friendTable),
    ...canInsertFriend(friendTable),
    ...canUpdateFriend(friendTable),
    ...canDeleteFriend(friendTable),
    ...canPurgeFriends(friendTable),
  };
};

const repo = FriendRepo(cli);

module.exports = repo;
