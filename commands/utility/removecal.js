const { SlashCommandBuilder } = require('discord.js');
const Trackers = require("../../models/trackers");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('removecal')
		.setDescription('removes calories from today')
        .addNumberOption(option => 
			option
				.setName("cal")
				.setDescription("calories to be removed")
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.user.id;
        const cal = interaction.options.getNumber("cal");
        try{
            var tracker = await Trackers.findOne({where: {username: user}});
            if(tracker){
                await Trackers.update({current: tracker.current - cal}, {where: {username: user}});
            }
            else{
                tracker = await Trackers.create({
					current: 0 - cal,
					username: user
				});
            }
            await interaction.reply(`successfully removed ${cal} calories :D`);
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