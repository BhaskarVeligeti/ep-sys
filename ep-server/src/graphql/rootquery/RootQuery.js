const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString, GraphQLFloat } = graphql


// models.....
const User_Model = require('../../database/models/user')

// Output.....
const UserType = require('../output/output_user')
const Output_Product = require('../output/output_product')

// inputs.....



// helpers....
const findListByName = require('../../database/helpers/findListByName')
const getProducts = require('../../database/helpers/getProducts')



/**
 * RootQuery used to allow GraphQL enter into application data graph, by using resolve() go to database get the data and send as response object
 */
const RootQuery = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({

			/*-----------------------------------------------  Product ------------------------------------------------------------------------*/
			products: {
				type: new GraphQLList(Output_Product), // return type 
				resolve(parentValue, req) {
					return getProducts();
				}
			}, // end of products

	/*-----------------------------------------------  Users ------------------------------------------------------------------------*/
	users: {
		type: new GraphQLList(UserType), // return type 
		// args: {
		// 	role: { type: new GraphQLNonNull(GraphQLString) }
		// },
		resolve(parentValue, { role }, req) {  // connect database
			return findListByName('Representative').then((r) => {
				return User_Model.find({role:r._id});
			})
			
		}
	}, // end of repUsers
			







	}) // end of fields
})
module.exports = RootQuery
