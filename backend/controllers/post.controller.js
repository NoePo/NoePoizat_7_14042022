const db = require('../config/database').getDB();
const fs = require('fs');

module.exports.readPost = (req, res, next) => {
    const sql = `SELECT * FROM posts`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}
// Créer un post
module.exports.createPost = (req, res, next) => {
    const post = {
        poster_id: req.body.poster_id,
        message: req.body.message,
        image: "No img",
        video: req.body.video,
        date: req.body.date
    }
    if (req.file) {
        post.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
        const sql = `INSERT INTO posts (poster_id, message, image, video, date) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [post.poster_id, post.message, post.image, post.video, post.date], (err, result) => {
            if (err) {
                res.status(400).json({err});
            }
            else {
                res.status(201).json(result);
            }
        });
    }
    else {
        const sql = `INSERT INTO posts (poster_id, message, image, video, date) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [post.poster_id, post.message, post.image, post.video, post.date], (err, result) => {
            if (err) {
                res.status(400).json({err});
            }
            else {
                res.status(201).json(result);
            }
        });
    }
}

// Modifier un post
module.exports.updatePost = (req, res, next) => {
    const messageUpdated = req.body.message;
    const videoUpdated = req.body.video;
    const imageUpdated = req.body.image;
    const id = req.params.id;
    if (req.file) {
        const sql = `UPDATE posts SET message=?, image=?, video=? WHERE id=?`;
        db.query(sql, [messageUpdated, imageUpdated, videoUpdated, id], (err, result) => {
            if (err) {
                res.status(400).json({err});
            }
            else {
                res.status(200).json(result);
            }
        });
    }
    else {
        const sql = `UPDATE posts SET message=?, image=?, video=? WHERE id=?`;
        db.query(sql, [messageUpdated, imageUpdated, videoUpdated, id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(400).json({err});
            }
            else {
                res.status(200).json(result);
            }

        });
    }
}

// Supprimer un post (en vérifiant bien l'id pour que n'importe qui puisse pas supprimer)
module.exports.deletePost = (req, res, next) => {
    const id = req.params.id;
    const sqlSelect = `SELECT image FROM posts WHERE id=?`;
    db.query(sqlSelect, [id], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            if (result[0] != "No img") {
                const splittedUrl = result[0].image.split('/images/');
                const imgName = splittedUrl[1];
                fs.unlink(`images/${imgName}`, () => {
                    console.log('Photo supprimée !');
                });
            }
            const sqlDelete = `DELETE FROM posts WHERE id=?`;
            db.query(sqlDelete, [id], (err, result) => {
                if (err) {
                    res.status(400).json({err});
                }
                else {
                    res.status(200).json(result);
                }
            });
        }
    });
}


module.exports.likeUnlike = (req, res, next) => {
    const userID = req.body.liker_id;
    const postID = req.params.id;
    const sqlSelect = `SELECT * FROM likes WHERE liker_id=? AND postLiked_id=?`;
    db.query(sqlSelect, [userID, postID], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            if (result.length != 0) {
                const sqlDelete = `DELETE FROM likes WHERE liker_id=? AND postLiked_id=?`;
                db.query(sqlDelete, [userID, postID], (err, result) => {
                    if (err) {
                        res.status(400).json({err});
                    }
                    else {
                        res.status(200).json(result);
                    }
                });
            }
            else {
                const sqlInsert = `INSERT INTO likes (liker_id, postLiked_id) VALUES (?, ?)`;
                db.query(sqlInsert, [userID, postID], (err, result) => {
                    if (err) {
                        res.status(400).json({err});
                    }
                    else {
                        res.status(200).json(result);
                    }
                });
            }
        }
    });
}

module.exports.postLikedByUser = (req, res, next) => {
    const userID = req.body.user;
    const postID = req.params.id;
    const sql = `SELECT * FROM likes WHERE liker_id=? AND postLiked_id=?`;
    db.query(sql, [userID, postID], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.countLikes = (req, res, next) => {
    const postID = req.params.id;
    const sql = `SELECT COUNT(*) AS totalLikes FROM likes WHERE postLiked_id=?`;
    db.query(sql, [postID], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}

module.exports.countAllLikes = (req, res, next) => {
    const sql = `SELECT * FROM likes`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}



module.exports.getOneLike = (req, res, next) => {
    const likeId = req.params.id;
    const sql = `SELECT * FROM likes WHERE id=?`;
    db.query(sql, [likeId], (err, result) => {
        if (err) {
            res.status(400).json({err});
        }
        else {
            res.status(200).json(result);
        }
    });
}