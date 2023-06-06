const { Configuration, OpenAIApi } = require("openai");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
require('dotenv').config();

// Configuraciones de OpenAI
const apiKey = process.env.OPENAI_API_KEY
const openAIConfig = new Configuration({ apiKey });
const openai = new OpenAIApi(openAIConfig);
const model = process.env.MODEL
const maxTokens = parseInt(process.env.MAX_TOKENS);
const seller = require("./role");

// Configuraciones del cliente de Whatsapp
const whatsappClient = new Client({
    authStrategy: new LocalAuth(),
});

// Genera código QR de autenticación
function genQRCode(qr) {
    qrcode.generate(qr, { small: true });
};

// Inicializa el cliente de Whatsapp
function whatsappInit() {
    whatsappClient.on("qr", genQRCode);
    whatsappClient.on("ready", () => {
        console.log("Cliente listo!");
    });
    whatsappClient.initialize();
};

// Solicita y retorna la respuesta de OpenAI
async function getOpenAIResponse(prompt) {
    const params = {
        model,
        messages: [
            seller,
            { "role": "user", "content": prompt },
        ],
        max_tokens: maxTokens,
    };
    const response = await openai.createChatCompletion(params);
    const content = response.data.choices[0].message.content;
    console.log(content);
    console.log(`Se usaron ${response.data.usage.total_tokens} tokens`);
    return content;
};

// Envía el mensaje de respuesta desde el cliente de Whatsapp
async function sendMessage(from, content) {
    await whatsappClient.sendMessage(from, content);
};

// Maneja los mensajes entrantes y envía la respuesta
async function handleIncomingMsg(msg) {
    const prompt = msg.body;

    console.log(prompt);

    const response = await getOpenAIResponse(prompt);
    await sendMessage(msg.from, response);
};

// Inicializa el bot
function startBot() {
    whatsappInit();
    whatsappClient.on("message", handleIncomingMsg);
};
startBot();