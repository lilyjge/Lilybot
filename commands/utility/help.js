const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('displays all commands'),
	async execute(interaction) {
        return interaction.reply(`
/addcal (number: calories to be added) - adds calories to todays current count
/addtogoal (number: calories to be added to goal) - increases calorie goal by given amount
/calnotif (true/false: whether daily msg is sent) - sets whether you get msg on if you achieved daily goal
/deletegoal - deletes calorie goal
/deletesleep - deletes and stops daily sleep reminders
/endstudy - ends study reminders 
/help - displays all commands
/removecal (number: calories to be removed)- removes calories from today
/setcal (number: current calories today) - sets current calories today 
/setgoal (number: daily calorie goal) - sets calorie goal 
/setsleep (number: hour of sleep time [0, 23]) (number: minute of sleep time [0, 59]) (text: [timezone by TZ identifier](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) - sets daily sleep reminder
/setstudy (number: minutes between reminders [1, 59]) (number: minutes you will study for) - sends study reminders with intervals of given minutes in between 
/sleeptoday - ends sleep reminders for today, they'll be back tomorrow
/viewcal - views current calories for today 
/viewgoal - views calorie goal
/viewsleep - views when your daily sleep reminder is
            `);
	}
};