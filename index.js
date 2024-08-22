require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const Trackers = require("./models/trackers");
const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.hour = 23;
rule.minute = 59;
rule.tz = 'Canada/Pacific';

const job = schedule.scheduleJob(rule, async function(){
	const userList = await Trackers.findAll({attributes: ['username']});
	const names = userList.map(t => t.username);
	for(let i = 0; i < names.length; i++){
		const tracker = await Trackers.findOne({where: {username: names[i]}});
		if(!tracker.notification) continue;
		let content = `your calories for today is ${tracker.current}~`;
		if(tracker.goal){
			if(tracker.current < tracker.goal){
				content += ` you were under your goal`;
			}
			else if(tracker.current > tracker.goal){
				content += ` you were over your goal`;
			}
			else{
				content += ` you are exactly at your goal wowow`;
			}
		}
		content += " :D";
		await Trackers.update({current: 0}, {where: {username: names[i]}});
		client.users.send(names[i], content);
	}
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.once(Events.ClientReady, readyClient => {
	Trackers.sync();
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.token);