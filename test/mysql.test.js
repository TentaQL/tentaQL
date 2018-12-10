const chai = require('chai');
var should = require('chai').should()
const expect = chai.expect;
const url = `http://localhost:2468/`;
const request = require('supertest')(url);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


describe('GraphQL Server Testing on MySQL:', () => {
  // Tests
  it('Query By ID returns a Dog with all dog properties, even if null', (done) => {
    request.post('graphql')
    .send({ query: "query { Dog(id: 3) { name Owner species collarID id hasFleas favoriteFood } }"})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      let Dog = res.body.data.Dog;
      Dog.should.have.property('Owner')
      Dog.should.have.property('species')
      Dog.should.have.property('collarID')
      Dog.should.have.property('hasFleas')
      Dog.should.have.property('favoriteFood')
      done();
    })
  })

  it('Query By ID returns a Dog does not have any human properties ', (done) => {
    request.post('graphql')
    .send({ query: "query { Dog(id: 3) { name Owner species collarID id hasFleas favoriteFood } }"})
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      let Dog = res.body.data.Dog;
      Dog.should.not.have.property('ageHumanYears')
      done();
    })
  })

  it('Query everyDogs returns all Dogs', (done) => {
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

  it('Returns Foreign Key Reference without throwing Error', (done) => {
    request.post('graphql')
    .send({ query: `query {
      Dog(id:2) {
        name
        linkedHuman {
          id
          name
          ageHumanYears
          linkedDog {
            id
            name
          }
        }
      }
    }`})
    .expect(200)
    .end((err, res) => {
      // res will contain array of all users
      if (err) return done(err);
      console.log("Result")
      let Dog = res.body.data.Dog;
      let Humans = Dog.linkedHuman;

      // assume there are 12 users in the db
      Humans[0].should.have.property("name");
      done();
    })
  })
  
  

});