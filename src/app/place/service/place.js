class PlaceService {
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

  async insert(place) {
    let query = null;
    try {
      query = await this.repo.insert(place);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async update(place, id) {
    let query = null;
    try {
      query = await this.repo.update(place, id);
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

module.exports = PlaceService;
