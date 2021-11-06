const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');

describe('lab08 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('saves a quote with the passed along id into db', async() => {
    const response = await request(app)
      .post('/api/v1/quotes/5e966a526a66e65486e244b5');
    expect(response.body._id).toEqual('5e966a526a66e65486e244b5');
    expect(response.body.character.firstname).toEqual('Gabe');
  });
  it('get quote from the db by id on req.params', async() => {
    await request(app)
      .post('/api/v1/quotes/5e966a526a66e65486e244b5');
    const response = await request(app)
      .get('/api/v1/quotes/1');
    expect(response.body.characterName).toEqual('Gabe');
    
  });
  it('get all quotes from the db', async() => {
    await request(app)
      .post('/api/v1/quotes/5e966a526a66e65486e244b5');
    await request(app)
      .post('/api/v1/quotes/5e9668f46a66e65486e244ae');
    await request(app)
      .post('/api/v1/quotes/5e96651df87ac15464c55f1c');
    const obj = {
      'id': '1',
      'quote': 'Shut up about the sun. SHUT UP ABOUT THE SUN!',
      'characterName': 'Gabe',
      'favorite': 'true'
    };

    const response = await request(app)
      .get('/api/v1/quotes/');
    expect(response.body).toEqual(expect.arrayContaining([obj]));
    
  });
  it('update favorite key to false in local db, default is true', async() => {
    await request(app)
      .post('/api/v1/quotes/5e966a526a66e65486e244b5');
    await request(app)
      .patch('/api/v1/quotes/1')
      .send({ 'favorite': false });
    const response = await request(app)
      .get('/api/v1/quotes/1'); 
    expect(response.body.favorite).toEqual('false');
    
  });
  it('deletes a quote by id', async() => {
    await request(app)
      .post('/api/v1/quotes/5e966a526a66e65486e244b5');
    await request(app)
      .delete('/api/v1/quotes/1');
    const response = await request(app)
      .get('/api/v1/quotes'); 
    expect(response.body).toEqual([]);
    
  });
});

