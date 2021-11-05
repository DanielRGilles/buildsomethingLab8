const { Router } = require('express');
const QuoteService = require('../services/QuoteService');
const Quote = require('../models/Quote');

module.exports = Router()
  // if (req.method === 'POST' && req.url === '/api/v1/orders/')
  .post('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const kwote = await QuoteService.addQuote(id);
      res.send(kwote);
    } catch(err) {
      next(err);
    }
  })
  .get('/:id', async(req, res, next) => {
    try {
      const { id } = req.params;
      const kwote = await Quote.getById(id);
      res.send(kwote);
    } catch(err) {
      next(err);
    }
  })

  .get('/', async(req, res, next) => {
    try {
      const order = await Quote.getAll();
      res.send(order);
    } catch(err) {
      next(err);
    }
  })
  .patch('/:id', async(req, res, next) => {
    try {
      // req.body === { quantity: 10 }
      const { id } = req.params;
      const kwote = await QuoteService.updateOrder(id, req.body.favorite);
      // order === { id: '1', quantity: 10 }

      res.send(kwote);
    } catch(err) {
      next(err);
    }
  })
  .delete('/:id', async(req, res, next) => {
    try {
      
      const { id } = req.params;
      await QuoteService.deleteQuote(id);
      
      res.status(204);
      res.send('success');
    } catch(err) {
      next(err);
    }
  });
