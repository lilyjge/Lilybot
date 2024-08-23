const { SlashCommandBuilder } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletesleep')
		.setDescription('deletes sleep reminder'),
	async execute(interaction) {
		const user = interaction.user.username;
        let cur = schedule.scheduledJobs[user];
        if(cur){
            let minutely = schedule.scheduledJobs[user + "min"];
            if(minutely) minutely.cancel();
            cur.cancel();
            return interaction.reply(`bye bye~ make sure to keep sleeping well <3`);
        }
        else{
            return interaction.reply(`you don't have a sleep reminder to end (?)`);
        }
	}
};