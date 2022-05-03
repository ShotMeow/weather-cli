#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { getWeather, getIcon } from "./services/api.service.js"
import { printError, printHelp, printSuccess, printWeather } from "./services/log.service.js"
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js"

const saveToken = async token => {
    if (!token.length)
        return printError('Токен не передан')
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    } catch (error) {
        printError(error.message)
    }
}

const saveCity = async city => {
    if (!city.length)
        return printError('Город не передан')
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city)
        printSuccess('Город сохранен')
    } catch (error) {
        printError(error.message)
    }
}

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city)
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch (error) {
        if (error?.response?.status == 401) {
            printError('Не верно указан токен')
        } else {
            printError(error.message)
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h)
        printHelp()
    else if (args.s)
        return saveCity(args.s)
    else if (args.t)
        return saveToken(args.t)
    else
        getForcast()
}

initCLI()