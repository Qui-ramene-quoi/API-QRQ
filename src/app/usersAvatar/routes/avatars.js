const express = require('express');

/** Controllers */
const Controller = require('../controllers/avatar');

const userAvatarController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router();

router.get('/', userAvatarController.getUserAvatars);

router.post('/', userAvatarController.insertUserAvatar);

router.get('/:id', userAvatarController.getUserAvatar);

router.put('/:id', userAvatarController.updateUserAvatar);

router.delete('/:id', userAvatarController.deleteUserAvatar);

router.delete('/', userAvatarController.purgeUserAvatars);

module.exports = router;
