const User_Model = require('../models/user')

module.exports = (args) => {
    // console.log('args:', args)
    return User_Model.aggregate([
        {
          '$match': {
            'username': args
          }
        }, {
          '$lookup': {
            'from': 'list', 
            'localField': 'role', 
            'foreignField': '_id', 
            'as': 'role'
          }
        }, {
          '$project': {
            '_id': 1, 
            'username': '$username', 
            'password': '$password', 
            'role': {
              '$arrayElemAt': [
                '$role.name', 0
              ]
            }
          }
        }
      ]).then((user)=>{
            // console.log('authUser:',user[0]);
            return user[0]
        })



}
