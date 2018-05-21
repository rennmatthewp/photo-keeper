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

module.exports = { router, database };
