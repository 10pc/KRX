import { SlashCommandBuilder } from '@discordjs/builders';

const topCommand = new SlashCommandBuilder()
    .setName('top')
    .setDescription('must have a minimum of 5 top plays before you can use this command')
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

export default topCommand.toJSON();