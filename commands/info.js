const packageJSON = require('../package.json')
const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  const GITHUB_LINK = 'https://github.com/Nandi1205/TinyBoi'
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle(':notepad_spiral: Info')
      .setDescription(`About: *${packageJSON.description}*\nVersion: *${packageJSON.version}*\nDeveloper: *${packageJSON.author}*\nGitHub: *[GitHub](${GITHUB_LINK})*`)
    ],
    ephemeral: interaction.options.getBoolean('private') ?? false
  })
}