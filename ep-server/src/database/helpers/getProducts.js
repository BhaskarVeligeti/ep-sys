
const Product_Model = require('../models/product')

module.exports = (args) => {
	return Product_Model.find({}).then((d)=>{

		let products = []
		let product = {}

		d.map((doc)=>{
			// console.log('doc:',doc)
			var base64data = Buffer.from(doc.image, 'binary').toString('base64');
			product={
				id: doc._id,
				name: doc.name,
				description: doc.description,
				sellingPrice: doc.sellingPrice,
				image:  base64data, // From Binary to base64:
				rating: doc.rating,
				reviews: doc.reviews
			}
			products.push(product)
		})
		
		return products

	}).then((d)=>{
		// console.log('products:',d)
		return d
	})
}




