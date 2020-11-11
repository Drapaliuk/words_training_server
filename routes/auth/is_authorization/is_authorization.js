const middleware = function(req, res) {
    res.status(200).json({
            message: 'Your are authorization',
            responseCode: 1,
    })
}

module.exports = middleware;

