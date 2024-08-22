const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtogoal')
		.setDescription('adds to calorie goal')
		.addNumberOption(option => 
			option
				.setName("cal")
				.setDescription("calories to be added to goal")
				.setRequired(true)),
	async execute(interaction) {
		const cal = interaction.options.getNumber("cal");
		try{
			const user = interaction.user.id;
        	var tracker = await Trackers.findOne({where: {username: user}});
			if(tracker){
				await Trackers.update({goal: tracker.goal + cal}, {where: {username: user}});
			}
			else{
				tracker = await Trackers.create({
					cal,
					username: user
				});
			}
			tracker = await Trackers.findOne({where: {username: user}});
            return interaction.reply(`successfully added ${cal} calories to your goal, your goal is now ${tracker.goal} :D`);
		}
		catch (error){
			console.log(error);
			return interaction.reply("something went wrong D:");
		}
	}
};