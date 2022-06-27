const db = require('../config/database').getDB();
const validator = require('validator');

// Pour hasher les mots de passe
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Enregistrer un nouvel utilisateur
module.exports.signUp = async (req, res, next) => {
    const {pseudo, email, password} = req.body;
// Saler pour empecher que deux informations identiques ne conduisent à la même empreinte
    const salt = await bcrypt.genSalt(10);
    const cryptedPassword = await bcrypt.hash(password, salt);
    const sql = `INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)`;
 // Vérifier si l'adresse mail et déjà utiliser / valider et le mot de passe fait minimum 6 caractères
    db.query(sql, [pseudo, email, cryptedPassword], (err, result) => {
        if (err) {
            console.log(err);
            res.status(400).json({errorEmail: 'Cette adresse mail est déjà utilisée', errorPassword: ''});
        }
        else if (!validator.isEmail(email)) {
            const sql = `DELETE FROM users WHERE pseudo=? AND email=? AND password=?`;
            db.query(sql, [pseudo, email, cryptedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
            res.status(400).json({errorEmail: 'Rentrez une adresse mail valide', errorPassword: ''});
        }
        else if (password.length < 6) {
            const sql = `DELETE FROM users WHERE pseudo=? AND email=? AND password=?`;
            db.query(sql, [pseudo, email, cryptedPassword], (err, result) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(result);
                }
            });
            res.status(400).json({errorPassword: 'Le mot de passe doit contenir au moins 6 caractères', errorEmail : ''});
        }
        else {
            res.status(201).json(result);
        }
    });
};

const maxAge = 24 * 60 * 60* 1000;
const createToken = (id) => {
    return jwt.sign(
        {id},
        process.env.TOKEN_SECRET,
        {expiresIn: maxAge}
    )
};

// Vérifier si l'email et le mot de passe sont corrects
module.exports.signIn = (req, res, next) => {
    const {email, password} = req.body;
    const sql = `SELECT * FROM users WHERE email=?`;
    db.query(sql, [email], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            if (result.length == 0) {
                res.status(400).json({errorEmail: 'Adresse email incorrecte !', errorPassword: ''});
            }
            else {
                bcrypt.compare(password, result[0].password)
                    .then(valid => {
                        if (!valid) {
                            res.status(400).json({errorPassword: 'Mot de passe incorrect !', errorEmail: ''});
                        }
                        else {
                            const token = createToken(result[0].id);
                            res.cookie('jwt', token, {httpOnly: true, maxAge});
                            res.status(200).json({message: 'Mot de passe correct !'});
                        }
                    })
                    .catch(error => res.status(400).json({error}));
            }
        }
    });
}

module.exports.logout = (req, res, next ) => {
    res.cookie('jwt', '', {maxAge: 1});
    res.end();
}