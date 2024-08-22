const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setgoal')
		.setDescription('sets calorie goal')
		.addNumberOption(option => 
			option
				.setName("goal")
				.setDescription("sets daily calorie goal")
				.setRequired(true)),
	async execute(interaction) {
		const goal = interaction.options.getNumber("goal");
		try{
			const user = interaction.user.id;
        	const tracker = await Trackers.findOne({where: {username: user}});
			if(tracker){
				await Trackers.update({goal: goal}, {where: {username: user}});
				return interaction.reply(`successfully changed your goal to ${goal} :D`);
			}
			else{
				const newTracker = await Trackers.create({
					goal,
					username: user
				});
				return interaction.reply(`successfully set your new goal to ${goal} :D`);
			}
		}
		catch (error){
			console.log(error);
			return interaction.reply("something went wrong D:");
		}
	}
};