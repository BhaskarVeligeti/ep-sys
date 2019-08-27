const User_Model = require('../models/user')

module.exports = (username) => {
	// console.log('username=',username)
	return User_Model.findOne({ username })
		.then((u) => {
			// console.log('userId=', u)
			return u._id
		})

  }

