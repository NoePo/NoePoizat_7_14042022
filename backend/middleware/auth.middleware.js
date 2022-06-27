const db = require('../config/database').getDB();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (token) {
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
            const myID = decodedToken.id;
            const sql = `SELECT id FROM users WHERE id='${myID}'`;
            db.query(sql, (err, result) => {
                if (err) {
                    res.status(400).json({err});
                }
                else {
                    next()
                }
            });
        }
        else {
            res.clearCookie();
            res.status(400).json({error: 'No token'});
        }
    }
    catch (error) {
        res.clearCookie();
        res.status(400).json({error});
    }
}