const {PermissionsBitField} = require('discord.js')

module.exports = (interaction, channel) => {
  const BOT_PERMS = channel.permissionsFor(interaction.guild.members.me)

  if (!BOT_PERMS.has(PermissionsBitField.Flags.ViewChannel)) return false
  else if (!BOT_PERMS.has(PermissionsBitField.Flags.SendMessages)) return false
  else if (!BOT_PERMS.has(PermissionsBitField.Flags.EmbedLinks)) return false
  else return true
}