const graphql = require('graphql');
const authors_model = require('../server/db/authors.js');
const stories_model = require('../server/db/stories.js');
const _ = require('lodash');
const mongoose = require('mongoose');

const { 
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString, 
    GraphQLInt, 
    GraphQLBoolean,
    GraphQLDate,
    GraphQLList,
} = graphql;

const authors_type = new GraphQLObjectType({
    name: 'authors_model',
    fields: () => ({
    id: { type: GraphQLString },
    hasPublished: { type: GraphQLBoolean },
    stories: { type: new GraphQLList(GraphQLString)},
    linked_stories: {
        type: new GraphQLList(stories_type),
        resolve(parent, args) {
        let userIds = _.map(parent.stories, function(userId){ return mongoose.Types.ObjectId(userId) }); 
        return stories_model.aggregate([
            [ { $match : { "_id" : {"$in": userIds}}} ]
            ]);
        },
        },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    location: { type: GraphQLString }
        })
    });
    
const stories_type = new GraphQLObjectType({
    name: 'stories_model',
    fields: () => ({
    id: { type: GraphQLString },
    isPaperBack: { type: GraphQLBoolean },
    title: { type: GraphQLString },
    isOnAmazon: { type: GraphQLBoolean },
    copyright: { type: GraphQLInt },
        linked_authors: {
        type: new GraphQLList(authors_type),
        resolve(parent, args) {
        let arr = [];
        try {
            arr = parent.author.split(",");
        } catch(err) {
            return authors_model.findById(mongoose.Types.ObjectId(parent.author[0]));
        }
        let userIds = _.map(arr, function(userId){ return mongoose.Types.ObjectId(userId) }); 
        return authors_model.aggregate([
            [ { $match : { "_id" : {"$in": userIds}}} ]
            ]);
        },
        },
    author: { type: GraphQLString }
    })
});
    
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
    authors: {
        type: new GraphQLList(authors_type),
        resolve() {
        return authors_model.find({});
        }
    },
    authorsById: {
        type: authors_type,
        args: { id: { type: GraphQLString}},
        resolve(parent, args) {
        return authors_model.findById(mongoose.Types.ObjectId(args.id));
        }
        },
    stories: {
        type: new GraphQLList(stories_type),
        resolve() {
        return stories_model.find({});
        }
    },
    storiesById: {
        type: stories_type,
        args: { id: { type: GraphQLString}},
        resolve(parent, args) {
        return stories_model.findById(mongoose.Types.ObjectId(args.id));
        }
        }
    }
    
    });

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
    add_authors: {
    type: authors_type,
    args: {
        id: { type: GraphQLString },
        hasPublished: { type: GraphQLBoolean },
        stories: { type: new GraphQLList(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        location: { type: GraphQLString }
    },
    resolve(parent, args) {
        const authors = new authors_model(args);
        return authors.save();
    }
    },
    update_authors: {
    type: authors_type,
    args: {
        id: { type: GraphQLString },
        hasPublished: { type: GraphQLBoolean },
        stories: { type: new GraphQLList(GraphQLString) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        location: { type: GraphQLString }
    },
    resolve(parent, args) {
        return authors_model.findByIdAndUpdate(args.id, args, { new: true });
    }
    },
    delete_authors: {
    type: authors_type,
    args: { id: { type: GraphQLString}},
    resolve(parent, args) {
        return authors_model.findByIdAndRemove(args.id);
    }
    },
    add_stories: {
    type: stories_type,
    args: {
        id: { type: GraphQLString },
        isPaperBack: { type: GraphQLBoolean },
        title: { type: GraphQLString },
        isOnAmazon: { type: GraphQLBoolean },
        copyright: { type: GraphQLInt },
        author: { type: GraphQLString }
    },
    resolve(parent, args) {
        const stories = new stories_model(args);
        return stories.save();
    }
    },
    update_stories: {
    type: stories_type,
    args: {
        id: { type: GraphQLString },
        isPaperBack: { type: GraphQLBoolean },
        title: { type: GraphQLString },
        isOnAmazon: { type: GraphQLBoolean },
        copyright: { type: GraphQLInt },
        author: { type: GraphQLString }
    },
    resolve(parent, args) {
        return stories_model.findByIdAndUpdate(args.id, args, { new: true });
    }
    },
    delete_stories: {
    type: stories_type,
    args: { id: { type: GraphQLString}},
    resolve(parent, args) {
        return stories_model.findByIdAndRemove(args.id);
    }
    },
}
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});


