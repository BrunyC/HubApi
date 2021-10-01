import chalk from "chalk"
import { v4 as uuidv4 } from 'uuid'

export const consoleLog = function (status, message) {
let messageFormated = message
let separator = '**********************************************************'
    switch (status) {
        case 'success':
        messageFormated = chalk.green(message)
        separator = chalk.green(separator)
        break
        case 'error':
        case 'failed':
        messageFormated = chalk.red(message)
        separator = chalk.red(separator)
        break
        case 'warning':
        messageFormated = chalk.yellow(message)
        separator = chalk.yellow(separator)
        break
        case 'primary':
        messageFormated = chalk.blue(message)
        separator = chalk.blue(separator)
        break
        default:
        messageFormated = message
        break
    }
    console.log(separator)
    console.log(messageFormated)
    console.log(separator)
}

export const digitsCount = function (n) {
    var count = 0;
    if (n >= 1) ++count;
    while (n / 10 >= 1) {
        n /= 10;
        ++count;
    }
    return count;
}

export const extractNumbers = function (string) {
    var numb = string.match(/\d/g);
    return numb = numb.join("");
}

export const v4uuid = uuidv4()