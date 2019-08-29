const mongoose = require('mongoose')
/**
 * use this when we use decimal values
 */
var Float = require('mongoose-float').loadType(mongoose, 2);
const Schema = mongoose.Schema


/* Step 1: Schema */
const ProductSchema = new Schema({
	name: {type: String,required: true,index: true,unique: true},
	description: { type: String, required: true },
	sellingPrice: { type: Float, required: true },
	image: {type: Buffer, contentType: String},
	rating: { type: Number,default:3},
	reviews: { type: Number,default:3},
	status: {
		type: Schema.Types.ObjectId,
		ref: 'list'
	},
	createdAt: { type: Date, default: Date.now },
})

/* Step 2: Model */
const Product_Model = mongoose.model('product', ProductSchema,'product' )



module.exports = Product_Model;