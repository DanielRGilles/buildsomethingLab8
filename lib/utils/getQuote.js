const request = require('superagent');

const getQuote = async(id) => {
  const fetchData = await request.get(`https://officeapi.dev/api/quotes/${id}`);
  return fetchData.body.data;
};
module.exports = { getQuote };
