const TelegramBot = require('node-telegram-bot-api');
const weatherController = require('../controllers/weatherController');
const fs = require('fs');

let bot;

const BOT_TOKEN = process.env.BOT_TOKEN;

const startBot = () => {
    bot = new TelegramBot(BOT_TOKEN, { polling: true });

    bot.onText(/\/subscribe/, (msg) => {
        const chatId = msg.chat.id;
        const response = weatherController.subscribeUser(chatId);
        bot.sendMessage(chatId, response);
    });

    bot.onText(/\/unsubscribe/, (msg) => {
        const chatId = msg.chat.id;
        const response = weatherController.unsubscribeUser(chatId);
        bot.sendMessage(chatId, response);
    });

    bot.onText(/\/weather (.+)/, async (msg, match) => {
        const chatId = msg.chat.id;
        const city = match[1];
        const weatherReport = await weatherController.getWeatherReport(city);
        bot.sendMessage(chatId, weatherReport);
    });

    console.log('Bot is running...');
};

module.exports = { startBot };
