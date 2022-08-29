import { Client, GatewayIntentBits, Routes, EmbedBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import axios from 'axios';
import osu from 'ojsama';

import osuCommand from './commands/osu.js';
import rsCommand from './commands/rs.js';
import helpCommand from './commands/help.js';
import topCommand from './commands/top.js';

const TOKEN = process.env.TOKEN
const CLIENT_ID = '1007994528373952553'
const GUILD_DEV = '1007995658499788810'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.login(TOKEN);

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {console.log(`${client.user.username} says hi`)});

client.on('interactionCreate', (interaction) => {
  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === 'osu') {
      const name = interaction.options.get('username').value;
      const mode = interaction.options.get('mode').value;
      
      if (mode === '0') {
        axios.get(`https://kawata.pw/api/v1/users/full?name=${name}&relax=1`)
          .then(function (response) {
  
            const username = response.data.username
            const country = response.data.country;
            const pp = response.data.std.pp;
            let rank = response.data.std.global_leaderboard_rank;
            rank = rank === null ? 0 : rank;
            
            const id = response.data.id;
            const rscore = response.data.std.ranked_score;
            const acc = response.data.std.accuracy;
            const pcount = response.data.std.playcount;
            const rwatched = response.data.std.replays_watched;
            const level = response.data.std.level;
            const ptime = response.data.std.play_time;
  
            //join date
            let joined = response.data.registered_on;
            const joinedsplit = joined.split("T");
            let date = joinedsplit[0];
            const yearago = date.split("-");
            var now = new Date();
            var ynow = now.getFullYear();
            var yjoin = yearago[0];
            const today = ynow - yjoin;
  
            //playtime
            function padTo2Digits(num) {
              return num.toString().padStart(2, '0');
            }
            
            function convert(seconds) {
              let minutes = Math.floor(seconds / 60);
              let hours = Math.floor(minutes / 60);
              let days = Math.floor(hours / 24);
            
              minutes = minutes % 60;
              hours = hours % 24
            
              return `${padTo2Digits(days)}d ${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
            }
            
            const profileEmbed = new EmbedBuilder()
            	.setColor(0x0099FF)
            	.setTitle('<:stdicon:1013094083364917340> __Statistics__')
            	.setAuthor({ name: `${username} | ${pp.toLocaleString()}pp  (#${rank})`, iconURL: `https://countryflagsapi.com/png/${country}`, url: `https://kawata.pw/u/${id}` })
            	.addFields(
            		{ name: '**Ranked Score**', value: `${rscore.toLocaleString()}`, inline: true },
            		{ name: '**Accuracy**', value: `${acc.toFixed(2)}%`, inline: true },
                { name: '**Playcount**', value: `${pcount.toLocaleString()}`, inline: true },
            		{ name: '**Playtime**', value: `${convert(ptime)}`, inline: true },
            		{ name: '**Level**', value: `${level.toFixed(2)}`, inline: true },
                { name: '**Replays Watched**', value: `${rwatched.toLocaleString()}`, inline: true },
            	)
            	.setThumbnail(`https://a.kawata.pw/${id}?0`)
            	.setFooter({ text: `Joined Kawata, ${joinedsplit[0]} (About ${today} year(s) ago)` });
            
            interaction.reply({ embeds: [profileEmbed] });
          })
      }

      if (mode === '1') {
        axios.get(`https://kawata.pw/api/v1/users/full?name=${name}&relax=1`)
          .then(function (response) {
  
            const username = response.data.username
            const country = response.data.country;
            const pp = response.data.taiko.pp;
            let rank = response.data.taiko.global_leaderboard_rank;
            rank = rank === null ? 0 : rank;
            
            const id = response.data.id;
            const rscore = response.data.taiko.ranked_score;
            const acc = response.data.taiko.accuracy;
            const pcount = response.data.taiko.playcount;
            const rwatched = response.data.taiko.replays_watched;
            const level = response.data.taiko.level;
            const ptime = response.data.taiko.play_time;
  
            //join date
            let joined = response.data.registered_on;
            const joinedsplit = joined.split("T");
            let date = joinedsplit[0];
            const yearago = date.split("-");
            var now = new Date();
            var ynow = now.getFullYear();
            var yjoin = yearago[0];
            const today = ynow - yjoin;
  
            //playtime
            function padTo2Digits(num) {
              return num.toString().padStart(2, '0');
            }
            
            function convert(seconds) {
              let minutes = Math.floor(seconds / 60);
              let hours = Math.floor(minutes / 60);
              let days = Math.floor(hours / 24);
            
              minutes = minutes % 60;
              hours = hours % 24
            
              return `${padTo2Digits(days)}d ${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
            }
            
            const profileEmbed = new EmbedBuilder()
            	.setColor(0x0099FF)
            	.setTitle('<:taikoicon:1013094086326104145> __Statistics__')
            	.setAuthor({ name: `${username} | ${pp.toLocaleString()}pp  (#${rank})`, iconURL: `https://countryflagsapi.com/png/${country}`, url: `https://kawata.pw/u/${id}` })
            	.addFields(
            		{ name: '**Ranked Score**', value: `${rscore.toLocaleString()}`, inline: true },
            		{ name: '**Accuracy**', value: `${acc.toFixed(2)}%`, inline: true },
                { name: '**Playcount**', value: `${pcount.toLocaleString()}`, inline: true },
            		{ name: '**Playtime**', value: `${convert(ptime)}`, inline: true },
            		{ name: '**Level**', value: `${level.toFixed(2)}`, inline: true },
                { name: '**Replays Watched**', value: `${rwatched.toLocaleString()}`, inline: true },
            	)
            	.setThumbnail(`https://a.kawata.pw/${id}?0`)
            	.setFooter({ text: `Joined Kawata, ${joinedsplit[0]} (About ${today} year(s) ago)` });
            
            interaction.reply({ embeds: [profileEmbed] });
          })
      }

      if (mode === '2') {
        axios.get(`https://kawata.pw/api/v1/users/full?name=${name}&relax=1`)
          .then(function (response) {
  
            const username = response.data.username
            const country = response.data.country;
            const pp = response.data.ctb.pp;
            let rank = response.data.ctb.global_leaderboard_rank;
            rank = rank === null ? 0 : rank;
            
            const id = response.data.id;
            const rscore = response.data.ctb.ranked_score;
            const acc = response.data.ctb.accuracy;
            const pcount = response.data.ctb.playcount;
            const rwatched = response.data.ctb.replays_watched;
            const level = response.data.ctb.level;
            const ptime = response.data.ctb.play_time;
  
            //join date
            let joined = response.data.registered_on;
            const joinedsplit = joined.split("T");
            let date = joinedsplit[0];
            const yearago = date.split("-");
            var now = new Date();
            var ynow = now.getFullYear();
            var yjoin = yearago[0];
            const today = ynow - yjoin;
  
            //playtime
            function padTo2Digits(num) {
              return num.toString().padStart(2, '0');
            }
            
            function convert(seconds) {
              let minutes = Math.floor(seconds / 60);
              let hours = Math.floor(minutes / 60);
              let days = Math.floor(hours / 24);
            
              minutes = minutes % 60;
              hours = hours % 24
            
              return `${padTo2Digits(days)}d ${padTo2Digits(hours)}h ${padTo2Digits(minutes)}m`;
            }
            
            const profileEmbed = new EmbedBuilder()
            	.setColor(0x0099FF)
            	.setTitle('<:ctbicon:1013094077539029032> __Statistics__')
            	.setAuthor({ name: `${username} | ${pp.toLocaleString()}pp  (#${rank})`, iconURL: `https://countryflagsapi.com/png/${country}`, url: `https://kawata.pw/u/${id}` })
            	.addFields(
            		{ name: '**Ranked Score**', value: `${rscore.toLocaleString()}`, inline: true },
            		{ name: '**Accuracy**', value: `${acc.toFixed(2)}%`, inline: true },
                { name: '**Playcount**', value: `${pcount.toLocaleString()}`, inline: true },
            		{ name: '**Playtime**', value: `${convert(ptime)}`, inline: true },
            		{ name: '**Level**', value: `${level.toFixed(2)}`, inline: true },
                { name: '**Replays Watched**', value: `${rwatched.toLocaleString()}`, inline: true },
            	)
            	.setThumbnail(`https://a.kawata.pw/${id}?0`)
            	.setFooter({ text: `Joined Kawata, ${joinedsplit[0]} (About ${today} year(s) ago)` });
            
            interaction.reply({ embeds: [profileEmbed] });
          })
      }
    };

    if (interaction.commandName === 'rs') {
      const username = interaction.options.get('username').value;

      axios.get(`https://kawata.pw/api/v1/users/scores/recent?name=${username}&relax=1&l=1`)
        .then(function (response) {
          const score = response.data.scores[0].score;
          const max_combo = response.data.scores[0].max_combo;
          const n300 = response.data.scores[0].count_300;
          const n100 = response.data.scores[0].count_100;
          const n50 = response.data.scores[0].count_50;
          const miss = response.data.scores[0].count_miss;
          const acc = response.data.scores[0].accuracy;
          const pp = response.data.scores[0].pp;
          const scoreID = response.data.scores[0].id;

          let playedat = response.data.scores[0].time;
          const date = playedat.split("T");
          let timeat = date[1];
          const time = timeat.split("+");
          const play_mode = response.data.scores[0].play_mode;
          const mode = play_mode.toString().replace("0", "STANDARD").replace("1", "TAIKO").replace("2", "CATCH").replace("3", "MANIA");
          
          const rank = response.data.scores[0].rank;
          const grade = rank.toString().replace("A", "<:rankingA:1013334501847486484>").replace("B", "<:rankingB:1013334505123221586>").replace("C", "<:rankingC:1013334508218634311>").replace("D", "<:rankingD:1013334512685563917>").replace("S", "<:rankingS:1013334515957116940>").replace("SH", "<:rankingSH:1013334518603722807>").replace("X", "<:rankingX:1013334522160496680>").replace("XH", "<:rankingXH:1013334499058266182>");
          
          const mods_string = response.data.scores[0].mods;
          const mods = osu.modbits.string(mods_string);
          
          const ranked = response.data.scores[0].beatmap.ranked;
          const status = ranked.toString().replace("-2", "Unknown").replace("-1", "Unsubmitted").replace("0", "Pending").replace("1", "Needs Update").replace("2", "Ranked").replace("3", "Approved").replace("4", "Qualified").replace("5", "Loved")
          
          const id = response.data.scores[0].beatmap.beatmap_id;
          const setid = response.data.scores[0].beatmap.beatmapset_id;
          const song = response.data.scores[0].beatmap.song_name;
          const ar = response.data.scores[0].beatmap.ar;
          const od = response.data.scores[0].beatmap.od;
          const map_combo = response.data.scores[0].beatmap.max_combo;

          const rsEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setURL(`https://osu.ppy.sh/b/${id}`)
            .setTitle(`${song} +${mods}RX`)
            .setAuthor({ name: `Recent ${mode} score for ${username}` })
            .addFields(
              { name: '**Grade**', value: `${grade}`, inline: true },
              { name: '**Score**', value: `${score.toLocaleString()}`, inline: true },
              { name: '**Acc**', value: `${acc.toFixed(2)}%`, inline: true },
              { name: '**PP**', value: `${pp}pp`, inline: true },
              { name: '**Combo**', value: `**${max_combo}x**/${map_combo}x`, inline: true },
              { name: '**Hits**', value: `(${n300}/${n100}/${n50}/${miss})`, inline: true },
              { name: '**Map Info**', value: `Status: ${status}\nAR: ${ar}\nOD: ${od} `, inline: true },
            )
            .setImage(`https://assets.ppy.sh/beatmaps/${setid}/covers/cover.jpg`)
            .setFooter({ text: `Played at ${date[0]}, ${time[0]}` });
          
          interaction.reply({ embeds: [rsEmbed] });
        })
        
    };

    if (interaction.commandName === 'top') {
      const name = interaction.options.get('username').value;
      const mode = interaction.options.get('mode').value;
      
      axios.get(`https://kawata.pw/api/v1/users/scores/best?name=${name}&mode=${mode}&relax=1&l=5`)
        .then(function (response) {

          const score = [
            response.data.scores[0].score,
            response.data.scores[1].score,
            response.data.scores[2].score,
            response.data.scores[3].score,
            response.data.scores[4].score,
          ]

          const max_combo = [
            response.data.scores[0].max_combo,
            response.data.scores[1].max_combo,
            response.data.scores[2].max_combo,
            response.data.scores[3].max_combo,
            response.data.scores[4].max_combo,
          ]
            
          const n300 = [
            response.data.scores[0].count_300,
            response.data.scores[1].count_300,
            response.data.scores[2].count_300,
            response.data.scores[3].count_300,
            response.data.scores[4].count_300,
          ]
            
          const n100 = [
            response.data.scores[0].count_100,
            response.data.scores[1].count_100,
            response.data.scores[2].count_100,
            response.data.scores[3].count_100,
            response.data.scores[4].count_100,
          ]
            
          const n50 = [
            response.data.scores[0].count_50,
            response.data.scores[1].count_50,
            response.data.scores[2].count_50,
            response.data.scores[3].count_50,
            response.data.scores[4].count_50,
          ]
            
          const miss = [
            response.data.scores[0].count_miss,
            response.data.scores[1].count_miss,
            response.data.scores[2].count_miss,
            response.data.scores[3].count_miss,
            response.data.scores[4].count_miss,
          ]
            
          const acc = [
            response.data.scores[0].accuracy,
            response.data.scores[1].accuracy,
            response.data.scores[2].accuracy,
            response.data.scores[3].accuracy,
            response.data.scores[4].accuracy,
          ]
            
          const pp = [
            response.data.scores[0].pp,
            response.data.scores[1].pp,
            response.data.scores[2].pp,
            response.data.scores[3].pp,
            response.data.scores[4].pp,
          ]
          
          const rank = [
            response.data.scores[0].rank,
            response.data.scores[1].rank,
            response.data.scores[2].rank,
            response.data.scores[3].rank,
            response.data.scores[4].rank,
          ]
            
          /*rank[0-4].toString().replace("A", "<:rankingA:1013334501847486484>").replace("B", "<:rankingB:1013334505123221586>").replace("C", "<:rankingC:1013334508218634311>").replace("D", "<:rankingD:1013334512685563917>").replace("SH", "<:rankingSH:1013334518603722807>").replace("X", "<:rankingX:1013334522160496680>").replace("XH", "<:rankingXH:1013334499058266182>")*/
            
          const mods_string = [
            response.data.scores[0].mods,
            response.data.scores[1].mods,
            response.data.scores[2].mods,
            response.data.scores[3].mods,
            response.data.scores[4].mods,
          ]

          /*osu.modbits.string(mods_string[0-4])*/
            
          const id = [
            response.data.scores[0].beatmap.beatmap_id,
            response.data.scores[1].beatmap.beatmap_id,
            response.data.scores[2].beatmap.beatmap_id,
            response.data.scores[3].beatmap.beatmap_id,
            response.data.scores[4].beatmap.beatmap_id,
          ]
          
          const song = [
            response.data.scores[0].beatmap.song_name,
            response.data.scores[1].beatmap.song_name,
            response.data.scores[2].beatmap.song_name,
            response.data.scores[3].beatmap.song_name,
            response.data.scores[4].beatmap.song_name,
          ]
            
          const map_combo = [
            response.data.scores[0].beatmap.max_combo,
            response.data.scores[1].beatmap.max_combo,
            response.data.scores[2].beatmap.max_combo,
            response.data.scores[3].beatmap.max_combo,
            response.data.scores[4].beatmap.max_combo,
          ]

          const mode = interaction.options.get('mode').value.toString().replace("0", "STANDARD").replace("1", "TAIKO").replace("2", "CATCH").replace("3", "MANIA")

          const topEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({ name: `Top ${mode} plays for ${interaction.options.get('username').value}` })
            .addFields(
              {
                name: `**1. ${song[0]}** +${osu.modbits.string(mods_string[0])}RX`,
                value: ` • ${rank[0].toString().replace("A", "<:rankingA:1013334501847486484>").replace("B", "<:rankingB:1013334505123221586>").replace("C", "<:rankingC:1013334508218634311>").replace("D", "<:rankingD:1013334512685563917>").replace("SH", "<:rankingSH:1013334518603722807>").replace("X", "<:rankingX:1013334522160496680>").replace("XH", "<:rankingXH:1013334499058266182>")} • **${pp[0]}pp** • ${acc[0].toFixed(2)}%\n • ${score[0].toLocaleString()} • **${max_combo[0]}x**/${map_combo[0]}x • [${n300[0]}/${n100[0]}/${n50[0]}/${miss[0]}]`
              },
              {
                name: `**2. ${song[1]}** +${osu.modbits.string(mods_string[1])}RX`,
                value: ` • ${rank[1].toString().replace("A", "<:rankingA:1013334501847486484>").replace("B", "<:rankingB:1013334505123221586>").replace("C", "<:rankingC:1013334508218634311>").replace("D", "<:rankingD:1013334512685563917>").replace("SH", "<:rankingSH:1013334518603722807>").replace("X", "<:rankingX:1013334522160496680>").replace("XH", "<:rankingXH:1013334499058266182>")} • **${pp[1]}pp** • ${acc[1].toFixed(2)}%\n • ${score[1].toLocaleString()} • **${max_combo[1]}x**/${map_combo[1]}x • [${n300[1]}/${n100[1]}/${n50[1]}/${miss[1]}]`
              },
              {
                name: `**3. ${song[2]}** +${osu.modbits.string(mods_string[2])}RX`,
                value: ` • ${rank[2].toString().replace("A", "<:rankingA:1013334501847486484>").replace("B", "<:rankingB:1013334505123221586>").replace("C", "<:rankingC:1013334508218634311>").replace("D", "<:rankingD:1013334512685563917>").replace("SH", "<:rankingSH:1013334518603722807>").replace("X", "<:rankingX:1013334522160496680>").replace("XH", "<:rankingXH:1013334499058266182>")} • **${pp[2]}pp** • ${acc[2].toFixed(2)}%\n • ${score[2].toLocaleString()} • **${max_combo[2]}x**/${map_combo[2]}x • [${n300[2]}/${n100[2]}/${n50[2]}/${miss[2]}]`
              },
              {
                name: `**4. ${song[3]}** +${osu.modbits.string(mods_string[3])}RX`,
                value: ` • ${rank[3].toString().replace("A", "<:rankingA:1013334501847486484>").replace("B", "<:rankingB:1013334505123221586>").replace("C", "<:rankingC:1013334508218634311>").replace("D", "<:rankingD:1013334512685563917>").replace("SH", "<:rankingSH:1013334518603722807>").replace("X", "<:rankingX:1013334522160496680>").replace("XH", "<:rankingXH:1013334499058266182>")} • **${pp[3]}pp** • ${acc[3].toFixed(2)}%\n • ${score[3].toLocaleString()} • **${max_combo[3]}x**/${map_combo[3]}x • [${n300[3]}/${n100[3]}/${n50[3]}/${miss[3]}]`
              },
              {
                name: `**5. ${song[4]}** +${osu.modbits.string(mods_string[4])}RX`,
                value: ` • ${rank[4].toString().replace("A", "<:rankingA:1013334501847486484>").replace("B", "<:rankingB:1013334505123221586>").replace("C", "<:rankingC:1013334508218634311>").replace("D", "<:rankingD:1013334512685563917>").replace("SH", "<:rankingSH:1013334518603722807>").replace("X", "<:rankingX:1013334522160496680>").replace("XH", "<:rankingXH:1013334499058266182>")} • **${pp[4]}pp** • ${acc[4].toFixed(2)}%\n • ${score[4].toLocaleString()} • **${max_combo[4]}x**/${map_combo[4]}x • [${n300[4]}/${n100[4]}/${n50[4]}/${miss[4]}]`
              },
            )
            .setFooter({ text: `On Kawata!rx` });
            
          interaction.reply({ embeds: [topEmbed] });
        })
    };

    if (interaction.commandName === 'help') {

      const helpEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(':grey_question: __Help Page__')
        .addFields(
          { name: '\u200B', value: '`osu`: display profile\n`rs`: show recent score\n`help`: this' },
        )
        .setFooter({ text: `made by Tenpercent_`, iconURL: 'https://cdn.discordapp.com/avatars/808259533351682048/1dfb6bee4ba1759e8c9e1f5a29ff90e1.png' });
      
      interaction.reply({ embeds: [helpEmbed] });
    };
    
  };
});

async function main() {
  
  const commands = [osuCommand, rsCommand, helpCommand, topCommand];
  
  try {
    console.log('refreshing slash commands');
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_DEV), {
      body: commands,
    });
  } catch (err) {
    console.log(err);
  }
}

main();
