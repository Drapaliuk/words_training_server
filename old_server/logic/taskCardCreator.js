const mixer = function(arr) {
    const copyArr = arr.slice()
    const permanentLength = copyArr.length + 1 
    let serviceLength = copyArr.length

    const resultArr = []
    
    for(let i = 0; i < permanentLength; i++) {
        const randomNumber1 = (Math.random() * (serviceLength - 0) + 0).toFixed(0) //межа
        resultArr.push(copyArr[randomNumber1])
        copyArr.splice(randomNumber1, 1)
        serviceLength -=1
    }
    return resultArr.filter(el => {
        return el
    })
}


const taskCardCreator = function(correcVariants, wordsForMixing, wordsForMixingAmount = 3, ) {
    const wordsForMixingCopy = [...wordsForMixing]
    
    const taskCards = correcVariants.reduce((acc, el) => {
        const mixedWordsForTaskCard = wordsForMixingCopy.splice(0, wordsForMixingAmount);
        const task =  [el, ...mixedWordsForTaskCard]
        const mixedTask = mixer(task)
        acc = [...acc, mixedTask]
        return acc
    }, [])

    return taskCards
}

module.exports = taskCardCreator

