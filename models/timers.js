const Sequelize = require('sequelize');
const sequelize = require("../dbinit");

const Timers = sequelize.define('timers', {
	intervalId: Sequelize.TIME,
    username: Sequelize.STRING //ACTUALLY USER ID
});

module.exports = Timers;