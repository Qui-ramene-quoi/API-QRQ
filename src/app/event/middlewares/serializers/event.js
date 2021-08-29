/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const EventSerializer = (event) => ({
  id: event.event_id,
  title: event.title,
  description: event.description,
  date: event.date,
  private: event.private,
  created_at: event.created_at,
  updated_at: event.updated_at,
});

module.exports = EventSerializer;
