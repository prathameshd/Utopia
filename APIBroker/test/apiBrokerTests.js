
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var expect = require('chai').expect;

chai.use(chaiHttp);



// Parent block
describe('API BROKER', () => {
/*
  * Test the /GET getauth route
  */
  describe('/GET getAuth', () => {
      it('it should authorize user with Spotify, if valid', (done) => {
        chai.request(server)
            .get('/getAuth')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzdhYmQzMzJkYzUyYjE2ZDM3NzdjOGQifQ.ovKVDjt839GCVo2x8qTsvUFSjNdha8-0d6m99iw8T0w')
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.an('object')
              done();
            });
      });
  });

  /*
  * Test the /GET get_history_and_mood route
  */
  describe('/GET getNews', () => {
      it('it should GET news articles', (done) => {
        chai.request(server)
            .get('/getNews')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzdhYmQzMzJkYzUyYjE2ZDM3NzdjOGQifQ.ovKVDjt839GCVo2x8qTsvUFSjNdha8-0d6m99iw8T0w')
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.an('object')
              done();
            });
      });
  });

});
