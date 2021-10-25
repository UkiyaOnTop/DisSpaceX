const { MessageEmbed } = require('discord.js');
const delay = require('delay');

module.exports = { 
    config: {
        name: "flanger",
        description: "Makes sound bot so weird",
        category: "filters",
        accessableby: "Member",
        aliases: ["fg"]
    },
    run: async (client, message) => {
        const msg = await message.channel.send("Processing...")
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send("You need to be in a voice channel to play music.");

        const permissions = channel.permissionsFor(client.user);
        if (!permissions.has("CONNECT")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");
        if (!permissions.has("SPEAK")) return message.channel.send("I cannot connect to your voice channel, make sure I have permission to!");

        const queue = client.distube.getQueue(message)
        if (!queue) msg.edit(`There is nothing in the queue right now!`)
        client.distube.setFilter(message, "flanger")

        const embed = new MessageEmbed()
            .setAuthor('Turned on: Flanger', 'https://cdn.discordapp.com/emojis/758423098885275748.gif')
            .setColor('#000001');

        await delay(5000);
        msg.edit('', embed)
    }
}; /// testing version