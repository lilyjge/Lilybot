const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
    ]
  });

client.login(process.env.token);

module.exports = client;