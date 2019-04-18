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

const emojiCharacters = require('./emojiCharacters');

console.log("emojiCharacters.js ready!")

// Gets called when our bot is successfully logged in and connected
bot.on('ready', () => {
    console.log('Connected To Discord!');
    bot.user.setActivity("a blinking cursor.",{type : "WATCHING"})
});

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" + d.toString().trim() + "]");
    bot.channels.get("567547154005098499").send(d.toString().trim())
});

// Event to listen to messages sent to the server where the bot is located
bot.on('message', message => {
    var q
    var runcmd
    var reactTo
    // So the bot doesn't reply to iteself
    if (message.author.bot) return;
    
    if (message.content.startsWith(";")) {
        console.log("@"+message.author.username+" in #"+message.channel.name+": "+message.content.substr(1)+" ["+Math.round(bot.ping)+"ms]")
    }
    
    if (!message.content.startsWith(cmdprefix)) return;
    var cmd = message.content.substr(1).trim();
    
    if (cmd === "help") { //help command
        message.channel.send("``` Help \n Prefix is "+cmdprefix+" \n Help - Display this dialog \n Hello - Say Hello! \n 8ball - Make a decision \n Flip - Flip a Coin \n Howsmart - Determines how smart you are. \n Ping - Determine the bot response time. \n Say - Says anything you want! \n Poll - Opens a reactions poll. \n Npoll - Poll command, but with numbers.```")  
     }
    
    if (cmd === "ping") { //ping command. get the bot response time in ms
        message.channel.send("```Pong! The bot's ping time is "+Math.round(bot.ping)+"ms.```");
    }
    
    if (cmd === "hello") {
        message.channel.send("```Hello!```");
    }
    
    if (cmd.startsWith("8ball")) { //8-ball command. Self explanatory.
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
        if (cmd.startsWith("poll ")) {
            q = cmd.substr(5)
            runcmd = 1
        } else {
            q = "Please submit a vote."
            runcmd = 1
        }
        if (runcmd) {
            message.channel.send("```"+q+"```").then(sentMessage => sentMessage.react("👍").then(() => sentMessage.react("👎")))
        }else{
        //do nothing
        }
    }
    
    if (cmd.startsWith("npoll")) {
        if (cmd.startsWith("npoll ")) {
            q = cmd.substr(6)
            runcmd = 1
        } else {
                q = "Please submit a vote."
                runcmd = 1
        }
        if (runcmd) {
            message.channel.send("```"+q+"```").then(sentMessage => sentMessage.react(emojiCharacters[1]).then(() => sentMessage.react(emojiCharacters[2])))
        }else{
            //do nothing
        }
    }
});
  

bot.login(token);
