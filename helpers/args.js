export const getArgs = (args) => {
    const result = {}
    const [executer, file, ...rest] = args

    rest.forEach((value, index, array) => {
        if (value.charAt(0) == '-') {
            if (index == array.length - 1) {
                result[value.substring(1)] = true
            } else if (array[index + 1].charAt(0) != '-') {
                result[value.substring(1)] = array[index + 1]
            } else {
                result[value.substring(1)] = true
            }
        }
    })
    return result
}