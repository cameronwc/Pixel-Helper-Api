const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { fetchPictures, fetchUnsplashPicture, fetchPexelPicture, searchPicture } = require('./helpers');

app.get('/api', (req, res) => {
    let length = Object.keys(req.query).length;
    if(length > 0) {
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

var server = app.listen(PORT, function () {
    console.log("Project started on started on localhost:" + PORT)
});

module.exports = server