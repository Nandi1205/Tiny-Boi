const hasSendPerms = require('../functions/perms/has-send-perms.js')
const error = require('../functions/error.js')
const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  if (!hasSendPerms(interaction, interaction.channel)) return

  //////////

  const TITLE = interaction.options.getString('title')
  if (TITLE.length > 256) return error(interaction, 'Your title is longer than 256 characters. Try using a shorter title.')

  //////////

  interaction.channel.send({
    embeds: [
      makeEmbed()
      .setTitle(TITLE)
      .setDescription(interaction.options.getString('message').replaceAll('\\n', '\n'))
    ]
  })
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle('📢 Announce')
      .setDescription('Announcement successfully sent.')
    ],
    ephemeral: true
  })
}