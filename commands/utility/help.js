const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('displays all commands'),
	async execute(interaction) {
        return interaction.reply(`
            /addcal (number: calories to be added) - adds calories to todays current count \n
            /addtogoal (number: calories to be added to goal) - increases calorie goal by given amount \n
            /calnotif (true/false: whether daily msg is sent) - sets whether you get msg on if you achieved daily goal \n
            /deletegoal - deletes calorie goal \n
            /endstudy - ends study reminders \n
            /help - displays all commands \n
            /removecal (number: calories to be removed)- removes calories from today \n
            /setcal (number: current calories today) - sets current calories today \n
            /setgoal (number: daily calorie goal) - sets calorie goal \n
            /setstudy (number: minutes between reminders) - sends study reminders with intervals of given minutes in between \n
            /viewcal - views current calories for today \n
            /viewgoal - views calorie goal
            `);
	}
};