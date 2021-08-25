const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
    
        message.channel.send(new Discord.MessageEmbed()
        .setTitle("Commandes avec préfixe <3")
        .setDescription("Commande 1 : Banque => Retourne votre solde \n"+
         "Commande 2 : Pari [montant] => Pile ou face de votre montant \n"+
        "Commande 3 : RSA => Donne un peu de cailloux toutes les 5 minutes "));
       

}



module.exports.help = {
    name : "help",
    aliases : ["h"]
}