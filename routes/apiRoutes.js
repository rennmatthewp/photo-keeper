/* eslint-disable no-restricted-syntax */

const express = require('express');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const router = express.Router();

router.get('/photos', (request, response) => {
  database('photos')
    .then(photos => response.status(200).json(photos))
    .catch(error => response.status(500).json(error));
});

router.post('/photos', (request, response) => {
  const photo = request.body;

  for (const requiredParameter of ['title', 'url']) {
    if (!photo[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: { title: <String>, url: <String> }. Missing required property: ${requiredParameter}`,
      });
    }
  }

  return database('photos')
    .insert(photo, 'id')
    .then(result => response.status(201).json({ id: result[0] }))
    .catch(error => response.status(500).json(error));
});

router.delete('/photos/:id', (request, response) => {
  const { id } = request.params;

  database('photos')
    .where('id', id)
    .delete()
    .then(deleteCount => {
      if (!deleteCount) {
        return response
          .status(404)
          .json({
            error: `${deleteCount} rows deleted. Could not find photo with id: ${id}.`,
          });
      }
      return response.status(200).json(deleteCount);
    })
    .catch(error => response.status(500).json(error));
});

module.exports = { router, database };
