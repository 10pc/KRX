import { SlashCommandBuilder } from '@discordjs/builders';

const helpCommand = new SlashCommandBuilder()
    .setName('help')
    .setDescription('help plz')

export default helpCommand.toJSON();