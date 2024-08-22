const { SlashCommandBuilder } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('endstudy')
		.setDescription('ends study reminders'),
	async execute(interaction) {
		const user = interaction.user.id;
        let cur = schedule.scheduledJobs[user];
        if(cur){
            cur.cancel();
            return interaction.reply(`bye bye~ good job studying today ദ്ദി(˵ •̀ ᴗ - ˵ ) ✧`);
        }
        else{
            return interaction.reply(`you don't have a timer to end (?)`);
        }
	}
};