/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const Eventserializer = (event) => ({
  id: event.id,
  title: event.title,
  description: event.description,
  date: event.date,
  author: event.username,
  place: {
    label: event.label,
    streetname: event.street,
    postalCode: event.postal_code,
    city: event.city,
    country: event.country,
  },
});

module.exports = Eventserializer;
