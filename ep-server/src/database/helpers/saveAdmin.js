const User_Model = require('../models/user')
const findListByName = require('./findListByName')

module.exports = (args) => {
  /* check point if User is existing or not  */
  return User_Model.findOne({ username: args.username }).then((user) => {
    if (user !== null) {
      throw new Error(`User already created....: ${args.username}`)
    } else {
      return findListByName(args.role).then((r) => {
        return findListByName('Active').then((s) => {
          // create user instance
          const user = new User_Model(
            {
              firstName: args.firstName,
              surname: args.surname,
              username: args.username,
              password: args.password,
              email: args.email,
              role: r,
              status: s
            })
          return user.save() // return promise object	
        })
      })
    } // end of else

  }).catch((err) => {
    return err})
}
