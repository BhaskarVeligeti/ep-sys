const graphql = require('graphql')
const { GraphQLInputObjectType,GraphQLFloat, GraphQLInt,GraphQLString,GraphQLNonNull } = graphql
const  GU  = require('graphql-upload')
const  {GraphQLUpload}  = GU

const InputAddProduct = new GraphQLInputObjectType({
	name: 'InputAddProductType',
	description: 'Add Product payload definition',
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString) },
		description: { type: new GraphQLNonNull(GraphQLString) },
		sellingPrice: { type: new GraphQLNonNull(GraphQLFloat) },
		image: { type: GraphQLUpload },
		rating: { type: GraphQLInt },
		reviews: { type: GraphQLInt },
					
	})
})

module.exports = InputAddProduct
