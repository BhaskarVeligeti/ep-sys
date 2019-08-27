const graphql = require('graphql')
const { GraphQLInputObjectType, GraphQLString,GraphQLNonNull } = graphql


const InputCreateUser = new GraphQLInputObjectType({
	name: 'InputCreateUserType',
	description: 'Create User payload definition',
	fields: () => ({
		email: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: GraphQLString },

					
	})
})

module.exports = InputCreateUser
