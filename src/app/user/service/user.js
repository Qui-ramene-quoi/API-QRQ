class UserService {
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

  async findByPhone(phonenumber) {
    let query = null;
    try {
      query = await this.repo.findByPhone(phonenumber);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByEmail(email) {
    let query = null;
    try {
      query = await this.repo.findByEmail(email);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async findByPhoneNumberAndTokenConfirm(phoneNumber, tokenConfirm) {
    let query = null;
    try {
      query = await this.repo.findByPhoneNumberAndTokenConfirm(
        phoneNumber,
        tokenConfirm,
      );
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async insert(user) {
    let query = null;
    try {
      query = await this.repo.insert(user);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async update(user, id) {
    let query = null;
    try {
      query = await this.repo.update(user, id);
      return query.rows;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async confirmUser(id) {
    let query = null;
    try {
      query = await this.repo.confirmUser(id);
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

module.exports = UserService;
