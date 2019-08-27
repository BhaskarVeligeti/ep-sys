const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* Step 1: Schema */
const ListSchema = new Schema({
	name: { type: String },
	type:{
		type: Schema.Types.ObjectId,
		ref: 'type'
	},
	seq: { type: Number },
	createdAt: { type: Date, default: Date.now }
})


/* Step 2: Model */
const List_Model = mongoose.model('list', ListSchema,'list', )



module.exports = List_Model;