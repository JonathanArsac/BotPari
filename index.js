const Discord = require('discord.js');
const bot = new Discord.Client({
	fetchAllMembers:true
});
const config = require("./config.json");
const fs = require("fs");


//Toutes les actions à faire quand le bot se connecte
bot.on("ready", function () {
    console.log("Mon BOT est Connecté");
});


// Récupère toutes les commandes
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir('./commands',(err,files)=>{
	if (err) throw err;
	files.forEach(file => {
		if(!file.endsWith(".js")) return ;
		const command = require(`./commands/${file}`);
		bot.commands.set(command.help.name,command);
		command.help.aliases.forEach(alias => {
			bot.aliases.set(alias,command.help.name);
		})
	})
});



// Répondre à une commande
bot.on("message", message => {
	if(message.type !== 'DEFAULT' || message.author.bot || (message.channel != "815528044197445653" && message.channel != "814224263774470175" && message.channel != "711935305954885723")) return ;

	if(!message.content.startsWith(config.prefix)) return;
	const args = message.content.trim().split(/ +/g);
	//console.log(args);
	const commandName = args.shift().toLowerCase().slice(config.prefix.length);
	//console.log(commandName);
	let command;
	if(bot.commands.has(commandName)){
		command = bot.commands.get(commandName);
	}else if (bot.aliases.has(commandName)){
		command = bot.commands.get(bot.aliases.get(commandName));
	}
	
	if(!command) return message.reply(`Commande inconnue :/ \n Pour savoir ce que peut faire le bot, tape <3h !`);;
	try{
		command.run(bot,message,args);
	} catch (e) {
		return;
	}
   
});

bot.on('guildMemberAdd', member => {
	member.guild.channels.cache.get(config.greeting.channel).send(`${member} est devenu un esclave de plus pour Thomas ! 🤫`);
	member.roles.add(config.greeting.role);
})

bot.login(config.token);
