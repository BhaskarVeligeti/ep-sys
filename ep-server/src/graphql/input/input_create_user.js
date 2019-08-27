const graphql = require('graphql')
const { GraphQLInputObjectType, GraphQLString,GraphQLNonNull } = graphql

const InputCreateUser = new GraphQLInputObjectType({
	name: 'InputCreateUserType',
	description: 'Create Reprentative payload definition',
	fields: () => ({
		firstName: { type: GraphQLString },
		surname: { type: GraphQLString },
		username: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: new GraphQLNonNull(GraphQLString) },
		firmName: { type: GraphQLString },
	    email: { type: GraphQLString },
		role: { type: new GraphQLNonNull(GraphQLString) },
		createdBy: { type: new GraphQLNonNull(GraphQLString) }
					
	})
})

module.exports = InputCreateUser
