const User_Model = require('../models/user')
const findListByName = require('./findListByName')
/**
making Customer Active / Inactive
 */
module.exports = (args) => {
  
  return findListByName(args.status).then((s) => {
    return User_Model.updateOne({ _id: args.id }, {
      firstName: args.firstName,
      surname: args.surname,
      email: args.email,
      status: s
    })
      .then(() => {
        return User_Model.findOne({ _id: args.id })
      })
      .then((user) => {
        return user
      })
  })
}
