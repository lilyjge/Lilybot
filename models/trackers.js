const Sequelize = require('sequelize');
const sequelize = require("../dbinit");

const Trackers = sequelize.define('trackers', {
	goal: Sequelize.INTEGER,
	current: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	username: Sequelize.STRING, //ACTUALLY USER ID
	notification:{
		type: Sequelize.BOOLEAN,
		defaultValue: true
	}
});

module.exports = Trackers;