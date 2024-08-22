const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('viewgoal')
		.setDescription('views calorie goal'),
	async execute(interaction) {
		const user = interaction.user.id;
        const tracker = await Trackers.findOne({where: {username: user}});
        if(tracker && tracker.goal){
            return interaction.reply(`your goal is currently ${tracker.goal} :D`);
        }
        return interaction.reply("you don't have a goal yet D:");
	}
};