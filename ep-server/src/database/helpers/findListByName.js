
const List_Model = require('../models/list')

module.exports = (args) => {
	return List_Model.findOne({ name: args })
}




