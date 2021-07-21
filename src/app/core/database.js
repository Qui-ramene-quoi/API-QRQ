class Database {
  constructor(connection) {
    if (Database.instance) {
      Database.instance = this;
    }

    this.connection = connection;
    return this;
  }

  async connect() {
    let conn = null;
    try {
      conn = await this.connection.connect();
      return conn;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async query(queryString, values = []) {
    let query = null;
    try {
      query = await this.connection.query(queryString, values);
      return query;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

module.exports = Database;
