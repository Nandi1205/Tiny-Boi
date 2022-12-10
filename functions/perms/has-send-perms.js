const {PermissionsBitField} = require('discord.js')
const error = require('../error.js')

module.exports = (interaction, channel) => {
  const BOT_PERMS = channel.permissionsFor(interaction.guild.members.me)

  if (!BOT_PERMS.has(PermissionsBitField.Flags.ViewChannel)) return error(interaction, "I can't see this channel so I couldn't complete the action.")
  else if (!BOT_PERMS.has(PermissionsBitField.Flags.SendMessages)) return error(interaction, "I can't send messages in this channel so I couldn't complete the action.")
  else if (!BOT_PERMS.has(PermissionsBitField.Flags.EmbedLinks)) return error(interaction, "I can't send messages in this channel so I couldn't complete the action.")
  else return true
}