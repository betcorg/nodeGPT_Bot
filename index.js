const { Configuration, OpenAIApi } = require("openai"); 
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY, }); 
const openai = new OpenAIApi(configuration);

async function getResponse() {

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
            "role": "user",
            "content": "¿Quién fue Cristobal Colón?",
        }],
        temperature: 0,
        max_tokens: 100,
    }); 
    console.log(response.data.choices[0].message.content);
}

getResponse();