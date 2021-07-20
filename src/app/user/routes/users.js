const express = require('express');

/** Controllers */

/** Resources Provider */

/** Validators */

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Users routes');
});

module.exports = router;
