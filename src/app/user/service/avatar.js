class AvatarService {
  constructor(repo) {
    this.repo = repo;
  }

  async findByUserId(userId) {
    let query = null;
    try {
      query = await this.repo.findByUserId(userId);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async insert(userId, file) {
    let query = null;
    try {
      query = await this.repo.insert(userId, file);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async update(userId, avatar) {
    let query = null;
    try {
      query = await this.repo.update(userId, avatar);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = AvatarService;
