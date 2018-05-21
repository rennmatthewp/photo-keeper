const pupperPhotoData = require('../../../seedData/photos.json');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos')
    .del()
    .then(() => {
      return Promise.all([knex('photos').insert(pupperPhotoData)]);
    })
    .catch(error => console.log(`error seeding photos: ${error}`));
};
