const User_Model = require('../models/user')
const findUserByUsername = require('./findUserByUsername')
const findListByName = require('./findListByName')

module.exports = (args) => {
  /* check point if User is existing or not  */
  return User_Model.findOne({ username: args.username }).then((user) => {
    if (user !== null) {
      throw new Error(`User already created....: ${args.username}`)
	} else {
	return findUserByUsername(args.createdBy).then((u) => {  // get the createdBy
      return findListByName(args.role).then((r) => {
		  return findListByName('Active').then((s) => {
			
			// create user instance   based on  firmName 
			  if (args.role === 'Representative') { // Representative
				var user = new User_Model(
					{
						firstName: args.firstName,
						surname: args.surname,
						username: args.username,
						password: args.password,
						email: args.email,
						role: r,
						createdBy: u,
						status: s
					})
			  }
			  if (args.role === 'Customer') { // Customer

				 user = new User_Model(
					{
						 firmName: args.firmName,
						 username: args.username,
						 password: args.password,
						 createdBy: u,
						 role: r,
						 status: s
					})
				  
			    }		  
       
          return user.save() // return promise object	
        })
	  })
	})
    } // end of else

  }).catch((err) => {
    return err})
}
