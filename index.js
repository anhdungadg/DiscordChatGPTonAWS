// import dotenv from 'dotenv'
// dotenv.config()

// 2


import express from 'express';
import http from 'http';
const app = express();
const router = express.Router();

// app.use(express.urlencoded({ extended: false }));
// app.use('/healthcheck', import('./healthchecker'));
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, console.log("Server has started at port " + PORT));
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

// router.get('/health', (req, res) => {
//     res.status(200).send('Ok');
// });
router.get('/', (req, res) => {
    console.log(process.env);
    var strBuilder = ""
    Object.keys(process.env).forEach(key => {
        console.log(key, process.env[key]);
        strBuilder += key + "\t" + process.env[key] + "\r\n\n";
    });
    res.status(200).send('Mingalaba\n\n' + strBuilder);
});

app.use('/', router);

const server = http.createServer(app);
server.listen(8080);



// import { Client, GatewayIntentBits, Partials, ChannelType } from 'discord.js'
// import { initChatGPT, askQuestion } from './chatgpt/chatgpt.js'
// import { initDiscordCommands, handle_interaction_ask, handle_interaction_image } from './discord/discord_commands.js'
// import { splitAndSendResponse } from './discord/discord_helpers.js'

// const MAX_RESPONSE_CHUNK_LENGTH = 1500

// async function main() {
//     await initChatGPT().catch(e => {
//         console.error(e)
//         process.exit()
//     })

//     await initDiscordCommands()

//     const client = new Client({
//         intents: [
//             GatewayIntentBits.Guilds,
//             GatewayIntentBits.GuildMessages,
//             GatewayIntentBits.GuildIntegrations,
//             GatewayIntentBits.DirectMessages,
//             GatewayIntentBits.DirectMessageTyping,
//             GatewayIntentBits.MessageContent,
//         ],
//         partials: [Partials.Channel]
//     });

//     client.on('ready', () => {
//         console.log(`Logged in as ${client.user.tag}!`);
//         console.log(new Date())
//     });

//     client.on("messageCreate", async message => {
//         if (process.env.ENABLE_DIRECT_MESSAGES !== "true" || message.channel.type != ChannelType.DM || message.author.bot) {
//             return;
//         }
//         const user = message.author

//         console.log("----Direct Message---")
//         console.log("Date    : " + new Date())
//         console.log("UserId  : " + user.id)
//         console.log("User    : " + user.username)
//         console.log("Message : " + message.content)
//         console.log("--------------")

//         if (message.content.toLowerCase() == "reset") {
//             Conversations.resetConversation(user.id)
//             user.send("Who are you ?")
//             return;
//         }

//         let conversationInfo = Conversations.getConversation(user.id)
//         try {
//             let sentMessage = await user.send("Hmm, let me think...")
//             askQuestion(message.content, async(response) => {
//                 if (response.length >= MAX_RESPONSE_CHUNK_LENGTH) {
//                     splitAndSendResponse(response, user)
//                 } else {
//                     await sentMessage.edit(response)
//                 }
//             }, { conversationInfo })
//         } catch (e) {
//             console.error(e)
//         }
//     })

//     client.on("interactionCreate", async interaction => {
//         switch (interaction.commandName) {
//             case "hoi": //ask
//                 handle_interaction_ask(interaction)
//                 break;
//             case "ve": //image
//                 handle_interaction_image(interaction)
//                 break
//         }
//     });

//     client.login(process.env.DISCORD_BOT_TOKEN);
// }

// main()