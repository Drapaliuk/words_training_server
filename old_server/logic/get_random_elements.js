const getRandomElement = function(arr, amount, exclusionElement) { // зробити щоб останній аргумент був ід а не порядковий номер
    if(arr.length < amount) {
        console.error('Too short!')
        return
    }
    const arrCopy = arr.slice();
    const permanentLength = (arrCopy.length - 1)
    let serviceLength = arrCopy.length
    let resultArr = []
    let randomNumberPull = []

    for(let i = 0; randomNumberPull.length < amount; i++) {
        const randomNumber = +(Math.random() * (permanentLength - 0) + 0).toFixed(0)
        if(!randomNumberPull.includes(randomNumber) && randomNumber !== exclusionElement) {
            randomNumberPull.push(randomNumber)
        }
    }

    for(let i = 0; i < randomNumberPull.length; i++) {
        resultArr.push(arrCopy[randomNumberPull[i]])
    }

    return resultArr
}

module.exports = getRandomElement