
// let input = {"authors":{"typeDefs":[["hasPublished",{"type":"Boolean"}],["stories",{"type":"Arr_ObjId"}],["name",{"type":"String"}],["age",{"type":"Number"}],["location",{"type":"String"}]]},"stories":{"typeDefs":[["isPaperBack",{"type":"Boolean"}],["title",{"type":"String"}],["isOnAmazon",{"type":"Boolean"}],["copyright",{"type":"Number"}],["author",{"type":"Single_ObjId"}]]}}

    const mongoParser = (input) => {
        console.log(input);
        let collKeys = Object.keys(input)
        let topOutput = `const graphql = require('graphql');
        `;
        collKeys.forEach(coll => {
        topOutput += `const ${coll}_model = require('../db/${coll}.js');
        `
        })

        topOutput += `const _ = require('lodash');
        const mongoose = require('mongoose');

        const { 
        GraphQLObjectType,
        GraphQLSchema,
        GraphQLString, 
        GraphQLInt, 
        GraphQLBoolean,
        GraphQLDate,
        GraphQLList,
        } = graphql;`;

        let typeDefs = ``;

        for (let i = 0; i < collKeys.length; i++) {
        typeDefs += `
        const ${collKeys[i]}_type = new GraphQLObjectType({
            name: '${collKeys[i]}_model',
            fields: () => ({
            id: { type: GraphQLString }`;
        let typeDefsArr = input[collKeys[i]]["typeDefs"];
        for (let j = 0; j < typeDefsArr.length; j++) {
            switch(typeDefsArr[j][1].type) {
            case "Boolean":
            typeDefs += `,
            ${typeDefsArr[j][0]}: { type: GraphQL${typeDefsArr[j][1].type} }`;
            break;
            case "String":
            typeDefs += `,
            ${typeDefsArr[j][0]}: { type: GraphQL${typeDefsArr[j][1].type} }`;
            break;
            case "Number":
            typeDefs += `,
            ${typeDefsArr[j][0]}: { type: GraphQLInt }`;
            break;
            case "Date":
            typeDefs += `,
            ${typeDefsArr[j][0]}: { type: GraphQLInt }`;
            break;
            case "Single_ObjId":
            let refName;
            if (!collKeys.includes(typeDefsArr[j][0])){
                refName = typeDefsArr[j][0] + 's';
            }
            typeDefs += `,
                linked_${refName}: {
                type: new GraphQLList(${refName}_type),
                resolve(parent, args) {
                let arr = [];
                try {
                    arr = parent.${typeDefsArr[j][0]}.split(",");
                } catch(err) {
                    return ${refName}_model.findById(mongoose.Types.ObjectId(parent.${typeDefsArr[j][0]}[0]));
                }
                let userIds = _.map(arr, function(userId){ return mongoose.Types.ObjectId(userId) }); 
                return ${refName}_model.aggregate([
                    [ { $match : { "_id" : {"$in": userIds}}} ]
                    ]);
                },
                },
            ${typeDefsArr[j][0]}: { type: GraphQLString }`;
            break;
            case "Arr_ObjId":
            typeDefs += `,
            ${typeDefsArr[j][0]}: { type: new GraphQLList(GraphQLString)},
            linked_${typeDefsArr[j][0]}: {
                type: new GraphQLList(${typeDefsArr[j][0]}_type),
                resolve(parent, args) {
                let userIds = _.map(parent.${typeDefsArr[j][0]}, function(userId){ return mongoose.Types.ObjectId(userId) }); 
                return ${typeDefsArr[j][0]}_model.aggregate([
                    [ { $match : { "_id" : {"$in": userIds}}} ]
                    ]);
                },
                }`
            break;
            }
        }

        if (collKeys.length -1 === i){
            typeDefs += `
            })
        });
            
        const RootQuery = new GraphQLObjectType({
            name: 'RootQueryType',
            fields: {`;
            } else {
                typeDefs += `
                })
            });
            `;
            }
        }
        // Adding RootQuery Section
        for (let k = 0; k < collKeys.length; k++) {
            if (k > 0) typeDefs += `,`;
            typeDefs += `
            ${collKeys[k]}: {
                type: new GraphQLList(${collKeys[k]}_type),
                resolve() {
                return ${collKeys[k]}_model.find({});
                }
            },
            ${collKeys[k]}ById: {
                type: ${collKeys[k]}_type,
                args: { id: { type: GraphQLString}},
                resolve(parent, args) {
                return ${collKeys[k]}_model.findById(mongoose.Types.ObjectId(args.id));
                }
                }`;
            if (collKeys.length - 1 === k) {
                typeDefs += `
            }
            
            });

        const Mutation = new GraphQLObjectType({
        name: 'Mutation',
        fields: {`;
        }
        }

        // Adding Mutation Section
        for (let m = 0; m < collKeys.length; m++) {
            let argsStr = ``;
            let typeDefsArr = input[collKeys[m]]["typeDefs"];
            for (let p = 0; p < typeDefsArr.length; p++) {
            switch(typeDefsArr[p][1].type) {
                case "Boolean":
                argsStr += `,
                ${typeDefsArr[p][0]}: { type: GraphQL${typeDefsArr[p][1].type} }`;
                break;
                case "String":
                argsStr += `,
                ${typeDefsArr[p][0]}: { type: GraphQL${typeDefsArr[p][1].type} }`;
                break;
                case "Number":
                argsStr += `,
                ${typeDefsArr[p][0]}: { type: GraphQLInt }`;
                break;
                case "Single_ObjId":
                argsStr += `,
                ${typeDefsArr[p][0]}: { type: GraphQLString }`;
                break;
                case "Arr_ObjId":
                argsStr += `,
                ${typeDefsArr[p][0]}: { type: new GraphQLList(GraphQLString) }`;
                default:
                break;
                }
            }
            // if (m > 0) typeDefs += `,`;
            typeDefs += `
            add_${collKeys[m]}: {
            type: ${collKeys[m]}_type,
            args: {
                id: { type: GraphQLString }`;
            typeDefs += argsStr;
            typeDefs += `
            },
            resolve(parent, args) {
                const ${collKeys[m]} = new ${collKeys[m]}_model(args);
                return ${collKeys[m]}.save();
            }
            },
            update_${collKeys[m]}: {
            type: ${collKeys[m]}_type,
            args: {
                id: { type: GraphQLString }`;
            typeDefs += argsStr;
            typeDefs += `
            },
            resolve(parent, args) {
                return ${collKeys[m]}_model.findByIdAndUpdate(args.id, args, { new: true });
            }
            },
            delete_${collKeys[m]}: {
            type: ${collKeys[m]}_type,
            args: { id: { type: GraphQLString}},
            resolve(parent, args) {
                return ${collKeys[m]}_model.findByIdAndRemove(args.id);
            }
            },`;
        if (collKeys.length - 1 === m) {
            typeDefs += `
        }
        });

        module.exports = new GraphQLSchema({
            query: RootQuery,
            mutation: Mutation
        });`;}
        }

        let schemasStr = ``;
        for (let i = 0; i < collKeys.length; i++) {
        schemasStr += `const mongoose = require('mongoose');
        const Schema = mongoose.Schema;

        const ${collKeys[i]}Schema = new Schema({`;
        let typeDefsArr = input[collKeys[i]]["typeDefs"];
        for (let j = 0; j < typeDefsArr.length; j++) {
        if(typeDefsArr[j][1].type === "Single_ObjId"){
            schemasStr += `
        ${typeDefsArr[j][0]}: {
            type: String,
        }`;
        } else if (typeDefsArr[j][1].type === "Arr_ObjId") {
        schemasStr += `
        ${typeDefsArr[j][0]}: {
            type: [String],
        }`;
        } else {
        schemasStr += `
        ${typeDefsArr[j][0]}: {
            type: ${typeDefsArr[j][1].type},
        }`;
        }
            if (j < typeDefsArr.length - 1) {
                schemasStr += `,`;
            }
        }
        let capital = collKeys[i].charAt(0).toUpperCase() + collKeys[i].slice(1)
        schemasStr += ` 
        });

        module.exports = mongoose.model("${capital}", ${collKeys[i]}Schema);

        `;
        }

        let totalString = ``;
        totalString += topOutput;
        totalString += `
        `;
        totalString += typeDefs;
        totalString += `
        `;
        totalString += schemasStr;
        console.log(totalString);
        return totalString
    }

module.exports = {
    mongoParser
  };