const graphql = require('graphql')
const {GraphQLObjectType, GraphQLString, GraphQLID} = graphql 
const List_Model = require('../../database/models/list')


const OutPutList = new GraphQLObjectType({
  name: 'ListType',
  fields: () => ({
    id: { type: GraphQLID },
	  name: { type: GraphQLString },
	  type: {
		type: GraphQLString,
		resolve(parentValue, args, req) {
			return List_Model.findOne({ _id: parentValue._id })
				.populate('type')
				.then((list) => {
					return list.type.name
				})
		}
	},
  })
})

module.exports = OutPutList