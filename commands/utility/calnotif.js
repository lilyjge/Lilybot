const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('calnotif')
		.setDescription('sets whether you get msg on if you achieved daily goal')
		.addBooleanOption(option => 
			option
				.setName("notif")
				.setDescription("whether daily msg is sent")
				.setRequired(true)),
	async execute(interaction) {
		const notif = interaction.options.getBoolean("notif");
		try{
			const user = interaction.user.id;
        	const tracker = await Trackers.findOne({where: {username: user}});
			if(tracker){
				await Trackers.update({notification: notif}, {where: {username: user}});
				return interaction.reply(`successfully changed your notification setting to ${notif} :D`);
			}
			else{
				return interaction.reply(`you're not getting notifications anyways D:`);
			}
		}
		catch (error){
			console.log(error);
			return interaction.reply("something went wrong D:");
		}
	}
};