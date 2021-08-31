/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const Guestserializer = (event) => ({
  invitationId: event.invitation_id,
  eventId: event.event_id,
  userId: event.user_id,
  type: event.type,
  username: event.username,
  avatar: null,
  confirmed_at: event.confirmed_at,
});

module.exports = Guestserializer;
