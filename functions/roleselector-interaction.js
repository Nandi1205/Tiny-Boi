const hasRolePerms = require('../functions/perms/has-role-perms.js')
const makeEmbed = require('../functions/make-embed.js')

module.exports = async (interaction) => {
  if (!hasRolePerms(interaction, interaction.channel)) return

  //////////

  const ROLESELECTOR_IDS = interaction.message.embeds[0].description.replaceAll('<@&', '').replaceAll('>', '').split('\n')
  const SELECTED_IDS = interaction.values
  let memberIds = interaction.member.roles.cache.filter((roles) => roles.id !== interaction.guild.id).map((role) => role.id)
  let roleChangesString = ''

  for (const ROLESELECTOR_ID of ROLESELECTOR_IDS) {
    const ROLESELECTOR_ROLE = interaction.guild.roles.cache.get(ROLESELECTOR_ID)

    if (ROLESELECTOR_ROLE === undefined || interaction.guild.members.me.roles.botRole.comparePositionTo(ROLESELECTOR_ROLE) < 0) continue

    if (memberIds.includes(ROLESELECTOR_ID) && !SELECTED_IDS.includes(ROLESELECTOR_ID)) {
      //Remove role
      memberIds.splice(memberIds.indexOf(ROLESELECTOR_ID), 1)
      roleChangesString += '- @' + ROLESELECTOR_ROLE.name + '\n'
    } else if (!memberIds.includes(ROLESELECTOR_ID) && SELECTED_IDS.includes(ROLESELECTOR_ID)) {
      //Add role
      memberIds.push(ROLESELECTOR_ID)
      roleChangesString += '+ @' + ROLESELECTOR_ROLE.name + '\n'
    }
  }

  let embed = makeEmbed().setTitle('📦 Roleselector')

  if (roleChangesString === '') {
    interaction.reply({
      embeds: [
        embed.setDescription('Nothing changed.')
      ],
      ephemeral: true
    })

    return
  }

  //////////

  await interaction.member.roles.set(memberIds)

  interaction.reply({
    embeds: [
      embed.setDescription('Changed roles: ```diff\n' + roleChangesString + '```')
    ],
    ephemeral: true
  })
}