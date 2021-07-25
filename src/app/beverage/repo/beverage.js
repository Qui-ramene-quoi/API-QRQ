/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindBeverageById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.beverages WHERE id = $1;', [id]),
});

const canFindAllBeverages = (state) => ({
  findAll: () => state.query('SELECT * FROM public.beverages;'),
});

const canInsertBeverage = (state) => ({
  insert: ({ name, type, description }) => state.query('INSERT INTO public.beverages (name, type, description) VALUES($1, $2, $3) RETURNING *;', [name, type, description]),
});

const canUpdateBeverage = (state) => ({
  update: ({ name, type, description }, id) => state.query('UPDATE public.beverages SET name = $1, type = $2, description = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *;', [name, type, description, id]),
});

const canDeleteBeverage = (state) => ({
  delete: (id) => state.query('DELETE FROM public.beverages WHERE id = $1;', [id]),
});

const canPurgeBeverages = (state) => ({
  purge: () => state.query('DELETE FROM public.beverages;'),
});

const BeverageRepo = (client) => {
  const beverageTable = client;

  return {
    ...canFindBeverageById(beverageTable),
    ...canFindAllBeverages(beverageTable),
    ...canInsertBeverage(beverageTable),
    ...canUpdateBeverage(beverageTable),
    ...canDeleteBeverage(beverageTable),
    ...canPurgeBeverages(beverageTable),
  };
};

const repo = BeverageRepo(cli);

module.exports = repo;
