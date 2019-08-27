const graphql = require('graphql')
const { GraphQLInputObjectType, GraphQLString,GraphQLNonNull,GraphQLID } = graphql


const InputUpdateRep = new GraphQLInputObjectType({
	name: 'InputUpdateRepType',
	description: 'Update Rep payload definition',
	fields: () => ({
		id: { type: new GraphQLNonNull(GraphQLID) },
		firstName: { type: new GraphQLNonNull( GraphQLString) },
		surname: { type: new GraphQLNonNull(GraphQLString) },
		email: { type: GraphQLString },
		status: { type: new GraphQLNonNull(GraphQLString) },

					
	})
})

module.exports = InputUpdateRep
