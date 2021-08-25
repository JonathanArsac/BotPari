const Discord = require("discord.js");
const money = require("../money.json");
const fs = require("fs");


module.exports.run =  (bot, message, args) => {

    
    if(!money[message.author.id] || money[message.author.id].money <= 0) return message.reply("T'as pas d'argent en fait.");

    if(!args[0]) return message.reply("T'as pas mis ce que tu voulais parier");


    try{
        var bet = parseFloat(args[0]);
    }catch{
        return message.reply("T'as pas mis un truc possible à parier en fait");
    }

    if(bet != Math.floor(bet)) return message.reply("Je t'ai dit ou pas qu'il faut mettre un truc entier ? ");
    if (bet ==0) return message.reply(" T'as cru que tu pouvais rien miser radin va ");
    if(money[message.author.id].money < bet ) return message.reply(`T'as cru qu'on faisait crédit ? T'as que ${money[message.author.id].money} cailloux`);
    let chances = ["win","lose"];
    var pick = chances[Math.floor(Math.random()*chances.length)];
    

    if(pick=="lose"){
        money[message.author.id].money -= bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });
        return message.reply(`T'as perdu CHEH ! Il te reste plus que ${money[message.author.id].money} cailloux`);
    }else{
        money[message.author.id].money += bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if (err) console.log(err);
        });
        return message.reply(`T'as gagné pour une fois ! Il te reste que ${money[message.author.id].money} cailloux `);
    }
}

module.exports.help = {
    name : "pari",
    aliases : ["p"]
}