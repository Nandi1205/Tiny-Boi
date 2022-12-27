const hasSendPerms = require('../functions/perms/has-send-perms.js')
const error = require('../functions/error.js')
const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  if (!hasSendPerms(interaction, interaction.channel)) return

  //////////

  const TITLE = interaction.options.getString('title')
  if (TITLE.length > 256) return error(interaction, 'Your title is longer than 256 characters. Try using a shorter title.')

  //////////

  const RULES = interaction.options.getString('rules').split('\\n')
  let rulesString = ''

  for (let i = 0; i < RULES.length; i++) {
    rulesString += `${i + 1}. ${RULES[i]}\n`
  }
  rulesString += '\n' + (interaction.options.getString('info')?.replaceAll('\\n', '\n') ?? '')

  if (rulesString.length > 4096) return error(interaction, 'After formatting, your input became longer than 4096 characters. Try sending a shorter command.')

  //////////

  interaction.channel.send({
    embeds: [
      makeEmbed()
      .setTitle(TITLE)
      .setDescription(rulesString)
    ]
  })
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle('📜 Rules')
      .setDescription('Rules successfully sent.')
    ],
    ephemeral: true
  })
}