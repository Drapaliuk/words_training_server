const middlewares = {
    post: (req, res) => {
        const result = req.body.reduce((acc, el, idx, arr) => { //change!!! cause i don`t check req.body and use for reduce for uncheck object
            if(el.trainingId === '001') {
                if(el.isSkipped) {
                    acc.push({...el, amountMistakes: el.answerDetails.length})
                    return acc
                }
    
                if(!el.isSkipped) {
                    acc.push({...el, amountMistakes: (el.answerDetails.length - 1)})
                    return acc
                }
            }
    
            if(el.trainingId === '002') {
                let amountMistakes = 0;
                el.answerDetails.forEach(el => {
                    amountMistakes += (el.choosenVariants.length - 1);
                });
                acc.push({...el, amountMistakes})
                return acc
            }
    
        }, [])
        // console.log(result)
        res.send(req.body)
    }
}

module.exports = middlewares;