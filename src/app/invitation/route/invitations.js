const express = require('express');

/** Controllers */
const Controller = require('../controllers/invitation');

const InvitationController = new Controller();

/** Resources Provider */

/** Validators */

const router = express.Router({ mergeParams: true });

router.get('/', InvitationController.getInvitations);

router.post('/', InvitationController.insertInvitation);

router.get('/:id', InvitationController.getInvitation);

router.put('/:id', InvitationController.updateInvitation);

router.put('/:id/confirm', InvitationController.confirmInvitation);

router.delete('/:id', InvitationController.deleteInvitation);

router.delete('/', InvitationController.purgeInvitations);

module.exports = router;
