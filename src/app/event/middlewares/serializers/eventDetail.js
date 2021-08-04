/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const EventDetailSerializer = (event) => ({
  id: event.id,
  avatar: event.filepath,
  title: event.title,
  description: event.description,
  date: event.date,
  author: event.username,
  confirmed: event.confirmed,
  type: event.type,
  place: {
    label: event.label,
    streetname: event.street,
    postalCode: event.postal_code,
    city: event.city,
    country: event.country,
  },
});

module.exports = EventDetailSerializer;
