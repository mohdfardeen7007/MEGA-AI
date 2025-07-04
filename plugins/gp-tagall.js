let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`͏📜︩︪ 𝐆𝗋ⱺυρ : *${groupMetadata.subject}*\n\n🌖︩︪𝐌𝖾ꭑᑲ𝖾𝗋𝗌 : *${participants.length}*${text ? `\n🌟𝂄𝐌𝖾𝗌𝗌α𝗀𝖾 : ${text}\n` : ''}\n\n͏██  ͏██ ͏ ͏. 𝐓ꭤ̱ꬶꤦᥣі𝗌̱𝗍 .  ͏██ ͏ ͏██ ͏\n` + users.map(v => '🥮ᩧᩙᩪᩩ̶̷ ㅤ ͟ ͟ ͟ ͟  @' + v.replace(/@.+/, '')).join`\n` + '\n *ׅ ׄ𖫑ᩞ ፝֟᷼͡ 𖫑ᩞ ׄ ׅ- Ɗყi̫ɳ𝐠 i̫ɳຮi̫d͟͟͠ᥱ , Տ𑜀i̫ᥣi̫ɳ𝐠 𑄝ׁ𝐮t͟ຮi̫d͟͟͠ᥱ. 𝗹̶͟🌙᪶ 𝆬 ׅ ꒱* ', null, {
        mentions: users
    })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['tagall']
handler.admin = false
handler.group = true

export default handler
