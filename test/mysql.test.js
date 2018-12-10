const chai = require('chai');
var should = require('chai').should()
const expect = chai.expect;
const url = `http://localhost:2468/`;
const request = require('supertest')(url);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


describe('GraphQL', () => {
  // Tests
  console.log("Request: ", request)
  it('Returns Dog name with id = 2', (done) => {
    request.post('graphql')
    .send({ query: "query { Dog(id: 2) { name Owner species collarID id hasFleas favoriteFood } }"})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      res.body.data.Dog.should.have.property('Owner')
      res.body.data.Dog.should.have.property('species')
      res.body.data.Dog.should.have.property('collarID')
      res.body.data.Dog.should.have.property('hasFleas')
      res.body.data.Dog.should.have.property('favoriteFood')
      res.body.data.Dog.should.have.property('species')
      done();
    })
  })

  it('Returns all Dogs', (done) => {
    request.post('graphql')
    .send({ query: "query { everyDog { name Owner species collarID id hasFleas favoriteFood }}"})
    .expect(200)
    .end((err, res) => {
      // res will contain array of all users
      if (err) return done(err);
      console.log("Result")
      // assume there are 12 users in the db
      res.body.data.everyDog.should.have.lengthOf(14);
      done();
    })
  })
});