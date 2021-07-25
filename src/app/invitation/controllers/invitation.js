const InvitationServiceClass = require('../service/invitation');
const InvitationRepo = require('../repo/invitation');

const InvitationTable = new InvitationServiceClass(InvitationRepo);

const InvitationController = function () {};

InvitationController.prototype.getInvitations = async (req, res) => {
  this.query = null;
  try {
    this.query = await InvitationTable.findAll();
    res.status(200).json({
      code: 200,
      invitations: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

InvitationController.prototype.getInvitation = async (req, res) => {
  this.query = null;
  try {
    this.query = await InvitationTable.findById(req.params.id);
    res.status(200).json({
      code: 200,
      invitations: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

InvitationController.prototype.insertInvitation = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await InvitationTable.insert(input);
    res.status(201).json({
      code: 201,
      invitation: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

InvitationController.prototype.updateInvitation = async (req, res) => {
  this.query = null;
  const input = req.body;
  try {
    this.query = await InvitationTable.update(input, req.params.id);
    res.status(200).json({
      code: 200,
      invitation: this.query,
    });
  } catch (e) {
    res.send(e.message);
  }
};

InvitationController.prototype.confirmInvitation = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await InvitationTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

InvitationController.prototype.deleteInvitation = async (req, res) => {
  this.query = null;
  const { id } = req.params;
  try {
    this.query = await InvitationTable.delete(id);
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

InvitationController.prototype.purgeInvitations = async (req, res) => {
  this.query = null;
  try {
    this.query = await InvitationTable.purge();
    res.status(200).json({
      code: 200,
    });
  } catch (e) {
    res.send(e.message);
  }
};

module.exports = InvitationController;
