const cli = require('../../../config/postgres');

const canFindUserById = (state) => ({
    findById : (id) => {
        return state.query('SELECT * FROM public.users WHERE id = $1;', [id]);
    }
});

const canFindAllUsers = (state) => ({
    findAll : () => {
        return state.query('SELECT * FROM public.users;');
    }
});

const canFindUserByUsername = (state) => ({
    findByPhone : (username) => {
        return state.query('SELECT * FROM public.users WHERE username = $1;', [username]);
    }
});

const canFindUserByPhone = (state) => ({
    findByPhone : (phoneNumber) => {
        return state.query('SELECT * FROM public.users WHERE phone_number = $1;', [phoneNumber]);
    }
});

const canFindUserByEmail = (state) => ({
    findByEmail : (email) => {
        return state.query('SELECT * FROM public.users WHERE email = $1;', [email]);
    }
});

const canInsertUser = (state) => ({
    insert : ({ username, phone_number, email }) => {
        return state.query('INSERT INTO public.users (username, phone_number, email) VALUES($1, $2, $3) RETURNING *;', [username, phone_number, email]);
    }
});

const canUpdateUser = (state) => ({
    update : ({ username, phone_number, email }, id) => {
        return state.query('UPDATE public.users SET username = $2, phone_number = $3, email = $4 WHERE id = $1 RETURNING *;', [id, username, phone_number, email]);
    }
});

const canDeleteUser = (state) => ({
    delete : (id) => {
        return state.query('DELETE FROM public.users WHERE id = $1;', [id]);
    }
});

const canPurgeUsers = (state) => ({
    purge : () => {
        return state.query('DELETE FROM public.users;');
    }
});

const UserRepo = (client) => {

    let userTable = client;

    return Object.assign(
        {},
        canFindUserById(userTable),
        canFindAllUsers(userTable),
        canFindUserByUsername(userTable),
        canFindUserByPhone(userTable),
        canFindUserByEmail(userTable),
        canInsertUser(userTable),
        canUpdateUser(userTable),
        canDeleteUser(userTable),
        canPurgeUsers(userTable)
        )
}


const repo = UserRepo(cli);


module.exports = repo;