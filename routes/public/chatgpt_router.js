const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require('openai')
const {validate_message, message_validation} = require('../../middlewares/validation/chat')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function call_chat_gpt(text){
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            max_tokens: 1000,
        });
        return (completion.data.choices[0].text.trim())
    }catch (e) {
        console.log(e.message)
        return e.message
    }
}

router.post('/',
    validate_message,
    message_validation,
    async (req, res) => {
    const message = req.body.message
    let response;
    if (message) {
        response = await call_chat_gpt(message)
        if(response){
            res.status(200).json({
                response
            })
        }else{
            res.status(500).json({
                message: "error"
            })
        }
    }
})


module.exports = router;