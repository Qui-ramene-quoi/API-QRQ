/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindEventsBeverageById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.events_beverages WHERE id = $1;', [id]),
});

const canFindAllEventsBeverages = (state) => ({
  findAll: () => state.query('SELECT * FROM public.events_beverages;'),
});

const canInsertEventsBeverage = (state) => ({
  insert: ({ quantity, eventId, beverageId, userId }) => state.query('INSERT INTO public.events_beverages (quantity, event_id, beverage_id, user_id) VALUES($1, $2, $3, $4) RETURNING *;', [quantity, eventId, beverageId, userId]),
});

const canUpdateEventsBeverage = (state) => ({
  update: ({ quantity }, id) => state.query('UPDATE public.events_beverages SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *;', [quantity, id]),
});

const canDeleteEventsBeverage = (state) => ({
  delete: (id) => state.query('DELETE FROM public.events_beverages WHERE id = $1;', [id]),
});

const canPurgeEventsBeverages = (state) => ({
  purge: () => state.query('DELETE FROM public.events_beverages;'),
});

const EventsBeverageRepo = (client) => {
  const eventsBeverageTable = client;

  return {
    ...canFindEventsBeverageById(eventsBeverageTable),
    ...canFindAllEventsBeverages(eventsBeverageTable),
    ...canInsertEventsBeverage(eventsBeverageTable),
    ...canUpdateEventsBeverage(eventsBeverageTable),
    ...canDeleteEventsBeverage(eventsBeverageTable),
    ...canPurgeEventsBeverages(eventsBeverageTable),
  };
};

const repo = EventsBeverageRepo(cli);

module.exports = repo;
