const {PermissionsBitField} = require('discord.js')
const error = require('../functions/error.js')
const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  const BOT_PERMS = interaction.channel.permissionsFor(interaction.guild.members.me)

  if (!BOT_PERMS.has(PermissionsBitField.Flags.ViewChannel)) return error(interaction, "I can't see this channel so I couldn't send the announcement.")
  if (!BOT_PERMS.has(PermissionsBitField.Flags.SendMessages)) return error(interaction, "I can't send messages in this channel so I couldn't send the announcement.")
  if (!BOT_PERMS.has(PermissionsBitField.Flags.EmbedLinks)) return error(interaction, "I can't send embeds in this channel so I couldn't send the announcement.")

  interaction.channel.send({
    embeds: [
      makeEmbed()
      .setTitle(interaction.options.getString('title'))
      .setDescription(interaction.options.getString('message').replaceAll('\\n', '\n'))
    ]
  })
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle('📢 Announce')
      .setDescription('Announcement successfully sent. Wait a bit for it to show up.')
    ],
    ephemeral: true
  })
}