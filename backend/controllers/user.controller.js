const db = require('../config/database').getDB();

// Sélectionner les utilisateurs
module.exports.getAllUsers = (req, res, next) => {
    const sql = `SELECT * FROM users`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

// Sélectionner un utilisateur
module.exports.getUser = (req, res, next) => {
    const id = req.params.id;
    const sql = `SELECT * FROM users WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);

        }
    });
}

// Mettre à jour un utilisateur
module.exports.updateUser = (req, res, next) => {
    const pseudoUpdated = req.body.pseudo;
    const id = req.params.id;
    const sql = `UPDATE users SET pseudo=? WHERE id=?`;
    db.query(sql, [pseudoUpdated, id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

// Mettre à jour la photo de profil
module.exports.updateUserPic = (req, res, next) => {
    if (req.file) {
        const pic = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const id = req.params.id;
        const sql = `UPDATE users SET image=? WHERE id=?`;
        db.query(sql, [pic, id], (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                res.status(200).json(result);
            }
        })
    }
    else {
        console.log('No file');
    }
}

// Supprimer un utilisateur
module.exports.deleteUser = (req, res, next) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id=?`;
    db.query(sql, [id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}