/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindInvitationById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.invitations WHERE id = $1;', [id]),
});

const canFindAllInvitations = (state) => ({
  findAll: () => state.query('SELECT * FROM public.invitations;'),
});

const canInsertInvitation = (state) => ({
  insert: ({ userId, eventId }) => state.query('INSERT INTO public.invitations (user_id, event_id) VALUES($1, $2) RETURNING *;', [userId, eventId]),
});

const canUpdateInvitation = (state) => ({
  update: ({ userId, eventId }, id) => state.query('UPDATE public.invitations SET user_id = $1, event_id = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *;', [userId, eventId, id]),
});

const canConfirmInvitation = (state) => ({
  confirm: (id) => state.query('UPDATE public.invitations SET confirmed = true, confirmed_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;', [id]),
});

const canDeleteInvitation = (state) => ({
  delete: (id) => state.query('DELETE FROM public.invitations WHERE id = $1;', [id]),
});

const canPurgeInvitations = (state) => ({
  purge: () => state.query('DELETE FROM public.invitations;'),
});

const InvitationRepo = (client) => {
  const invitationTable = client;

  return {
    ...canFindInvitationById(invitationTable),
    ...canFindAllInvitations(invitationTable),
    ...canInsertInvitation(invitationTable),
    ...canUpdateInvitation(invitationTable),
    ...canConfirmInvitation(invitationTable),
    ...canDeleteInvitation(invitationTable),
    ...canPurgeInvitations(invitationTable),
  };
};

const repo = InvitationRepo(cli);

module.exports = repo;
