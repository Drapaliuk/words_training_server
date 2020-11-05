const getRandomElementsById = function(arr, amount, exclusiveWords) {
    const availableWordsForFilterAmount = arr.length - exclusiveWords.length;
    console.log('amount', amount)
    console.log('availableWordsForFilterAmount', availableWordsForFilterAmount)
    console.log('arr', arr)
    if(amount > availableWordsForFilterAmount) {
        console.error('you need too many elements')
        return arr
    }
    const allWordsAmount = arr.length - 1;
    const allWords = arr;
    let resultWords = []

    do {
        const randomNumber = +(Math.random() * (allWordsAmount - 0) + 0).toFixed(0)
        const randomWord = allWords[randomNumber];
        const randomWordId = allWords[randomNumber]._id;
        const isExclusiveWord = exclusiveWords.includes(randomWordId);
        const isRapidWord = resultWords.includes(randomWordId)
        if(!isExclusiveWord && !isRapidWord) {
            resultWords.push(randomWord._id)
        }

    } while (resultWords.length < amount)

    return resultWords
}

module.exports = getRandomElementsById