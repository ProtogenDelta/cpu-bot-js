console.log("Loading...");

var stdin = process.openStdin();
console.log("Console Ready!");

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for your bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = process.env.token;

//Prefix for your bot, Can be changed to anything.
const msgprefix = ":";

console.log("Discord.js Ready!");

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Connected To Discord!');
    console.log('\nCHANNEL CODES\n1:GGN #cpu-bot-chat\n2:Test Server #cli-chat\n');
});

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    var incoming = d.toString().trim()
    
    if (incoming.startsWith("1:")) {
        bot.channels.get("567601788614868992").send(incoming.substr(2))
    } else if (incoming.startsWith("2:")) {
        bot.channels.get("567547154005098499").send(incoming.substr(2))
    } else {
        bot.channels.get("567601788614868992").send(incoming)
        bot.channels.get("567547154005098499").send(incoming)
    }
});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;
    
    if (message.content.startsWith(msgprefix)) {
        console.log("@"+message.author.username+" in #"+message.channel.name+":\n "+message.content.substr(1)+" ["+Math.round(bot.ping)+"ms]")
    }
});
  

bot.login(token);
