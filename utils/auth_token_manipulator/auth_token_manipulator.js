const authTokenModifier = { //! authTokenModifier
    deleteBearer: token => token.split(' ')[1],
    addBearer: token => `Bearer ${token}`
}

module.exports = authTokenModifier;