console.log("Loading...");

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();

// Token for your bot, located in the Discord application console - https://discordapp.com/developers/applications/me/
const token = process.env.token;

//Prefix for your bot, Can be changed to anything.
const cmdprefix = "<";

console.log("Discord.js Ready!");

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Connected To Discord!');
    bot.user.setActivity("a blinking cursor.",{type : "WATCHING"})
});

function thumbs(msgIn) {
    msgIn.react("👍").then(() => msgIn.react("👎"))
}

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;
    if (!message.content.startsWith(cmdprefix)) return;
    var cmd = message.content.substr(1).trim();
     
    if (cmd === "help") { //help command.
        message.channel.send("``` Help \n Prefix is "+cmdprefix+" \n Help - Display this dialog \n Hello - Say Hello! \n 8ball - Make a decision \n Flip - Flip a Coin \n Howsmart - Determines how smart you are. \n Ping - Determine the bot response time. \n Say - Says anything you want! \n Poll - Opens a reactions poll.```")  
     }
    
    if (cmd === "ping") { //ping command. get the bot response time in ms
        message.channel.send("```Pong! The bot's ping time is "+Math.round(bot.ping)+"ms.```");
    }
    
    if (cmd === "hello") {
        message.channel.send("```Hello!```");
    }
    
    if (cmd === "8ball") { //8-ball command. Self explanatory.
        var items = Array("Yes","No","Maybe","Definitely","Probably","Probably Not","Try Again");
        var item = items[Math.floor(Math.random() * items.length)];
        message.channel.send("```"+item+"```");
    }

    if (cmd === "flip") {//Coin flip command. returns "Heads" or "Tails"
        var headstails = ["Heads","Tails"];
        var ht = headstails[Math.floor(Math.random() * headstails.length)];
        message.channel.send("```"+ht+"```");
    }

    if (cmd.startsWith("howsmart")) { //howsmart command. randomly generates a number up to 100. mention a user to show their score.
        var parts = cmd.split(" ");
        var name = parts.length > 1 ? (message.mentions.users.first()).username : message.author.username;
        message.channel.send("```"+name+" is "+(Math.floor(Math.random()*100)) +"% smart.```");
    }
    
    if (cmd.startsWith("say ")) {
        var tosay = cmd.substr(4);
        message.channel.send("```"+tosay+"```");
    }

    if (cmd.startsWith("poll")) { //Poll Command, Returns an open reaction poll.
        if (cmd.length > 5 && cmd.charAt(5) == " ") {
            var q = cmd.substr(5)
            var runccmd = 1
        }else if(cmd.length > 5 && !cmd.charAt(5) == " ") {
            message.channel.send("```Invalid Syntax, "+message.author.username+".```")
            var runcmd = 0
        }else{
            var q = "Please submit a vote."
            var runcmd = 1
        }
        if (runcmd) {
        message.channel.send("```"+q+"```").then(sentMessage => thumbs(sentMessage))
        }else{
        //do nothing
        }
    }

    if (cmd.startsWith("setactivity" && cmd.charAt(12) == " ") {
        var actype = cmd.substr(12).split(" ")[0]
        var accontent = cmd.substr(12) - actype
        bot.user.setActivity(accontent, {type : actype})
    }
});
  

bot.login(token);
