const { SlashCommandBuilder } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('sleeptoday')
		.setDescription('ends sleep reminders for today'),
	async execute(interaction) {
		const user = interaction.user.username;
        let cur = schedule.scheduledJobs[user + "min"];
        if(cur){
            cur.cancel();
            return interaction.reply(`good night~ sleep well <3`);
        }
        else{
            return interaction.reply(`you're not receiving sleep reminders right now (?)`);
        }
	}
};