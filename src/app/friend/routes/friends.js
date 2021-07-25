const express = require('express');

/** Controllers */
const Controller = require('../controllers/friend');

const FriendController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router({ mergeParams: true });

router.get('/', FriendController.getFriends);

router.post('/', FriendController.insertFriend);

router.get('/:id', FriendController.getFriend);

router.put('/:id', FriendController.updateFriend);

router.delete('/:id', FriendController.deleteFriend);

router.delete('/', FriendController.purgeFriends);

module.exports = router;
