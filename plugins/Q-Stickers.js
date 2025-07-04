import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {

  try {

    // Step 1: Check if a search term is provided

    if (!text) {

      return m.reply(`Please provide a search term!\nExample: *${usedPrefix + command} funny*`);

    }

    // Step 2: Inform the user that we're searching for stickers

    await m.reply('🔍 Searching for stickers...');

    // Step 3: Fetch sticker data from the Tenor API

    const { data } = await axios.get(`https://g.tenor.com/v1/search?q=${text}&key=LIVDSRZULELA&limit=8`);

    // Step 4: Validate the data response from Tenor API

    if (!data || !data.results || !data.results[0] || !data.results[0].media) {

      return m.reply('*❌ Could not find any stickers for that search term!*');

    }

    // Step 5: Limit the number of results (max 5)

    const resultLimit = Math.min(data.results.length, 5);

    // Step 6: Send the stickers as video responses

    for (let i = 0; i < resultLimit; i++) {

      const stickerUrl = data.results[i].media[0].mp4.url;

      // Send the video using conn.sendMessage

      await conn.sendMessage(m.chat, {

        video: { url: stickerUrl },

        caption: `Sticker ${i + 1} for search term: *${text}*`,

        mimetype: 'video/mp4',

      });

    }

  } catch (error) {

    console.error('Error:', error);

    m.reply('❌ Something went wrong while searching for stickers. Please try again later.');

  }

};

handler.help = ['stickersearch', 'ssearch', 'stickers'];

handler.tags = ['tools'];

handler.command = ['stickersearch', 'ssearch', 'stickers'];

export default handler;
