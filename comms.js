const Discord = require('discord.js');

const bot = new Discord.Client();

const token = process.env.token;

var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" + d.toString().trim() + "]");
    bot.channels.get("567547154005098499").send(d.toString().trim())
  });
console.log("stdin ready!")

console.log("Discord.js Ready!");

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Connected To Discord!');
});

bot.on('message', message => {
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;
    
    if (message.content.startsWith(">")) {
        console.log("@"+message.author.username+" in #"+message.channel.name+": "+message.content.substr(1)+" ["+Math.round(bot.ping)+"ms]")
    }
})
