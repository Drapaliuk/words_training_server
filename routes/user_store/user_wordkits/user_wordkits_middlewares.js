const middlewares = {
    post: (req, res) => {
       if(req.body) {
           const payload = [
               {
                  serviceInfo: {name: req.body.wordSetName},
                  words: [...req.body.words]
                }
           ]
           return res.send({responseCode: 1, payload})
       }
       res.send({responseCode: 0})
   },
   get: (req, res) => {
        res.send('Sorry, this endpoint has not ready yet')
   }
}

module.exports = middlewares;