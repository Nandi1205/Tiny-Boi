const hasSendPermsNoerror = require('../functions/perms/has-send-perms-noerror.js')
const hasSendPerms = require('../functions/perms/has-send-perms.js')
const error = require('../functions/error.js')
const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  if (!hasSendPerms(interaction, interaction.channel)) return

  //////////

  const TITLE = interaction.options.getString('title')
  if (TITLE.length > 256) return error(interaction, 'Your title is longer than 256 characters. Try using a shorter title.')

  const WAIT_INPUT = interaction.options.getInteger('wait')
  if (WAIT_INPUT >= 1000) return error(interaction, 'The wait time is over 1000 minutes. Try inputting fewer minutes.')

  const DATE = new Date()
  const WAIT_SECONDS = (60 - DATE.getSeconds()) + (59 - DATE.getMinutes() + WAIT_INPUT) * 60

  //////////

  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle('⏰ Timed Announce')
      .setDescription(`Announcement successfully set up. Wait ${Math.ceil(WAIT_SECONDS / 60)} minutes for it to show up. If the message doesn't send, it means that I don't have my necessary permissions.`)
    ],
    ephemeral: true
  })

  setTimeout(() => {
    if (!hasSendPermsNoerror(interaction, interaction.channel)) return

    interaction.channel.send({
      embeds: [
        makeEmbed()
        .setTitle(TITLE)
        .setDescription(interaction.options.getString('message').replaceAll('\\n', '\n'))
      ]
    })
  }, WAIT_SECONDS * 1000)
}