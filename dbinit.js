const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

module.exports = sequelize;

// const Trackers = require("./models/trackers");
// const Timers = require("./models/timers");
// Trackers.sync();
// Timers.sync();