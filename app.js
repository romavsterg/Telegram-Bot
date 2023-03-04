const TelegramBot = require('node-telegram-bot-api');

const token = '6234423793:AAEHhmqGncXnHAY0WOriR50Sd-T7HFaslOQ'
const bot = new TelegramBot(token, {polling: true});

let randomNum = ''
game = false

function start (){
    bot.setMyCommands([
        {command: '/start', description:'запуск/перезапуск бота'},
        {command: '/info', description:'получение иформации о боте'},
        {command: '/game', description:'запустить/прекратить игру'},
        {command: '/help', description:'получение команд бота'},
    ])
    
    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id;

        if (game) {
            if (text === '/game') {
                game = false
                return bot.sendMessage(chatId, `Игра принудительно остановлена. Чтобы начать заново напиши /game`)
            } else if (Number(text) === randomNum) {
                game = false
                return bot.sendMessage(chatId, `Ты угадал! Если хочешь ещё раз, то нажми на следующую команду - /game`)
            } else {
                return bot.sendMessage(chatId, `Ты не угадал... Если хочешь прекратить игру то напиши /game`)
            }       
        }

        if (text === '/start'){
            await bot.sendMessage(chatId, `https://tlgrm.eu/_/stickers/ea5/382/ea53826d-c192-376a-b766-e5abc535f1c9/7.jpg`)
            return bot.sendMessage(chatId, `Добро пожаловать в первый бот пользователя ${msg.from.username}, ${msg.from.first_name}, `)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `First-bot - это первый бот пользователя ${msg.chat.username}`)
        }
        if (!game && text === '/game') {
            randomNum = Math.floor(Math.random()*10)
            console.log(randomNum)
            game = true
            return bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её угадать! Чтобы прекрать игру отправь /game ещё раз.`)
        } 
        if (text === '/help')
            return bot.sendMessage(chatId, `Список команд:\n
                /start - запуск/перезапуск бота.\n
                /info - получение иформации о боте\n
                /help - получение команд бота\n
                /game - запустить/прекратить игру`)
        return bot.sendMessage(chatId, 'Я тебя не понимаю :(')
    });
}

start()