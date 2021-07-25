const express = require('express');

/** Controllers */
const Controller = require('../controllers/beverage');

const BeverageController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router({ mergeParams: true });

router.get('/', BeverageController.getBeverages);

router.post('/', BeverageController.insertBeverage);

router.get('/:id', BeverageController.getBeverage);

router.put('/:id', BeverageController.updateBeverage);

router.delete('/:id', BeverageController.deleteBeverage);

router.delete('/', BeverageController.purgeBeverages);

module.exports = router;
