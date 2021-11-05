const pool = require('../utils/pool');

// static method: JSON.parse(), JSON.stringify(), Math.random()
// instance method: .toUpperCase(), .map/.reduce/.filter/.find/.some/.every
module.exports = class Quote {
  id;
  quote;
  characterName;
  favorite;

  constructor(row) {
    this.id = row.id;
    this.quote = row.quote;
    this.characterName = row.character_name;
    this.favorite = row.favorite;
  }

  static async insert(quote) {
    const { rows } = await pool.query(
      'INSERT INTO favorite_quotes (quote, character_name, favorite) VALUES ($1, $2, $3) RETURNING *',
      [quote.content, quote.character.firstname, true]
    );

    return new Quote(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT FROM favorite_quotes WHERE id = $1',
      [id]
    );

    return new Quote(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * FROM favorite_quotes'
    );

    return rows.map(row => new Quote(row));
  }
  static async update(id, favorite) {
    const { rows } = await pool.query(
      'UPDATE favorite_quotes SET favorite = $1 WHERE id = $2 RETURNING *',
      [favorite, id]
    );

    return new Quote(rows[0]);
  }
  static async delete(id) {
    await pool.query(
      'DELETE FROM favorite_quotes WHERE id = $1',
      [id]
    );
    
  }
};
