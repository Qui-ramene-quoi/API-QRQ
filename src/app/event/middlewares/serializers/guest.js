/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const Guestserializer = (event) => ({
  id: event.id,
  username: event.username,
  avatar: null,
  confirmed: event.confirmed,
  confirmed_at: event.confirmed_at,
});

module.exports = Guestserializer;
