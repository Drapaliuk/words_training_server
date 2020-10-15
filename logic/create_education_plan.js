const mixingElement = function(arr) {
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




const educationObjectsCreator = function(words) {
    return words.reduce((acc, el, idx, array) => {
        acc.push(
            {
                word: el,
                taskLanguages: [
                    {...el, answerLang: 'eng', questionLang: 'ua', trainingId: '001', isShow: false},
                    {...el, answerLang: 'ua', questionLang: 'eng', trainingId: '002', isShow: false},
                ]
            })
        
        return acc
    }, [])
}

const scheduleTaskCardCreator = function(words) {
    return words.reduce((acc, el, idx, arr) => {
        acc = [...acc, ...el.taskLanguages]
        return acc
    }, [])
}


function educationPlanCreator( selectedWords ) {
    console.log('selectedWords', selectedWords)
            const educationObjects = educationObjectsCreator(selectedWords);
            const scheduleTaskCard = scheduleTaskCardCreator(educationObjects);
            const mixedScheduleTaskCard = mixingElement(scheduleTaskCard); //mixingElement must rename
            return mixedScheduleTaskCard
}

module.exports = educationPlanCreator