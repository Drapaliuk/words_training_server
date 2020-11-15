const graduation = [
    {percentResult: {from: 0, to: 0}, category: 'A0'},
    {percentResult: {from: 0, to: 16.6}, category: 'A1'},
    {percentResult: {from: 16.7, to: 33.3}, category: 'A2'},
    {percentResult: {from: 33.4, to: 49.8}, category: 'B1'},
    {percentResult: {from: 49.9, to: 66.5}, category: 'B2'},
    {percentResult: {from: 66.5, to: 83.1}, category: 'C1'},
    {percentResult: {from: 83.1, to: 100}, category: 'C2'},
]

const arr = [
    {answer: true},
    {answer: false},
    {answer: false},
    {answer: true},
    {answer: true},
    {answer: true},
    {answer: true},
]


const trueAnswerAnalyser = function(results) {
    let trueAnswersAmount = 0;
    const commonAmountAnswers = results.length;
    results.forEach(el => el.answer ? trueAnswersAmount++ : null);

    return {commonAmountAnswers, trueAnswersAmount}
}   


const percentTrueAnswersAnalyser = function({trueAnswersAmount, commonAmountAnswers}) {
    return (trueAnswersAmount / commonAmountAnswers) * 100
}

const graduationAnalyser = function(percentResult) {
    return graduation.find(el => {
        return percentResult >= el.percentResult.from && percentResult <= el.percentResult.to
    } )
}

const vocabularyTestAnalyser = function(testResults) {
    const testResultsCopy = [...testResults];
    const trueAnswersAnalysed = trueAnswerAnalyser(testResultsCopy);
    const trueAnswersPercents = percentTrueAnswersAnalyser(trueAnswersAnalysed);
    const knowledgeLevel = graduationAnalyser(trueAnswersPercents)
    return knowledgeLevel
}


console.log(vocabularyTestAnalyser(arr))