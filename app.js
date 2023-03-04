const TelegramBot = require('node-telegram-bot-api');
const token = '6234423793:AAEHhmqGncXnHAY0WOriR50Sd-T7HFaslOQ'
const {gameOptions, againOptions} = require('./options')

const bot = new TelegramBot(token, {polling: true});
const chats = {}
const startGame = async (chatId)=>{
    await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать!`)
    randomNum = Math.floor(Math.random()*10)
    chats[chatId] = randomNum
    console.log(chats[chatId])
    await bot.sendMessage(chatId, `Отгадывай`, gameOptions)
}

let randomNum = ''
const start = () => {
    bot.setMyCommands([
        {command: '/start', description:'запуск/перезапуск бота'},
        {command: '/info', description:'получение иформации о боте'},
        {command: '/game', description:'запустить/прекратить игру'},
        {command: '/help', description:'получение команд бота'},
    ])
    
    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id;

        if (text === '/start'){
            await bot.sendMessage(chatId, `https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.jpg`)
            return bot.sendMessage(chatId, `Добро пожаловать в первый бот пользователя ${msg.from.username}, ${msg.from.first_name}, `)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `First-bot - это первый бот пользователя ${msg.chat.username}`)
        }
        if (text === '/game') {
            return startGame(chatId)
        } 
        if (text === '/help')
            return bot.sendMessage(chatId, `Список команд:\n
                /start - запуск/перезапуск бота.\n
                /info - получение иформации о боте\n
                /help - получение команд бота\n
                /game - запустить игру`)
        return bot.sendMessage(chatId, 'Я тебя не понимаю :(')
    });

    bot.on('callback_query', async msg=>{
        const data = msg.data
        const chatId = msg.message.chat.id
        if (data === '/again') {
            return startGame(chatId)
        }
        if (Number(data) === chats[chatId]) {
            return bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}.`, againOptions)
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
        }
    })
}
start()