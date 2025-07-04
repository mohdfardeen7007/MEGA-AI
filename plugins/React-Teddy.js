let teddyM = {}; // To track users who already received the teddy message

let handler = async (m, { conn, text, usedPrefix, command }) => {

  try {

    // Ensure 'm.chat' is valid (the chat ID)

    if (!m.chat) {

      console.error('Invalid chat ID (m.chat is undefined)');

      return m.reply('❌ Something went wrong. Please try again later.');

    }

    // Check if the message includes the keyword "teddy"

    let isteddy = command === "teddy" || (m.text.toLowerCase().includes("teddy") && m.isPublic);

    

    if (isteddy && !teddyM[m.sender]) {

      teddyM[m.sender] = true;

      // Array of cute symbols to send

      let teddy = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈'];

      // Send the initial message

      let pingMsg = await m.reply(`(\\_/)\n( •.•)\n/>🤍`);

      // Wait before starting the emoji updates

      for (let i = 0; i < teddy.length; i++) {

        await sleep(500); // Wait 500ms between each emoji update

        

        // Use 'relayMessage' to edit the original message with new emoji

        await conn.relayMessage(

          m.chat,

          {

            protocolMessage: {

              key: pingMsg.key,

              type: 14,  // Edit message type

              editedMessage: {

                conversation: `(\\_/)\n( •.•)\n/>${teddy[i]}`, // New emoji update

              },

            },

          },

          {}

        );

      }

      // Reset the user’s state after sending all symbols

      delete teddyM[m.sender];

    }

  } catch (error) {

    console.error('Error in teddy module:', error);

    m.reply('❌ Something went wrong while sending the teddy emojis. Please try again later.');

  }

};

// Sleep function to delay the message replies

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Define the module's metadata

handler.help = ['teddy'];  // This command shows up as 'teddy'

handler.tags = ['fun'];    // This command belongs to the "fun" category

handler.command = /^teddy$/i;  // This regex matches the "teddy" command

// Export the handler module

export default handler;
