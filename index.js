const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { fetchPictures, fetchUnsplashPicture, fetchPexelPicture, searchPicture } = require('./helpers');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
  });

app.get('/api', (req, res) => {
    if (req.query.q) {
        searchPicture(req, res);
    } else {
        fetchPictures(req, res)
    }
});

app.get('/api/unsplash/:id', (req, res) => {
    fetchUnsplashPicture(req, res);
});

app.get('/api/pexels/:id', (req, res) => {
    fetchPexelPicture(req, res);
});

const server = app.listen(PORT, () => {
    console.log('server running at ' + PORT)
})

module.exports = server