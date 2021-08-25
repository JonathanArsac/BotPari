const Discord = require("discord.js");
const money = require("../money.json");
const fs = require("fs");
const ms = require("parse-ms");
const cooldownsRSA = require("../cooldownsRSA.json");

module.exports.run = async (bot, message, args) => {
    let timeout = 304950;
    let reward = 100;

    let embed = new Discord.MessageEmbed();
    embed.setTitle(" RSA ");
    // si le mec a pas de compte
    if(!money[message.author.id]){
        money[user.id] = {
            name : bot.users.cache.get(user.id).tag,
            money : reward
        }
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });

        
        cooldownsRSA[message.author.id] = {
            name : bot.users.cache.get(message.author.id).tag,
            daily : Date.now()
        }
        fs.writeFile("./cooldownsRSA.json", JSON.stringify(cooldownsRSA), (err) => {
            if (err) console.log(err);
        });
            

        embed.setDescription(`T'as reçu ton RSA frérot de ${reward} cailloux. Il te reste ${money[message.author.id].money}. `);
        embed.setColor("00ff00");
        return message.channel.send(embed);
    // si le mec a déjà un compte
    }else {
        // si il a jamais eu de RSA
        if(!cooldownsRSA[message.author.id]){
            cooldownsRSA[message.author.id] = {
                name : bot.users.cache.get(message.author.id).tag,
                daily : Date.now()
            }
            fs.writeFile("./cooldownsRSA.json", JSON.stringify(cooldownsRSA), (err) => {
                if (err) console.log(err);
            });
            
            money[message.author.id].money += reward;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if (err) console.log(err);
            });
            embed.setDescription(`T'as reçu ton RSA frérot de ${reward} cailloux. Il te reste ${money[message.author.id].money}. `);
            embed.setColor("00ff00");
            return message.channel.send(embed);
        // si il a déjà eu le rsa
        }else{
            if (timeout - (Date.now() - cooldownsRSA[message.author.id].daily) > 0 ){
                let  time = ms(timeout-(Date.now() - cooldownsRSA[message.author.id].daily));
                embed.setDescription(`T'as déjà reçu ton RSA frérot aujourd'hui.`);
                embed.addField(`Regarde d'ici `,`**${time.hours}h ${time.minutes}m ${time.seconds}s **`);
                embed.setColor("ff0000");
                return message.channel.send(embed);
            }else{
                money[message.author.id].money += reward;
                fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                    if (err) console.log(err);
                });
                cooldownsRSA[message.author.id].daily = Date.now();
                fs.writeFile("./cooldownsRSA.json", JSON.stringify(cooldownsRSA), (err) => {
                if (err) console.log(err);
                });
                embed.setDescription(`T'as reçu ton RSA frérot de ${reward} cailloux. Il te reste ${money[message.author.id].money}. `);
                embed.setColor("00ff00");
                 return message.channel.send(embed);

            }
           
        }
    }

}



module.exports.help = {
    name : "rsa",
    aliases : []
}