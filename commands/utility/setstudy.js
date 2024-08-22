const { SlashCommandBuilder } = require('discord.js');
const schedule = require('node-schedule');

const api_url = 'https://zenquotes.io/api/random/';
async function getapi(url)
{
  const response = await fetch(url);
  var data = await response.json();
  return data;
}

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
        let cur = schedule.scheduledJobs[user];
        if(cur) cur.cancel();
        cur = schedule.scheduleJob(user, `*/${min} * * * *`, async function() {
            interaction.followUp(`if youre studying, take a break~ if not, go study ( ｡ •̀ ᴖ •́ ｡)`);
            const data = await getapi(api_url);
            interaction.followUp(`remember, ${data[0].a} said "${data[0].q}"~ (from Zen Quotes API)`);
        });
        return interaction.reply(`successfully set reminders for every ${min} minutes~`);
	}
};