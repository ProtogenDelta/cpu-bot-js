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
const cmdprefix = "\\";

console.log("Discord.js Ready!");

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Connected To Discord!');
    bot.user.setActivity("a blinking cursor.",{type : "WATCHING"})
});

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    var incoming = d.toString().trim()
    
    if (incoming.startsWith("bt ")) {
    bot.channels.get("567547154005098499").send(incoming.substr(3))
    }
    
    if (incoming.startsWith("ggn ")) {
    bot.channels.get("567601788614868992").send(incoming.substr(4))
    }
});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;
    
    if (message.content.startsWith(";")) {
        console.log("@"+message.author.username+" in #"+message.channel.name+":\n "+message.content.substr(1)+" ["+Math.round(bot.ping)+"ms]")
    }
    
    if (!message.content.startsWith(cmdprefix)) return;
    
    var cmd = message.content.substr(1).trim();
});
  

bot.login(token);
