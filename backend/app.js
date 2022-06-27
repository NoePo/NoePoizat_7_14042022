// Framework node.js
const express = require('express');

const cookieParser = require('cookie-parser');
const path = require('path');
// Helmet sécurise les requêtes HTTP, les en-têtes...
const helmet = require('helmet');

// Créer un token d'identification
const jwt = require('jsonwebtoken');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');

const auth = require('./middleware/auth.middleware');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Eviter les erreurs de type CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

app.get('/api/jwtid', auth, (req, res, next) => {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const myID = decodedToken.id;
    res.status(200).json({myID});
});

module.exports = app;