/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindPlaceById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.places WHERE place_id = $1;', [id]),
});

const canFindAllPlaces = (state) => ({
  findAll: () => state.query('SELECT * FROM public.places;'),
});

const canInsertPlace = (state) => ({
  insert: ({ placeId, label, latitude, longitude, street, postalCode, city, country }) => state.query('INSERT INTO public.places (place_id, label, latitude, longitude, street, postal_code, city, country) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;', [placeId, label, latitude, longitude, street, postalCode, city, country]),
});

const canUpdatePlace = (state) => ({
  update: ({ placeId, label, latitude, longitude, street, postalCode, city, country }, id) => state.query('UPDATE public.places SET place_id = $1, label = $2, latitude = $3, longitude = $4, street = $5, postal_code = $6, city = $7, country = $8 updated_at = CURRENT_TIMESTAMP WHERE place_id = $9 RETURNING *;', [placeId, label, latitude, longitude, street, postalCode, city, country, id]),
});

const canDeletePlace = (state) => ({
  delete: (id) => state.query('DELETE FROM public.places WHERE place_id = $1;', [id]),
});

const canPurgePlaces = (state) => ({
  purge: () => state.query('DELETE FROM public.places;'),
});

const PlaceRepo = (client) => {
  const placeTable = client;

  return {
    ...canFindPlaceById(placeTable),
    ...canFindAllPlaces(placeTable),
    ...canInsertPlace(placeTable),
    ...canUpdatePlace(placeTable),
    ...canDeletePlace(placeTable),
    ...canPurgePlaces(placeTable),
  };
};

const repo = PlaceRepo(cli);

module.exports = repo;
