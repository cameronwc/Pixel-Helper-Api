const helpers = require('./helpers.js');

require('es6-promise').polyfill();
require('isomorphic-fetch');

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const PEXEL_API_KEY = process.env.PEXEL_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
// Functions available outside the file
exports.fetchPictures = async function (req, res) {
    let unsplashResult = await fetchUnsplashLatest(req.query.page);
    let pexelResult = await fetchPexelLatest(req.query.page);
    unsplashResult = unsplashResult.map(photo => (
        helpers.formatUnsplashData(photo)
    ));
    pexelResult = pexelResult.photos.map(photo => (
        helpers.formatPexelData(photo)
    ));
    let pictures = helpers.bundlePictures(unsplashResult, pexelResult);
    return res.json(pictures);
}

exports.searchPicture = async function (req, res) {
    let query = req.query.q;
    let page = req.query.page
    let unsplashResult = await searchUnsplash(query, page);
    let pexelResult = await searchPexels(query, page);
    unsplashResult = unsplashResult.results.map(photo => (
        helpers.formatUnsplashData(photo)
    ));
    pexelResult = pexelResult.photos.map(photo => (
        helpers.formatPexelData(photo)
    ));
    let pictures = helpers.bundlePictures(unsplashResult, pexelResult);
    return res.json(pictures);
}

exports.fetchUnsplashPicture = async function (req, res) {
    let unsplashResult = await fetchUnsplashPhoto(req.params.id);
    unsplashResult = helpers.formatUnsplashData(unsplashResult);
    return res.json(unsplashResult);
}

exports.fetchPexelPicture = async function (req, res) {
    let pexelResult = await fetchPexelPhoto(req.params.id);
    pexelResult = helpers.formatPexelData(pexelResult);
    return res.json(pexelResult);
}

// Unsplash

async function fetchUnsplashLatest(page = 1, per_page = 15, order_by = "latest") {
    const response = await fetchUnsplash(`https://api.unsplash.com/photos?page=${page}&per_page=${per_page}&order_by=${order_by}`);
    return await response.json();
}

async function fetchUnsplashPhoto(id) {
    const response = await fetchUnsplash(`https://api.unsplash.com/photos/${id}`);
    return await response.json();
}

async function searchUnsplash(query = 'mountains', page = 1) {
    let response = await fetchUnsplash(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`);
    return await response.json();
}

async function fetchUnsplash(url) {
    let response = new Promise((resolve, reject) => {
        const response = fetch(url, {
            method: 'get',
            headers: new Headers({
                'Authorization': `Client-ID ${UNSPLASH_API_KEY}`
            })
        });
        if(response.error) {
            reject(response);
        }
        resolve(response);
    });
    return response;
}

// Pexels
async function fetchPexelLatest(per_page = 15, page = 1) {
    const response = await fetchPexels(`https://api.pexels.com/v1/curated?per_page=${per_page}&page=${page}`);
    return await response.json();
}

async function fetchPexelPhoto(id) {
    const response = await fetchPexels(`https://api.pexels.com/v1/photos/${id}`);
    return await response.json();
}

async function searchPexels(query = 'mountains', per_page = 15, page = 1) {
    const response = await fetchPexels(`https://api.pexels.com/v1/search?query=${query}&per_page=${per_page}&page=${page}`);
    return await response.json();
}

async function fetchPexels(url) {
    const response = await fetch(url, {
        method: 'get',
        headers: new Headers({
            'Authorization': PEXEL_API_KEY
        })
    });
    return await response;
}