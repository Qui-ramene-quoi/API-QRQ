/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindEventById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.events WHERE id = $1;', [id]),
});

const canFindAllEvents = (state) => ({
  findAll: (userId) => state.query('SELECT DISTINCT e.id, e.title, e.description, e.date, e.submitted, e.created_at, e.updated_at, p.label FROM public.events e INNER JOIN public.invitations i ON i.user_id = $1 INNER JOIN public.places p ON e.place_id = p.id;', [userId]),
  findAllGuests: (eventId) => state.query('SELECT * FROM public.invitations INNER JOIN public.users ON invitations.user_id = users.id WHERE invitations.event_id = $1;', [eventId]),
});

const canInsertEvent = (state) => ({
  insert: ({ title, description, date, privacy, userId, placeId }) => state.query('INSERT INTO public.events (title, description, date, private, user_id, place_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *;', [title, description, date, privacy, userId, placeId]),
});

const canUpdateEvent = (state) => ({
  update: ({ title, description, date, privacy, placeId }, id) => state.query('UPDATE public.events SET title = $1, description = $2, date = $3, private = $4, placeId = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *;', [title, description, date, privacy, placeId, id]),
});

const canPublishEvent = (state) => ({
  publish: (id) => state.query('UPDATE public.events SET submitted = true, submitted_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;', [id]),
});

const canDeleteEvent = (state) => ({
  delete: (id) => state.query('DELETE FROM public.events WHERE id = $1;', [id]),
});

const canPurgeEvents = (state) => ({
  purge: (userId) => state.query('DELETE FROM public.events WHERE user_id = $1;', [userId]),
});

const EventRepo = (client) => {
  const eventTable = client;

  return {
    ...canFindEventById(eventTable),
    ...canFindAllEvents(eventTable),
    ...canInsertEvent(eventTable),
    ...canUpdateEvent(eventTable),
    ...canPublishEvent(eventTable),
    ...canDeleteEvent(eventTable),
    ...canPurgeEvents(eventTable),
  };
};

const repo = EventRepo(cli);

module.exports = repo;
