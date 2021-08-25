function test(message){
   
    message.channel.send("Le dieu des bots a décidé de te ban, il te reste trois secondes parmi nous");

    setTimeout(() =>{ message.channel.send("3...").then((msg)=>{
        setTimeout(() => { msg.edit("3...2...") }, 2000);
        setTimeout(() => { msg.edit("3...2...1...") }, 4000);
    })},1000);
    setTimeout(() => { message.channel.send("C'est long hein... ") }, 8000);
    setTimeout(() => { message.channel.send("PRANKED").then((msg)=>{
        msg.react('700693273118900368');
    })}, 9000);
}

module.exports = {
	run : message => test(message),
	name : "ban"
}