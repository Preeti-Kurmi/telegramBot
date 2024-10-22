const fetch = require('node-fetch');

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (city) => {
    const response = await fetch(`${WEATHER_URL}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`);
    const data = await response.json();
    if (data.cod === 200) {
        return `The weather in ${data.name}: ${data.weather[0].description}. Temperature: ${data.main.temp}°C.`;
    }
    return `Sorry, I couldn't get the weather for that location.`;
};

module.exports = { getWeather };
