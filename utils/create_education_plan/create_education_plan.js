// const mixingElement = function(arr) {
//     const copyArr = arr.slice()
//     const permanentLength = copyArr.length + 1 
//     let serviceLength = copyArr.length

//     const resultArr = []
    
//     for(let i = 0; i < permanentLength; i++) {
//         const randomNumber1 = (Math.random() * (serviceLength - 0) + 0).toFixed(0) //межа
//         resultArr.push(copyArr[randomNumber1])
//         copyArr.splice(randomNumber1, 1)
//         serviceLength -=1
//     }
//     return resultArr.filter(el => {
//         return el
//     })
// }




// const educationObjectsCreator = function(words) {
//     return words.reduce((acc, el, idx, array) => {
//         acc.push(
//             {
//                 word: el,
//                 taskLanguages: [
//                     {_id: el._id, ukr: el.ukr, eng: el.eng , answerLang: 'eng', questionLang: 'ukr', trainingId: '001', isShow: false},
//                     {_id: el._id, ukr: el.ukr, eng: el.eng, answerLang: 'ukr', questionLang: 'eng', trainingId: '002', isShow: false},

//                 ]
//             })
        
//         return acc
//     }, [])
// }

// const scheduleTaskCardCreator = function(words) {
//     return words.reduce((acc, el, idx, arr) => {
//         acc = [...acc, ...el.taskLanguages]
//         return acc
//     }, [])
// }


// function educationPlanCreator( selectedWords ) {
//     console.log('selectedWords', selectedWords)
//             const educationObjects = educationObjectsCreator(selectedWords);
//             const scheduleTaskCard = scheduleTaskCardCreator(educationObjects);
//             const mixedScheduleTaskCard = mixingElement(scheduleTaskCard); //mixingElement must rename
//             return mixedScheduleTaskCard
// }


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




const educationObjectsCreator = function(words, applicationLanguage = 'ukr', selectedLanguagePair) {
    let languagePair;

    if(selectedLanguagePair) {
        languagePair = [...selectedLanguagePair]

    } else {
        const secondLanguage = applicationLanguage === 'eng' ? 'ukr' : applicationLanguage;
        languagePair = ['eng', secondLanguage];
    };

    const [firstLanguage, secondLanguage] = languagePair

    

    return words.reduce((acc, el, idx, array) => {
        acc.push(
            {
                word: el,
                taskLanguages: [
                    {   
                        [firstLanguage]: el[firstLanguage],
                        [secondLanguage]: el[secondLanguage],
                        answerLang: firstLanguage,
                        questionLang: secondLanguage,
                        trainingId: '001',
                    },
                    {
                        _id: el._id,
                        [firstLanguage]: el[firstLanguage],
                        [secondLanguage]: el[secondLanguage],
                        answerLang: secondLanguage,
                        questionLang: firstLanguage,
                        trainingId: '002',
                    }
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


function educationPlanCreator( selectedWords, applicationLanguage, selectedLanguagePair ) {
            const educationObjects = educationObjectsCreator(selectedWords, applicationLanguage, selectedLanguagePair);
            const scheduleTaskCard = scheduleTaskCardCreator(educationObjects);
            const mixedScheduleTaskCard = mixingElement(scheduleTaskCard);
            return mixedScheduleTaskCard
}

module.exports = educationPlanCreator