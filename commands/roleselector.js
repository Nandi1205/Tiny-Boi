const {ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js')
const error = require('../functions/error.js')
const hasSendPerms = require('../functions/has-send-perms.js')
const makeEmbed = require('../functions/make-embed.js')

module.exports = (interaction) => {
  if (!hasSendPerms(interaction, interaction.channel)) return

  //////////

  const TITLE = interaction.options.getString('title')

  if (TITLE.length > 256) return error(interaction, 'Your title is longer than 256 characters. Try using a shorter title.')

  //////////

  const ROLE_IDS = interaction.options.getString('roles').replaceAll('<@&', '').replaceAll('>', '').split('\\n')
  let selectMenuOptions = []
  let rolesString = ''

  for (let roleId of ROLE_IDS) {
    roleId = roleId.trim()
    const ROLE = interaction.guild.roles.cache.get(roleId)

    if (ROLE === undefined) continue

    rolesString += '<@&' + roleId + '>\n'
    selectMenuOptions.push({label: ROLE.name, value: roleId})
  }

  if (rolesString === '') return error(interaction, 'No valid roles submitted. Check your input then try again.')

  //////////

  const MULTISELECT = interaction.options.getBoolean('multiselect') ?? false

  interaction.channel.send({
    embeds: [
      makeEmbed()
      .setTitle(TITLE)
      .setDescription(rolesString)
    ],
    components: [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
        .setCustomId('roleselector')
        .setPlaceholder(MULTISELECT ? 'Select one or more roles.' : 'Select a role.')
        .setMinValues(0)
        .setMaxValues(MULTISELECT ? selectMenuOptions.length : 1)
        .addOptions(selectMenuOptions)
      )
    ]
  })
  interaction.reply({
    embeds: [
      makeEmbed()
      .setTitle('📦 Roleselector')
      .setDescription('Roleselector successfully set up. Wait a bit for it to show up.')
    ],
    ephemeral: true
  })
}