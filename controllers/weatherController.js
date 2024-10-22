const { getWeather } = require('../services/weatherService');
const { subscribers } = require('../models/subscriberModel');

exports.subscribeUser = (chatId) => {
    if (!subscribers.includes(chatId)) {
        subscribers.push(chatId);
        require('../utils/fileUtils').saveSubscribers(subscribers);
        return 'You have been subscribed to daily weather updates.';
    }
    return 'You are already subscribed.';
};

exports.unsubscribeUser = (chatId) => {
    const index = subscribers.indexOf(chatId);
    if (index > -1) {
        subscribers.splice(index, 1);
        require('../utils/fileUtils').saveSubscribers(subscribers);
        return 'You have been unsubscribed from daily weather updates.';
    }
    return 'You were not subscribed.';
};

exports.getWeatherReport = async (city) => {
    return await getWeather(city);
};
