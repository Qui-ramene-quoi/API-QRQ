class InvitationService {
  constructor(repo) {
    this.repo = repo;
  }

  async findById(id) {
    let query = null;
    try {
      query = await this.repo.findById(id);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findAll() {
    let query = null;
    try {
      query = await this.repo.findAll();
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async insert(invitation) {
    let query = null;
    try {
      query = await this.repo.insert(invitation);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async update(invitation, id) {
    let query = null;
    try {
      query = await this.repo.update(invitation, id);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async confirm(id) {
    let query = null;
    try {
      query = await this.repo.confirm(id);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async delete(id) {
    let query = null;
    try {
      query = await this.repo.delete(id);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async purge() {
    let query = null;
    try {
      query = await this.repo.purge();
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = InvitationService;
