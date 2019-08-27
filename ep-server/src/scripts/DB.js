conn = new Mongo() // instantiate database connections
db = connect('127.0.0.1:27017/EPdb')
print(' Successfully Created and Connected  to MongoDB :', db)


db.type.insert(
	[
		{ name: "Role"},
        { name: "Status"},
        { name: "Category"}
        
	]
)

// clear database
// db.product.drop()
// db.purchase.drop()
// db.orderdetails.drop()
// db.orders.drop()
// db.orderstatus.drop()

// print('drop collections completed...')
