const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID,GraphQLBoolean } = graphql



const Token= new GraphQLObjectType({
        name:'TokenType',
        fields:()=>({
            token: { type: GraphQLString }
        })


})


module.exports = Token




