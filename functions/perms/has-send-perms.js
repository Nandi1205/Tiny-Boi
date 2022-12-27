const {PermissionFlagsBits} = require('discord.js')
const error = require('../error.js')

module.exports = (interaction, channel) => {
  const BOT_PERMS = channel.permissionsFor(interaction.guild.members.me)

  if (!BOT_PERMS.has(PermissionFlagsBits.ViewChannel)) return error(interaction, "I can't see this channel so I couldn't complete the action.")
  else if (!BOT_PERMS.has(PermissionFlagsBits.SendMessages)) return error(interaction, "I can't send messages in this channel so I couldn't complete the action.")
  else if (!BOT_PERMS.has(PermissionFlagsBits.EmbedLinks)) return error(interaction, "I can't embed links in this channel so I couldn't complete the action.")
  else return true
}