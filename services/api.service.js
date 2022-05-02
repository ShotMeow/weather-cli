import axios from 'axios'
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js'


const getCity = async (city, token) => {
    const { data } = await axios.get('https://api.openweathermap.org/geo/1.0/direct', {
        params: {
            q: city,
            limit: 1,
            appid: token
        }
    })
    return data
}

export const getWeather = async city => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token)
    if (!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
    }
    const location = await getCity(city, token)
    const lat = location[0].lat
    const lon = location[0].lon

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            lat: lat,
            lon: lon,
            appid: token
        }
    })
    console.log(data)
}