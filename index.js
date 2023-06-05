const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
const model = "gpt-3.5-turbo";
const temp = 0;
const max_tokens = 30;
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const client = new Client({
    authStrategy: new LocalAuth(),
});


const waClient = function () {

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    client.initialize();
};
waClient();


client.on("message", (msg) => {
    const prompt = msg.body;

    async function listener() {
        console.log(prompt);
        // getResponse(prompt);
        const response = await getResponse(prompt);
        client.sendMessage(msg.from, response);
    };
    listener();
});



async function getResponse(prompt) {
    const params = {
        model: model,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: temp,
        max_tokens: max_tokens,
    };

    const response = await openai.createChatCompletion(params);
    const content = response.data.choices[0].message.content;
    // console.log(content);
    return content;
};















