import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'

const getLocation = async (city, token) => {
    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            limit: 1,
            appid: token
        }
    })
    return data
}

export const getIcon = icon => {
    switch (icon.slice(0, -1)) {
        case '01':
            return '☀️'
        case '02':
            return '🌤'
        case '03':
            return '⛅️'
        case '04':
            return '☁️'
        case '09':
            return '🌧'
        case '10':
            return '🌦'
        case '11':
            return '🌩'
        case '13':
            return '🌨'
        case '50':
            return '🌫'
    }
}

export const getWeather = async city => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token)
    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
    }
    const location = await getLocation(city, token)
    if (location.length == 0) {
        throw new Error('Такого города не существует')
    }
    const lat = location[0].lat
    const lon = location[0].lon

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: lat,
            lon: lon,
            appid: token
        }
    })
    return data
}