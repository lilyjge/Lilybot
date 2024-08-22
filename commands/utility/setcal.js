const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setcal')
		.setDescription('sets current calories today')
        .addNumberOption(option => 
			option
				.setName("cal")
				.setDescription("current calories today")
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.user.id;
        const cal = interaction.options.getNumber("cal");
        try{
            var tracker = await Trackers.findOne({where: {username: user}});
            if(tracker){
                await Trackers.update({current: cal}, {where: {username: user}});
            }
            else{
                tracker = await Trackers.create({
					current: cal,
					username: user
				});
            }
            await interaction.reply(`successfully set todays calories to ${cal} :D`);
            tracker = await Trackers.findOne({where: {username: user}});
            if(tracker.goal){
                return interaction.followUp(`you're at ${tracker.current} calories out of your goal of ${tracker.goal} :)`);
            }
            else{
                return interaction.followUp(`you're at ${tracker.current} calories, use /setgoal if you'd like to set a daily calorie goal :)`);
            }
        }
        catch (error){
            console.log(error);
			return interaction.reply("something went wrong D:");
        }
	}
};