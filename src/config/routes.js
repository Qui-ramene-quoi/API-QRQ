const express = require('express');

const router = express.Router();

/* Imports Routes */

const user = require('../app/user/routes/users');

/* Use routes */

router.use('/users', user);

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

module.exports = router;
