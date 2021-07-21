/* eslint-disable prettier/prettier */
const cli = require('../../../config/postgres');

const canFindUserById = (state) => ({
  findById: (id) => state.query('SELECT * FROM public.users WHERE id = $1;', [id]),
});

const canFindAllUsers = (state) => ({
  findAll: () => state.query('SELECT * FROM public.users;'),
});

const canFindUserByUsername = (state) => ({
  findByPhone: (username) => state.query('SELECT * FROM public.users WHERE username = $1;', [username]),
});

const canFindUserByPhone = (state) => ({
  findByPhone: (phoneNumber) => state.query('SELECT * FROM public.users WHERE phone_number = $1;', [phoneNumber]),
});

const canFindUserByEmail = (state) => ({
  findByEmail: (email) => state.query('SELECT * FROM public.users WHERE email = $1;', [email]),
});

const canInsertUser = (state) => ({
  insert: ({ username, phoneNumber, email }) => state.query('INSERT INTO public.users (username, phone_number, email) VALUES($1, $2, $3) RETURNING *;', [username, phoneNumber, email]),
});

const canUpdateUser = (state) => ({
  update: ({ username, phoneNumber, email }, id) => state.query('UPDATE public.users SET username = $2, phone_number = $3, email = $4 WHERE id = $1 RETURNING *;', [id, username, phoneNumber, email]),
});

const canDeleteUser = (state) => ({
  delete: (id) => state.query('DELETE FROM public.users WHERE id = $1;', [id]),
});

const canPurgeUsers = (state) => ({
  purge: () => state.query('DELETE FROM public.users;'),
});

const UserRepo = (client) => {
  const userTable = client;

  return {
    ...canFindUserById(userTable),
    ...canFindAllUsers(userTable),
    ...canFindUserByUsername(userTable),
    ...canFindUserByPhone(userTable),
    ...canFindUserByEmail(userTable),
    ...canInsertUser(userTable),
    ...canUpdateUser(userTable),
    ...canDeleteUser(userTable),
    ...canPurgeUsers(userTable),
  };
};

const repo = UserRepo(cli);

module.exports = repo;
