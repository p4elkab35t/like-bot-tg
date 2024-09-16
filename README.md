# Telegram bot based on **cloudflare workers**

### **In order to run this bot you need to make several steps:**
1. Go to the telegram bot creator bot [@BotFather](https://t.me/BotFather)
2. Type `/newbot`, then you will be proposed to give a name and a username for bot that should be ended with **bot**
3. Copy the HTTP API Token that bot will give you afterwards and add to the *wrangler.toml* file as a new variable called ENV_BOT_TOKEN
4. if you dont have *wrangler.toml* create one in root of repository and apply next lines 
```
name = "{desired name of cloudflare project}"
main = "src/index.js"
compatibility_date = "2024-01-17"

[vars]
ENV_BOT_TOKEN = "{your api bot token you got from @botfather}"
```
4. Go to the cloudflare workers and pages dashboard *(you have to login into the cloudlfare before)*
5. Create new worker app (Create new application -> Create Worker -> Input the nameyou mentioned in wrnagler toml file -> Deploy)
6. Go to root ofyour repository and run next steps:
     
    1. In the root of repository run, `npm install` command from command line
    2. Then run `npm run deploy` and follow steps

# Bot features

Bot will autatically set reactions on messages with 30% chance.
You can specify `ENV_LIKED_USERNAME` and `ENV_HATED_USERNAME`. This will be usernames of people with only positive reactions from bot and only with negative.


## Extra development run options

- `npm run liveLogs` for running remote wrangler logging into your terminal
- `npm run devdeploy` for deploying project to cloudflare and running logging afterwards
- `npm run deploy` for simple deploy project to cloudflare
- `npm run dev` for running project on local machine
