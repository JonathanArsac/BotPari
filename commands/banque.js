const fs = require("fs");
const money = require("../money.json");

module.exports.run = async (bot,message,args) => {

    if(!args[0]){
        var user = message.author;
    } else{
        var user = message.mentions.users.first() || bot.users.cache.get(args[0]);
    }
    if(user === undefined){
        return;
    }
    if(!money[user.id]){
        money[user.id] = {
            name : bot.users.cache.get(user.id).tag,
            money : 0
        }
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });
    }

    return message.channel.send(`${bot.users.cache.get(user.id).username} possède ${money[user.id].money } caillou(x) `)
}

module.exports.help = {
    name : "banque",
    aliases : ["b"]
}