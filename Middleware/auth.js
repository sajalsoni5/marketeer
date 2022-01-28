const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(404).send('Please login again');
    }
    try {
        const decoded = jwt.verify(token, config.get('private'));
        req.user = decoded;

        next();
    }
    catch (ex) {
        res.status(404).send(`Invalid token Please login again
                                ${ex}`);
    }


}