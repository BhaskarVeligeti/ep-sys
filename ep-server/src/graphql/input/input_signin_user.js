const graphql = require('graphql')
const { GraphQLInputObjectType, GraphQLString,GraphQLNonNull } = graphql


const InputSigninUser = new GraphQLInputObjectType({
	name: 'InputSignUserType',
	description: 'Signin User payload definition',
	fields: () => ({
		email: { type: new GraphQLNonNull(GraphQLString) },
		password: { type: GraphQLString },

					
	})
})

module.exports = InputSigninUser
