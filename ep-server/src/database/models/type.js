const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* Step 1: Schema */
const TypeSchema = new Schema({
	name: { type: String }
})


/* Step 2: Model */
const Type_Model = mongoose.model('type', TypeSchema,'type', )



module.exports = Type_Model;