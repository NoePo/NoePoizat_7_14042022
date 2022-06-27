const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const multer = require('../middleware/multer.middleware');

const postCtrl = require('../controllers/post.controller');

// Importer depuis les controllers ; Rajoute le auth sur les routes qu'on veut protéger ; multer pour les images
router.get('/', auth, postCtrl.readPost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

router.patch('/likeUnlike/:id', auth, postCtrl.likeUnlike);
router.post('/postLikedByUser/:id', auth, postCtrl.postLikedByUser);
router.get('/likeUnlike/:id', auth, postCtrl.countLikes);
router.get('/likeUnlike', auth, postCtrl.countAllLikes);
router.get('/likeUnlike/getOneLike/:id', auth, postCtrl.getOneLike);

module.exports = router;