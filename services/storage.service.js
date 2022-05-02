import { homedir } from 'os'
import { join } from 'path'
import { promises } from 'fs'

const filePath = join(homedir(), 'weather-data.json')

export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const isExist = async path => {
    try {
        await promises.stat(path)
        return true
    } catch (error) {
        return false
    }
}

export const saveKeyValue = async (key, value) => {
    let data = {}
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
    }

    data[key] = value
    await promises.writeFile(filePath, JSON.stringify(data))
}

export const getKeyValue = async key => {
    let data = {}
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)
        data = JSON.parse(file)
        return data[key]
    }
    return undefined
}