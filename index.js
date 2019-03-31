console.log("Loading...");

// Import the discord.js module
const Discord = require('discord.js')

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for your bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = process.env.token;

console.log("Discord.js Ready!");

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Connected To Discord!');
});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;

    if (message.content === ".hello") {
        message.channel.send("```Hello!```")
    }
    
    if (message.content === ".8ball") { 
        var items = Array("Yes","No","Maybe","Definitely","Probably","Probably Not","Try Again")
        var item = items[Math.floor(Math.random() * items.length)];
        message.channel.send("```"+item+"```")
    }

    if (message.content === ".flip") {
        var headstails = ["Heads","Tails"]
        var ht = headstails[Math.floor(Math.random() * headstails.length)];
        message.channel.send("```"+ht+"```")
    }

    if (message.content === ".help") {
        message.channel.send("``` Help \n Prefix is . \n Help - Display this dialog \n Hello - Say Hello! \n 8ball - Make a decision \n Flip - Flip a Coin \n Howsmart - Determines how smart you are. ```")
    }

    if (message.content.startsWith(".howsmart")) {
        message.channel.send("```"+message.author.username+" is "+(Math.floor(Math.random()*100)) +"% smart.```")
    }
});
  


bot.login(token);
