
require('dotenv').config();

//connect the discord api

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent
]});


//connection to openAi api
const {Configuration, OpenAIApi } = require('OpenAI');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
 });

const openAi = new OpenAIApi(Configuration); 

//when a message is sent on discord
client.on('messageCreate', async function(message){
    try{
        if(message.author.bot) return;

        const gptResponse = await openAi.createCompletion({
            model: "davinci",
            prompt: `ChaptGpt is a Friendly Bot:\n\ 
            ChatGpt: Hello, I am ChatGpt\n\
            ${message.author.username}: ${message.content}\n\
            ChatGpt:`,
            temperature: 0.9,
            max_tokens: 100,
            stop: ['ChatGpt:', 'HarshitMahajan:'],
        })
            

        message.reply(`${gptResponse.data.choices[0].text}`);
        return;
    }catch(err){
        console.log(err)
    }
});


// log the bot to discord server and it is not working
client.login(process.env.DISCORD_TOKEN);
console.log('ChatGpt Bot is running');

