const chai = require('chai');
var should = require('chai').should()
const expect = chai.expect;
const url = `http://localhost:2469/`;
const request = require('supertest')(url);
let savedMutationId;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  describe('GraphQL Query Testing with Mongo:', () => {
    it('Query By ID returns an author with all author properties, even if null', (done) => {
      request.post('graphql')
      .send({ query: `query { authorsById(id: "5bf85a116f4ae18093b6d2db" ) { name age hasPublished linked_stories { id } location stories} }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let author = res.body.data.authorsById;
        author.should.have.property('name')
        author.should.have.property('age')
        author.should.have.property('hasPublished')
        author.should.have.property('linked_stories')
        author.should.have.property('location')
        author.should.have.property('stories')
        done();
      })
    })
  
    it(`Query By ID returns an author that doesn't have any story properties `, (done) => {
      request.post('graphql')
      .send({ query: `query { authorsById(id: "5bf85a116f4ae18093b6d2db" ) { name age hasPublished linked_stories { id } location stories} }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let author = res.body.data.authorsById;
        author.should.not.have.property('title')
        author.should.not.have.property('isOnAmazon');
        done();
      })
    })
  
    it('Query authors returns all authors', (done) => {
      request.post('graphql')
      .send({ query: "query { authors { name } }"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.authors.should.have.lengthOf(102);
        done();
      })
    })
  
    it('Returns Many -> One Foreign Key Single Nested Reference', (done) => {
      request.post('graphql')
      .send({ query: `query {
        storiesById(id:"5bf85a116f4ae18093b6d2dc") {
          id
          title
          linked_authors {
            age
            name
          }
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let story = res.body.data.storiesById;
        let writer = story.linked_authors[0];
        writer.should.have.property("name");
        writer.name.should.equal("Nikos Clemensen");
        done();
      })
    })

    it('Is able to query back-and-forth (tea-partying) across foreign keys multiple nested levels deep', (done) => {
      request.post('graphql')
      .send({ query: `query {
        storiesById(id:"5bf85a116f4ae18093b6d2dc") {
          id
          title
          linked_authors {
            age
            name
            linked_stories {
              title
        
              }
            }
          }
        }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let story = res.body.data.storiesById;
        let writer = story.linked_authors[0];
        writer.should.have.property("name");
        writer.name.should.equal("Nikos Clemensen");
        let otherStory = writer.linked_stories[2];
        otherStory.should.have.property("title");
        otherStory.title.should.equal("Overhold");
        done();
      })
    })
  });
  describe('GraphQL Mutation Testing with Mongo:', () => {
  
    it('Mutation add_author returns the new author', (done) => {
      request.post('graphql')
      .send({ query: `mutation {
        add_authors(hasPublished:false, age:98, location:"1 Main Street", name: "Billy Madison") {
          name
          age
          id
          hasPublished
          location
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let author = res.body.data.add_authors;
        savedMutationId = author.id;
        author.should.have.property('name')
        author.should.have.property('age')
        author.should.have.property('hasPublished')
        author.should.have.property('location')
        done();
      })
    })
  
    it('After add_author Mutation, a new author is added to authors Array', (done) => {
      request.post('graphql')
      
      .send({ query: "query { authors { name } }"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.authors.should.have.lengthOf(103);
        done();
      })
    })
  
    it('The new author has correctly inputted params', (done) => {
      request.post('graphql')
      .send({ query: `query {
        authorsById(id: "${savedMutationId}") {
          name
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.authorsById.name.should.equal('Billy Madison');
        done();
      })
    })
  
    it('Mutation update_author returns the updated author', (done) => {
      request.post('graphql')
      .send({ query: `mutation {
        update_authors(id:"${savedMutationId}", name:"James Madison") {
          name
          age
          id
          hasPublished
        }
      }
      `})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let author = res.body.data.update_authors;
        author.should.have.property('name');
        author.name.should.equal('James Madison');
        setTimeout(() => {
          done();
        }, 1500)
      })
    })
  
    it('Updated Author is saved in Database with updated values', (done) => {
      request.post('graphql')
      .send({ query: `query {
        authorsById(id:"${savedMutationId}") {
          name
          age
          id
          hasPublished
          location
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let author = res.body.data.authorsById;
        author.should.have.property('name');
        author.name.should.equal('James Madison');
        done();
    })
  })
  
  
    it('Mutation delete_authors returns the deleted author, with most recent data', (done) => {
      request.post('graphql')
      .send({ query: `
      mutation {
        delete_authors(id:"${savedMutationId}") {
          name
          age
          id
          hasPublished
          location
        }
      }
      `})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let author = res.body.data.delete_authors;
        author.should.have.property('name');
        author.name.should.equal('James Madison');
        setTimeout(() => {
          done();
        }, 1500)
      })
    })
  
    it('After delete_author Mutation, the new author is removed from authors array', (done) => {
      request.post('graphql')
      .send({ query: "query { authors { name } }"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.data.authors.should.have.lengthOf(102);
        done();
      })
    })
  
  
    it('After delete_author Mutation, querying for the deleted author returns null ', (done) => {
      request.post('graphql')
      .send({ query: `query {
        authorsById(id:"${savedMutationId}") {
          name
          age
          id
          hasPublished
          location
        }
      }`})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        let returnedAuthor = String(res.body.data.authorsById);
        expect(returnedAuthor.should.equal('null'));
        done();
      })
    })
  });

