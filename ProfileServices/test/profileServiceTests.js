
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();
var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var MONGO_STRING = "mongodb+srv://achanta:userservice@userservice-recot.mongodb.net/test?retryWrites=true";

chai.use(chaiHttp);



// Parent block
describe('Profile Service', () => {
/*
  * Test the /GET personal_details route
  */
  describe('/GET personal_details', () => {
      it('it should GET personal details of a user', (done) => {
        chai.request(server)
            .get('/getPersonalDetails')
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
  describe('/GET get_history_and_mood', () => {
      it('it should GET personal details of a user', (done) => {
        chai.request(server)
            .get('/getHistoryAndMood')
            .set('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1YzdhYmQzMzJkYzUyYjE2ZDM3NzdjOGQifQ.ovKVDjt839GCVo2x8qTsvUFSjNdha8-0d6m99iw8T0w')
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res.body).to.be.an('object')
              done();
            });
      });
  });

});
