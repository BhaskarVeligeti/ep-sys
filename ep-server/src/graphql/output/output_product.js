const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLID } = graphql
const GraphQLDate = require('graphql-date')


const Product = new GraphQLObjectType({
	name: 'ProductType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		sellingPrice: { type: GraphQLFloat },
		image: { type: GraphQLString },
		rating: { type: GraphQLInt },
		reviews: { type: GraphQLInt },
		createdAt: { type: GraphQLDate }
	})
})

module.exports = Product
