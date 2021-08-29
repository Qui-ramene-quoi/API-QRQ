const redis = require('redis');
const { promisify } = require('util');
const logger = require('../../config/logger');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_HOST,
});

client.on('connect', () => {
  logger.info('Redis is connected to the server');
});

client.on('ready', () => {
  logger.info('Redis connection is established');
});

client.on('error', (error) => {
  logger.error(error);
});

const getAsync = promisify(client.get).bind(client);

const setAsync = promisify(client.set).bind(client);

const delAsync = promisify(client.del).bind(client);

module.exports = { getAsync, setAsync, delAsync };
