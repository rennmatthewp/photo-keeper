/* eslint-disable no-unused-expressions */

const chai = require('chai');
const chaiHttp = require('chai-http');
const { database } = require('../routes/apiRoutes');
const server = require('../server');

/* eslint-disable-next-line */
const should = chai.should();
chai.use(chaiHttp);

describe('API routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe('GET /api/v1/photos', () => {
    it('should return an array of all saved photos', done => {
      chai
        .request(server)
        .get('/api/v1/photos')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.an('array');
          response.body.length.should.equal(3);
          done();
        });
    });
  });
});
