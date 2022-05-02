#!/usr/bin/env node

import { getArgs } from "./helpers/args.js"
import { getWeather } from "./services/api.service.js"
import { printError, printHelp, printSuccess } from "./services/log.service.js"
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js"

const saveToken = async token => {
    if (!token.length) {
        printError('Токен не передан')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token)
        printSuccess('Токен сохранен')
    } catch (error) {
        printError(error.message)
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        printHelp()
    }

    if (args.s) {
        return saveToken(args.s)
    }

    if (args.t) {
        return saveToken(args.t)
    }

    getWeather('Москва')
}

initCLI()