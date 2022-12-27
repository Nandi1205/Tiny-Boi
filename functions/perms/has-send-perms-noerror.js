const {PermissionFlagsBits} = require('discord.js')

module.exports = (interaction, channel) => {
  const BOT_PERMS = channel.permissionsFor(interaction.guild.members.me)

  if (!BOT_PERMS.has(PermissionFlagsBits.ViewChannel)) return false
  else if (!BOT_PERMS.has(PermissionFlagsBits.SendMessages)) return false
  else if (!BOT_PERMS.has(PermissionFlagsBits.EmbedLinks)) return false
  else return true
}