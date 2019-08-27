const graphql = require('graphql')
const { GraphQLInputObjectType,GraphQLID, GraphQLString,GraphQLList,GraphQLNonNull,GraphQLInt,GraphQLFloat } = graphql


const InputList = new GraphQLInputObjectType({
	name: 'InputListType',
	description: 'List payload definition',
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString) },
		type: { type: new GraphQLNonNull(GraphQLString) }
	})
})

module.exports = InputList
