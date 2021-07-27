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

const findUserByPhoneNumberAndTokenConfirm = (state) => ({
  findByPhoneNumberAndTokenConfirm: (phoneNumber, tokenConfirm) => state.query('SELECT * FROM public.users WHERE phone_number = $1 AND token_confirm = $2;', [phoneNumber, tokenConfirm]),
});

const insertUser = (state) => ({
  insert: ({ phoneNumber }) => state.query('INSERT INTO public.users (phone_number) VALUES($1) RETURNING *;', [phoneNumber]),
});

const canUpdateUser = (state) => ({
  update: ({ username, phoneNumber, email }, id) => state.query('UPDATE public.users SET username = $2, phone_number = $3, email = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;', [id, username, phoneNumber, email]),
});

const confirmUser = (state) => ({
  confirmUser: (id) => state.query('UPDATE public.users SET token_confirm = null, confirmed = true, confirmed_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *;', [id]),
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
    ...findUserByPhoneNumberAndTokenConfirm(userTable),
    ...insertUser(userTable),
    ...canUpdateUser(userTable),
    ...confirmUser(userTable),
    ...canDeleteUser(userTable),
    ...canPurgeUsers(userTable),
  };
};

const repo = UserRepo(cli);

module.exports = repo;
