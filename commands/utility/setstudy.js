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
    .addIntegerOption(option => 
      option
        .setName("min")
        .setDescription("minutes between reminders")
        .setRequired(true))
    .addIntegerOption(option => 
      option
        .setName("dur")
        .setDescription("how long to study for in minutes")),
	async execute(interaction) {
		const user = interaction.user.id;
    const min = interaction.options.getInteger("min");
    const dur = interaction.options.getInteger("dur");
    const endTime = new Date(Date.now() + 1000 * 60 * dur);
    let cur = schedule.scheduledJobs[user];
    if(cur) cur.cancel();
    let res = `successfully set reminders for every ${min} minutes~`;
    if(dur){
      cur = schedule.scheduleJob(user, {end: endTime, rule: `*/${min} * * * *`}, async function() {
        const data = await getapi(api_url);  
        interaction.followUp(`<@${user}> if youre studying, take a break~ if not, go study ( ｡ •̀ ᴖ •́ ｡) \nremember, ${data[0].a} said "${data[0].q}"~ (from [Zen Quotes API](https://zenquotes.io/))`);
      });
      res += ` reminders will last for ${dur} minutes <3`;
    }
    else{
      cur = schedule.scheduleJob(user, `*/${min} * * * *`, async function() {
        const data = await getapi(api_url);  
        interaction.followUp(`<@${user}> if youre studying, take a break~ if not, go study ( ｡ •̀ ᴖ •́ ｡) \nremember, ${data[0].a} said "${data[0].q}"~ (from [Zen Quotes API](https://zenquotes.io/))`);
      });
    }
    return interaction.reply(res);
	}
};