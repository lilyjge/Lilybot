const { SlashCommandBuilder } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('viewsleep')
		.setDescription('views sleep reminder'),
	async execute(interaction) {
		const user = interaction.user.username;
        let cur = schedule.scheduledJobs[user];
        if(cur){
            const rule = cur.pendingInvocations[0].recurrenceRule;
            let pm = rule.minute;
            if(rule.minute < 10) pm = "0" + rule.minute;
            return interaction.reply(`your sleep time is set for ${rule.hour}:${pm} in the ${rule.tz} timezone~`);
        }
        else{
            return interaction.reply(`you don't have a sleep reminder set (?)`);
        }
	}
};