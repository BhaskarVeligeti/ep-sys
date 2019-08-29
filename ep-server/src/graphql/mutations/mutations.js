const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLNonNull, GraphQLFloat, GraphQLInt, GraphQLID, GraphQLBoolean } = graphql



// models.....

// Output.....
const Output_List = require('../output/output_list')
const Output_User = require('../output/output_user')
const Output_Product = require('../output/output_product')

// Input.....
const Input_List = require('../input/input_list')
const Input_Create_User = require('../input/input_create_user')
const Input_Update_Rep = require('../input/input_update_rep')
const Input_Add_Product = require('../input/input_add_product')

// helpers....
const saveList = require('../../database/helpers/saveList')
const saveUser = require('../../database/helpers/saveUser')
const saveAdmin = require('../../database/helpers/saveAdmin')
const updateRepById = require('../../database/helpers/updateRepById')
const addProduct = require('../../database/helpers/addProduct')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({

/*---------------------------------------------------***  add product ---------------------------------------------------------------*/
addProduct: {
  type: Output_Product,
  args: {
    input: {
    type: new GraphQLNonNull(Input_Add_Product)
    }
  },
  resolve(parentValue, { input }, req) {
    return addProduct(input)
  }
  }, // end of addProduct 


    /*-----------------------------------------------------add -------------------------------------------------------------------*/


    /*-----------------------------------------------------add -------------------------------------------------------------------*/


    /*---------------create User (Representative/Customer)-------------------------------------------------------------*/
    createUser: {
      type: Output_User,
      args: {
        input: {
          type: new GraphQLNonNull(Input_Create_User)
        }
      },
      resolve(parentValue, { input }, req) {
        return saveUser(input)
      }
    }, // end of createUser	

    		  
		  /*----------------------------------------------------UpdateUser-----------------------------------------------------------------*/
		
	  updateRep: {
      type: Output_User,
      args: {
        input: {
        type: new GraphQLNonNull(Input_Update_Rep)
        }
      },
      resolve(parentValue, { input }, req) {
        return updateRepById(input)
      }
      }, // end of updateRep	

    /*-----------------------------------------------------add Admin-------------------------------------------------------------------*/

    addAdmin: {
      type: Output_User,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        surname: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        role: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, req) { // req = incoming request from express server
        return saveAdmin(args)
      }
    },
    /*-----------------------------------------------------add List-------------------------------------------------------------------*/

    addList: {
      type: Output_List,
      args: {
        input: {
          type: new GraphQLNonNull(Input_List)
        }
      },
      resolve(parentValue, { input }, req) {
        return saveList(input)
      }

    } // end of List	





















  }) // end of fields

}) // end of mutation

module.exports = mutation
