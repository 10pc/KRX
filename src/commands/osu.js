import { SlashCommandBuilder } from '@discordjs/builders';

const osuCommand = new SlashCommandBuilder()
    .setName('osu')
    .setDescription('view profile')
    .addStringOption((option) =>
      option
        .setName('username')
        .setDescription('your name')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('mode')
        .setDescription('your mode')
        .setRequired(true)
        .addChoices(
          { name: 'std', value: '0' },
          { name: 'taiko', value: '1' },
          { name: 'catch', value: '2' },
        )
    )

export default osuCommand.toJSON();