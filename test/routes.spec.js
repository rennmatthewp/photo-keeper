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
          response.body[0].should.have.property('id', 1);
          response.body[0].should.have.property('title', 'pups');
          response.body[0].should.have.property(
            'url',
            'http://www.dogster.com/wp-content/uploads/2015/05/chocolate-lab-puppies-11.jpg',
          );
          done();
        });
    });
  });

  describe('POST /api/v1/photos', () => {
    it('should add a new photo to the database and return the new id', done => {
      chai
        .request(server)
        .post('/api/v1/photos')
        .send({
          title: 'qtpup',
          url:
            'http://www.labradorretrieverguide.com/wp-content/uploads/2013/04/Chocolate-Labrador-Puppies-Having-Fun.jpg',
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.have.property('id', 4);
          done();
        });
    });

    it('should return an error with status 422 if a required parameter is missing.', done => {
      chai
        .request(server)
        .post('/api/v1/photos')
        .send({
          title: 'nopeNopeNope',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.should.be.json;
          response.body.should.have.property(
            'error',
            'Expected format: { title: <String>, url: <String> }. Missing required property: url',
          );
          done();
        });
    });
  });

  describe('DELETE /api/v1/photos/:id', () => {
    it('should remove the specified photo from the database and return the number of rows deleted', done => {
      chai
        .request(server)
        .delete('/api/v1/photos/1')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.equal(1);
          done();
        });
    });

    it('should respond with status 404 if no photo is found', done => {
      chai
        .request(server)
        .delete('/api/v1/photos/50')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.body.should.have.property(
            'error',
            '0 rows deleted. Could not find photo with id: 50.',
          );
          done();
        });
    });
  });
});
