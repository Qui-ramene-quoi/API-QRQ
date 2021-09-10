class NotificationService {
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

  async findByUserId(userId) {
    let query = null;
    try {
      query = await this.repo.findByUserId(userId);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findAllReaded(userId) {
    let query = null;
    try {
      query = await this.repo.findAllReaded(userId);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findAllUnreaded(userId) {
    let query = null;
    try {
      query = await this.repo.findAllUnreaded(userId);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async insert(notification) {
    let query = null;
    try {
      query = await this.repo.insert(notification);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async readNotification(id) {
    let query = null;
    try {
      query = await this.repo.readNotification(id);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async unreadNotification(id) {
    let query = null;
    try {
      query = await this.repo.unreadNotification(id);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = NotificationService;
