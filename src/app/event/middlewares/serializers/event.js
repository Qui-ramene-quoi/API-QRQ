/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
const EventDetailSerializer = (event) => ({
  id: event.id,
  title: event.title,
  description: event.description,
  date: event.date,
  place: {
    label: event.label,
  },
});

module.exports = EventDetailSerializer;
