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
const cmdprefix = "c!";
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
var commands = {
    help: {
		description: "You just typed this.",
		run: function(m) {
			m.channel.send("``` " + makeHelp() + "```")
		}
    },
    
	beacon: {
		run: function(m, t) {
			console.log("ATTENTION! Beacon activated in #"+m.channel.name+" of server "+m.guild.name+" by @"+m.author.username)
			if(t) {
				console.log("With Message: " + t)
			}
		}
    },

    ping: {
		description: "Determine the bot response time.",
		run: function(m) { 
			m.channel.send("```Pong! The bot's ping time is "+Math.round(bot.ping)+"ms.```")
		}
    },
    
    hello: {
		description: "Say Hello!",
		run: function(m) {
			m.channel.send("```Hello!```");
		}
    },
    
    "8ball": {
		description: "Make a decision",
		items: ["Yes", "No", "Maybe", "Definitely", "Probably", "Probably Not", "Try Again"],
		run: function(m) {
			var item = this.items[Math.floor(Math.random() * this.items.length)];
			m.channel.send("```"+item+"```");
		}
    },

	flip: {
		description: "Flip a coin",
		headstails: ["Heads", "Tails"],
		run: function(m) {
			var ht = this.headstails[Math.floor(Math.random() * this.headstails.length)];
			m.channel.send("```"+ht+"```");
		}
    },

    howsmart: {
		desciption: "Determines how smart you are.",
		function(m) {
			var name = (m.mentions.users.first() || m.author).username;
			m.channel.send("```" + name + " is "+(Math.round(Math.random()*100)) +"% smart.```");
		}
    },
    
	say: {
		description: "Says anything you want!",
		run: function(m, t) {
			m.channel.send("```" + t + "```");
		}
	},
    
    poll: {
		description: "Opens a reaction poll.",
		run: function(m, t) {
			t = t||"Please submit a vote."
			m.channel.send("```" + t + "```")
				.then(s => s.react("👍").then(_ => s.react("👎")))
		}
    },
    
    npoll: {
		description: "Poll command, but with numbers.", 
		run: function(m, t) {
			t = t || "Please submit a vote."
			m.channel.send("```" + t + "```")
				.then(s => s.react(emojiCharacters[1]).then(() => s.react(emojiCharacters[2])))
		}
    },

	toggle: {
		state: false,
		run: function(m) {
			if (state) {
				for (n in othercommands)
					commands[n] = undefined;
			} else {
				for (n in othercommands)
					commands[n] = othercommands[n]
			}
			state = !state
		}
	},
	
	disable: function(m, t) {
		var cmd = commands[t]
		if (typeof(cmd) === "object" && typeof(cmd.run) === "function") {
			cmd.disabled = true;
		}
	},
	
	enable: function(m, t) {
		var cmd = commands[t]
		if (typeof(cmd) === "object" && typeof(cmd.run) === "function") {
			cmd.disabled = false;
		}
	}
}

othercommands = {
	boo: {
		description: "Says boo.",
		run: function(m) {
			m.channel.send("You asked for it: BOO!")
		}
	}
}

function makeHelp() {
    var res = "Help:\n    Command prefix: " + cmdprefix 
    for (n in commands) {
		var cmd = commands[n]
		if (typeof(cmd) === "object" && !!cmd.description) {
            res += "\n    " + n + " - " + cmd.description
        }
    }
    return res
}

bot.on('message', message => {
    if (message.author.bot) return;
    
    if (message.content.startsWith(":")) {
        console.log("@"+message.author.username+" in #"+message.channel.name+": "+message.content.substr(1)+" ["+Math.round(bot.ping)+"ms]")
    }
    
    if (!message.content.toLowerCase().startsWith(cmdprefix)) return;
    var cmd = message.content.substr(cmdprefix.length).trim();
    
    // Split command into name and parameters
    var parts = cmd.match(/^([^ ]+)(?: (.+))?$/)
    var cmdName = parts[1].toLowerCase()
    var cmdParams = parts[2]
    
    // Find command in commands table
    var cmdFunc = commands[cmdName]
    if (typeof(cmdFunc) === "function") {
        cmdFunc(message, cmdParams)
	} else if (typeof(cmdFunc) === "object" && typeof(cmdFunc.run) === "function" && !cmdFunc.disabled) {
		cmdFunc.run(message, cmdParams);
	} else {
        message.channel.send("```Unknown command: '" + cmdName + "'```");
	}
})
 

bot.login(token);
