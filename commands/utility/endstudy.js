const { SlashCommandBuilder } = require('discord.js');
const Timers = require("../../models/timers");
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
            return interaction.reply(`bye bye~`);
        }
        else{
            return interaction.reply(`you don't have a timer to end (?)`);
        }
        // let timer = await Timers.findOne({where: {username: user}});
        // if(timer){
        //     console.log(timer.intervalId);
        //     clearInterval(timer.intervalId);
        //     await Timers.destroy({where: {username: user}});
        //     return interaction.reply(`bye bye~`);
        // }
        // else{
        //     return interaction.reply(`you don't have a timer to end (?)`);
        // }
	}
};