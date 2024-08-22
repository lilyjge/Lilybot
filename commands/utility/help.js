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
/endstudy - ends study reminders 
/help - displays all commands
/removecal (number: calories to be removed)- removes calories from today
/setcal (number: current calories today) - sets current calories today 
/setgoal (number: daily calorie goal) - sets calorie goal 
/setstudy (number: minutes between reminders) (number: minutes you will study for) - sends study reminders with intervals of given minutes in between 
/viewcal - views current calories for today 
/viewgoal - views calorie goal
            `);
	}
};