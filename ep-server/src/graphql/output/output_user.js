const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID,GraphQLBoolean } = graphql
const GraphQLDate = require('graphql-date')
const User_Model = require('../../database/models/user')


const User= new GraphQLObjectType({
    name: 'UserType',
        fields:()=>({
            id: { type: GraphQLID },
            firstName: { type: GraphQLString },
            surname: { type: GraphQLString },
            username: { type: GraphQLString },
            firmName: { type: GraphQLString },
            email: { type: GraphQLString },
            role: {
                type: GraphQLString,
                resolve(parentValue, args, req) {
                    return User_Model.findOne({ _id: parentValue._id })
                        .populate('role')
                        .then((user) => {
                            return user.role.name
                        })
                }
            },
            createdAt: { type: GraphQLDate },
            createdBy: {
                type: GraphQLString,
                resolve(parentValue, args, req) {
                    return User_Model.findOne({ _id: parentValue._id })
                        .populate('createdBy')
                        .then((user) => {
                            return (user.createdBy.firstName + "  " + user.createdBy.surname );
                            // return user.createdBy.username
                        })
                }
            },
            status: {
                type: GraphQLString,
                resolve(parentValue, args, req) {
                    return User_Model.findOne({ _id: parentValue._id })
                        .populate('status')
                        .then((user) => {
                            return user.status.name
                        })
                }
            },
        })


})


module.exports = User




