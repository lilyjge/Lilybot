const { SlashCommandBuilder } = require('discord.js');
const schedule = require('node-schedule');
const client = require("../../client");

function isValidTimeZone(tz) {
    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw new Error('Time zones are not available in this environment');
    }

    try {
        Intl.DateTimeFormat(undefined, {timeZone: tz});
        return true;
    }
    catch (ex) {
        return false;
    }
}

async function settimer(hour, min, timezone, user, id){
    let cur = schedule.scheduledJobs[user];
    if(cur) cur.cancel();
    cur = schedule.scheduleJob(user, {hour: hour, minute: min, tz: timezone}, async function() {
        let minutely = schedule.scheduleJob(user + "min", `*/${1} * * * *`, async function() {
            client.users.send(id, `<@${id}> go to sleep!!! think about your skin, brain, and productivity tomorrow~`);
        });
    });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('setsleep')
		.setDescription('sets sleep reminder')
		.addIntegerOption(option => 
            option
              .setName("hour")
              .setDescription("hour for sleep time in 24 hour format")
              .setRequired(true))
        .addIntegerOption(option => 
            option
              .setName("min")
              .setDescription("min for sleep time, defaults to 0"))
        .addStringOption(option => 
            option
                .setName("timezone")
                .setDescription("your timezone by TZ identifier, defaults to est")),
	async execute(interaction) {
		const user = interaction.user.username;
        const id = interaction.user.id;
        const hour = interaction.options.getInteger("hour");
        let min = interaction.options.getInteger("min");
        if(!min) min = 0;
        let timezone = interaction.options.getString("timezone");
        const valid = isValidTimeZone(timezone);
        if(!valid) timezone = "Canada/Eastern";
        if(hour < 0 || hour > 23 || min < 0 || min > 59){
            return interaction.reply(`hour must be between 0 and 23 and minute must be betwee 0 and 59!!`);
        }
        await settimer(hour, min, timezone, user, id);
        let pm = min;
        if(min < 10) pm = "0" + min;
        return interaction.reply(`successfully set sleep reminders starting at ${hour}:${pm} in the ${timezone} timezone~`);
	}
};