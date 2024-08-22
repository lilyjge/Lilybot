const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('viewcal')
		.setDescription('views current calories for today'),
	async execute(interaction) {
		const user = interaction.user.id;
        var tracker = await Trackers.findOne({where: {username: user}});
        if(!tracker){
            tracker = await Trackers.create({
                username: user
            });
        }
        if(tracker.goal){
            return interaction.reply(`your calories today is currently ${tracker.current} out of your goal of ${tracker.goal} :)`);
        }
        else{
            return interaction.reply(`your calories today is currently ${tracker.current} :)`);
        }
	}
};