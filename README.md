
# nodeGPT_Bot
Bot de Whatsapp desarrollado con Nodejs. Utiliza la librería whatsapp-web.js para conectar con el cliente de whatsapp e incluye integrción con chatGPT.

## Instalación de dependencias:

`~$ git clone https://github.com/betcorg/nodeGPT_Bot`

`~$ cd nodeGPT_Bot`

`~$ npm init -y`

`~$ npm install`

## Iniciar bot

Antes de arrancar el bot es necesario crear un archivo donde almacenaremos nuestras variables de entorno. El archivo debe llamarse `.env` y debe contener las siguientes variables:

    OPENAI_API_KEY="tu api key de openai"
    MODEL="gpt-3.5-turbo"
    MAX_TOKENS="50"

La pimera variable indica la api keyde openai, la segunda el modelo de lenguaje que desees usar, en este caso gpt 3.5 en su versión más reciente y la tercera indica el número máximo de tokens que debe usar la respuesta generada.

Una vez teniendo este archivo puedes ejecutar el bot:

`~$ node index.js`

Se mostrará un código QR en la terminal, deberás autenticarte y listo, puedes enviar mensajes a tu número de whatsapp y podrás interactuar con ChatGPT.

Puedes contextualizar las respuestas agregando un objeto con los siguientes parámetros:

    {"role": "system", "content": "Eres el mejor vendedor de computadoras"}

Puedes crear un archivo que se llame role.js en donde podrás poner las instrucciones iniciales para que el bot tenga un contexto al responder, aquí tienes un ejemplo de su contenido:

![carbon (1)](https://github.com/betcorg/nodeGPT_Bot/assets/84089238/087c54b2-715e-4820-ae40-62183a2e35d7)

En el código se implementa mediante una importación del objeto `{seller}` que está dentro del archivo `role.js`.

![carbon](https://github.com/betcorg/nodeGPT_Bot/assets/84089238/04e5691f-1406-45c0-8e11-3eced3f655cb)

El objeto `seller`es referenciado en la función `getOpenAIResponse()` dentro de los parámetros que se envían en el request a la api de openai, esto hace que la respuesta generada tenga un contexto inicial y sea más personalizada.
Puedes modificar el objeto según tus necesidades.

![carbon (2)](https://github.com/betcorg/nodeGPT_Bot/assets/84089238/44336224-4b1e-4d7f-af7a-94f2fec93b11)







