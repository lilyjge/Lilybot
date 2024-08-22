const Sequelize = require('sequelize');
const sequelize = require("../dbinit");

const Trackers = sequelize.define('trackers', {
	goal: Sequelize.INTEGER,
	current: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
	},
	username: Sequelize.STRING //ACTUALLY USER ID
});

module.exports = Trackers;