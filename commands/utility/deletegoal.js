const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletegoal')
		.setDescription('deletes calorie goal'),
	async execute(interaction) {
		const user = interaction.user.id;
        const tracker = await Trackers.findOne({where: {username: user}});
        if(tracker && tracker.goal){
            await Trackers.update({goal: null}, {where: {username: user}});
            return interaction.reply(`your goal has been deleted <3`);
        }
        return interaction.reply("you don't have a goal to delete(?)");
	}
};