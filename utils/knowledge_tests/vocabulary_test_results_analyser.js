const languageLevels = [
    {percentInterval: {from: 0, to: 0}, level: 'A0'},
    {percentInterval: {from: 0, to: 16.6}, level: 'A1'},
    {percentInterval: {from: 16.7, to: 33.3}, level: 'A2'},
    {percentInterval: {from: 33.4, to: 49.8}, level: 'B1'},
    {percentInterval: {from: 49.9, to: 66.5}, level: 'B2'},
    {percentInterval: {from: 66.5, to: 83.1}, level: 'C1'},
    {percentInterval: {from: 83.1, to: 100}, level: 'C2'},
]

const positiveAnswersCounter = results => {
    let positiveAnswers = 0;
    const allAnswers = results.length;
    results.forEach(el => el.answer ? positiveAnswers++ : null);

    return {allAnswers, positiveAnswers}
}   

const positiveAnswersPercent = ({positiveAnswers, allAnswers}) => {
    return Math.round((positiveAnswers / allAnswers) * 100)
}

const languageLevelDefine = percentInterval => {
    const graduatedResult = languageLevels.find(el => {
        return percentInterval >= el.percentInterval.from && percentInterval <= el.percentInterval.to
    })
    return {level: graduatedResult.level, percent: percentInterval}
}

const vocabularyTestAnalyser = testAnswers => {
    const testAnswersCopy = [...testAnswers];
    const languageLevel = languageLevelDefine(positiveAnswersPercent(positiveAnswersCounter(testAnswersCopy)));
    console.log(languageLevel)
    return languageLevel
}


module.exports = vocabularyTestAnalyser;