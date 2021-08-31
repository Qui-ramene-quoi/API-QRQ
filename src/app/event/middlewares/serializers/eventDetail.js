/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
// TODO: fix confirm detail
const EventDetailSerializer = (event) => ({
  id: event.event_id,
  avatar: event.filepath,
  title: event.title,
  description: event.description,
  date: event.date,
  author: event.username,
  private: event.private,
  guests: event.total_guests,
  place: {
    label: event.label,
    streetname: event.street,
    postalCode: event.postal_code,
    city: event.city,
    country: event.country,
  },
});

module.exports = EventDetailSerializer;
