const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

/* Step 1: Schema */

const userSchema = new Schema({

  firstName: { type: String },
	surname: { type: String },
  username: {
    type: String,
    unique: true, required: true, dropDups: true
  },
  password: {
    type: String,
    required: true
  },
  firmName: { type: String },
  email: { type: String},
  role: {
		type: Schema.Types.ObjectId,
		ref: 'list', required: true
	},
	createdAt: { type: Date,  required: true,default: Date.now },
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'user'
	},
	status: {
		type: Schema.Types.ObjectId,
		ref: 'list', required: true
	},
})

// for signup = pre save hook === function will run before saving
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  // salting (random no of charectors) and hashing password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // update password
      user.password = hash;
      next();
    })


  })

})


// for login === process password must be hash and compared with in DB
userSchema.methods.comparePassword = function (candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject('Invalid password');
      }
      resolve(true);

    })
  })


}



/* Step 2: Model */
const User_Model = mongoose.model('user', userSchema)

module.exports = User_Model


