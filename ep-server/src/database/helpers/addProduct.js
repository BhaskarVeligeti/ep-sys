const fs = require('fs');
const Product_Model = require('../models/product')
const findUserByUsername = require('./findUserByUsername')
const findListByName = require('./findListByName')

module.exports = (args) => {
/* check point if  Product exist with same Vendor,Category and Name or not  */
	

			return Product_Model.findOne({
				name:args.name
			}).then((product) => {
			
				if (product !== null) {
					throw new Error(`Product already add with....:   ${args.name}`)
				}
				else {
					
					return findListByName('Active').then((s) => {
										var product = new Product_Model(
								{
									name: args.name,
									description: args.description,
									sellingPrice: args.sellingPrice,
									status: s,
									image:fs.readFileSync(args.image)
								})
								return product.save()
								.then((doc)=>{
									let product = {}
									// From Binary to base64:
									var base64data = Buffer.from(doc.image, 'binary').toString('base64');
									// console.log('base64data',base64data) 
									product = {
										id: doc._id,
										name: doc.name,
										description: doc.description,
										sellingPrice: doc.sellingPrice,
										status: doc.status,
										image: base64data,
										rating: doc.rating,
										reviews: doc.reviews,
										createdAt: doc.createdAt
									}
									return product

								})	
				
					

					})

				}
		})	

}
