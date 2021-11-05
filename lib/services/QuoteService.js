const Quote = require('../models/Quote');
const { getQuote } = require('../utils/getQuote');

module.exports = class QuoteService {
  static async addQuote(id) {
    const quote = await getQuote(id);
    await Quote.insert(quote);
    
    return quote;
  }
  
  static async updateQuote(id, favorite) {
    
    const kwote = await Quote.update(id, favorite);
    return kwote;
  }
  static async deleteQuote(id) {
    const deletedQuote = await Quote.getById(id);
    await Quote.delete(id);
    return `${deletedQuote.characterName}'s quote was deleted`;
  }
};
