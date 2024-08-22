const { SlashCommandBuilder } = require('discord.js');
const Timers = require("../../models/timers");
const schedule = require('node-schedule');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setstudy')
		.setDescription('starts study reminders')
        .addNumberOption(option => 
			option
				.setName("min")
				.setDescription("minutes between reminders")
				.setRequired(true)),
	async execute(interaction) {
		const user = interaction.user.id;
        const min = interaction.options.getNumber("min");
        // let timer = await Timers.findOne({where: {username: user}});
        let cur = schedule.scheduledJobs[user];
        if(cur) cur.cancel();
        cur = schedule.scheduleJob(user, `*/${min} * * * *`, function() {
            interaction.followUp(`if youre studying, take a break~ if not, go study ( ｡ •̀ ᴖ •́ ｡)`);
        });
        // if(timer){
        //     clearInterval(timer.intervalId);
        //     let newId = setInterval(() =>{
        //         interaction.user.send(`test`);
        //     }, min * 60 * 1000);
        //     await Timers.update({intervalId: newId}, {where: {username: user}});
        //     console.log(newId);
        // }
        // else{
        //     let newId = setInterval(() =>{
        //         interaction.user.send(`test`);
        //     }, min * 60 * 1000);
        //     timer = await Timers.create({
        //         intervalId: newId,
        //         username: user
        //     });
        //     console.log(newId);
        // }
        // timer = await Timers.findOne({where: {username: user}});
        // // console.log(timer.intervalId);
        return interaction.reply(`successfully set reminders for every ${min} minutes~`);
	}
};