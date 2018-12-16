const chai = require('chai');
var should = require('chai').should()
const expect = chai.expect;
const url = `http://localhost:2468/`;
const request = require('supertest')(url);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  describe('GraphQL Query Testing with MySQL:', () => {
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
  
    it(`Query By ID returns a Dog that doesn't have any human properties `, (done) => {
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
        if (err) return done(err);
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
        if (err) return done(err);
        let Dog = res.body.data.Dog;
        let Humans = Dog.linkedHuman;
  
        Humans[0].should.have.property("name");
        Humans[0].name.should.equal("Tim");
        done();
      })
    })
  
    it('Is able to query for foreign key reference one nested level deep', (done) => {
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
        if (err) return done(err);
        let Dog = res.body.data.Dog;
        let Humans = Dog.linkedHuman;
        let nestedDog = Humans[0].linkedDog;
  
        nestedDog[0].name.should.equal(Dog.name);
        done();
      })
    })
  
    it('Is able to query back-and-forth (tea-partying) across foreign keys multiple nested levels deep', (done) => {
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
              linkedHuman {
                ageHumanYears
                name
                linkedDog {
                  name
                }
              }
            }
          }
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let Dog = res.body.data.Dog;
        let Humans = Dog.linkedHuman;
        let nestedDog = Humans[0].linkedDog;
        let nestedHuman = nestedDog[0].linkedHuman;
        let finalNestedDog = nestedHuman[0].linkedDog;
        finalNestedDog[0].name.should.equal(Dog.name);
        done();
      })
    })
  });
  
  describe('GraphQL Mutation Testing with MySQL:', () => {
  
    it('Mutation addDog returns the new Dog', (done) => {
      request.post('graphql')
      .send({ query: `mutation {
        addDog(id: 25, name:"Checkers", species:"Alaskan Malamute", favoriteFood:"bone broth", hasFleas: true, collarID: 24, Owner:"4"){
          name
          species
          favoriteFood
          Owner
          collarID
          hasFleas
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let Dog = res.body.data.addDog;
        Dog.should.have.property('name')
        Dog.should.have.property('species')
        Dog.should.have.property('collarID')
        Dog.should.have.property('hasFleas')
        Dog.should.have.property('favoriteFood')
        done();
      })
    })
  
    it('After addDog Mutation, a new Dog is added to everyDogs Array', (done) => {
      request.post('graphql')
      .send({ query: "query { everyDog { name Owner species collarID id hasFleas favoriteFood }}"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.everyDog.should.have.lengthOf(15);
        done();
      })
    })
  
    it('The new dog has correctly inputted params', (done) => {
      request.post('graphql')
      .send({ query: `query {
        Dog(id: 25) {
          name
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.Dog.name.should.equal('Checkers');
        done();
      })
    })
  
    it('Mutation updateDog returns the updated Dog', (done) => {
      request.post('graphql')
      .send({ query: `mutation {
        updateDog(id: 25, name: "Chess") {
          name
        }
      }
      `})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let Dog = res.body.data.updateDog;
        Dog.should.have.property('name');
        Dog.name.should.equal('Chess');
        setTimeout(() => {
          done();
        }, 1500)
      })
    })
  
    it('Updated Dog is saved in Database with updated values', (done) => {
      request.post('graphql')
      .send({ query: `query {
        Dog(id: 25) {
          name
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let Dog = res.body.data.Dog;
        Dog.should.have.property('name');
        Dog.name.should.equal('Chess');
        done();
    })
  })
  
  
    it('Mutation deleteDog returns the new Dog, with originally added data', (done) => {
      request.post('graphql')
      .send({ query: `mutation {
        deleteDog(id: 25) {
          name
        }
      }
      `})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let Dog = res.body.data.deleteDog;
        Dog.should.have.property('name');
        Dog.name.should.equal('Chess');
        setTimeout(() => {
          done();
        }, 1500)
      })
    })
  
    it('After deleteDog Mutation, a new Dog is removed from everyDogs Array', (done) => {
      request.post('graphql')
      .send({ query: "query { everyDog { name Owner species collarID id hasFleas favoriteFood }}"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.everyDog.should.have.lengthOf(14);
        done();
      })
    })
  
  
    it('After deleteDog Mutation, querying for the deleted dog returns null ', (done) => {
      request.post('graphql')
      .send({ query: `query {
        Dog(id: 25) {
          name
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let returnedDog = String(res.body.data.Dog);
        expect(returnedDog.should.equal('null'));
        done();
      })
    })
  
    
  
  });


