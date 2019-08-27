const Type_Model = require('../models/type')
const List_Model = require('../models/list')

module.exports = (args) => {
	return Type_Model.findOne({ name: args.type }).then((t) => {
		/* check point if list is existing or not  */
		return List_Model.findOne({ name: args.name, type: t._id }).then((list) => {
			if (list !== null) {
				throw new Error(`List already created....: ${args.name} with Type : ${t.name}`);
			} else {
				// create list instance
				const list = new List_Model({ name: args.name, type: t._id })
				return list.save();  
			}
		});

	})



}




