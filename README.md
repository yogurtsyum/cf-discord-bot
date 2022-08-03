# CF Workers Discord Bot
A template for running Discord bots on Cloudflare Workers.

Created for a Tech Spotlight on The Cdoe Lab! https://discord.gg/VN2FR9euer

## Getting Started
Make sure to create the Worker on Cloudflare's dashboard first. You should select "HTTP router" as the type.

Set the name of the Worker in `wrangler.toml` to match the one you put on Cloudflare's dashboard.

```
git clone https://github.com/yogurtsyum/cf-discord-bot.git
cd cf-discord-bot
wrangler secret put DISCORD_PUBLIC_KEY
wrangler publish
```

## Syncing Commands
Put the discord bot token in the `.env` file:
```
DISCORD_BOT_TOKEN=put token here
```
Then run the code to register commands:
```
ts-node register.ts
```