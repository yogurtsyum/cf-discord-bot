import { Client } from 'discord.js';
import 'dotenv/config';

const client = new Client({ intents: [] });

client.on('ready', async () => {
  console.log('Bot ready! Syncing commands...');
  await client.application?.commands.set([
    {
      name: 'hello',
      description: 'Testing command!'
    }
  ]);
  console.log('Slash commands synced!');
});

client.login(process.env.DISCORD_BOT_TOKEN);