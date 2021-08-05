const { getAsync, setAsync, delAsync } = require('../../core/redis-client');

const GetAuthentication = async (key) => await getAsync(key);

const SetAuthentication = async (key, value) => {
  await setAsync(key, value);
};

const DelAuthentication = async (key) => {
  await delAsync(key);
};

module.exports = { GetAuthentication, SetAuthentication, DelAuthentication };
