import chalk from 'chalk'
import dedent from 'dedent-js'

export const printError = error => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error)
}

export const printSuccess = message => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

export const printHelp = () => {
    console.log(dedent(`

        ${chalk.black.bgBlue(' Доступные команды ')}

        ${chalk.black.bgYellow.italic(' Без параметров ')} = вывод погоды

        ${chalk.black.bgYellow.italic(' -s [CITY] ')} = выбор города

        ${chalk.black.bgYellow.italic(' -h ')} = вывод помощи

        ${chalk.black.bgYellow.italic(' -t [API_KEY] ')} = сохранение токена

    `))
}