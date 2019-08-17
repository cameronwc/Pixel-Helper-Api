const helpers = require('./helpers.js');

require('es6-promise').polyfill();
require('isomorphic-fetch');

const UNSPLASH_API_KEY = process.env.UNSPLASH_API_KEY;
const PEXEL_API_KEY = process.env.PEXEL_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

if(!UNSPLASH_API_KEY || !PEXEL_API_KEY || !PIXABAY_API_KEY) {
    console.log("Please add your PEXEL_API_KEY, UNSPASH_API_KEY, and PIXABAY_API_KEY to your environmental variables.")
    process.exit(1)
}

// Functions available outside the file
exports.fetchPictures = async function (req, res) {
    let unsplashResult = await fetchUnsplashLatest(req.query.page);
    let pexelResult = await fetchPexelLatest(req.query.page);
    let pixabayResult = await fetchPixabayLatest(req.query.page);
    if(unsplashResult.errors) {
        return res.json({"error": "api limit"});
    }
    let pictures = mapPictures(unsplashResult, pexelResult, pixabayResult);
    return res.json(pictures);
}

exports.searchPicture = async function (req, res) {
    let query = req.query.q;
    let page = req.query.page
    let unsplashResult = await searchUnsplash(query, page);
    let pexelResult = await searchPexels(query, page);
    let pixabayResult = await searchPixabay(query, page);
    if(unsplashResult.errors) {
        return res.json({"error": "api limit"});
    }
    let pictures = mapPictures(unsplashResult.results, pexelResult, pixabayResult);
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

function mapPictures(unsplashResult, pexelResult, pixabayResult) {
    unsplashResult = unsplashResult.map(photo => (
        helpers.formatUnsplashData(photo)
    ));
    if(!pexelResult.error){
        pexelResult = pexelResult.photos.map(photo => (
            helpers.formatPexelData(photo)
        ));
    }
    pixabayResult = pixabayResult.hits.map(photo => (
        helpers.formatPixabayData(photo)
    ));
    return helpers.bundlePictures(unsplashResult, pexelResult, pixabayResult);
}

// Pixabay
async function fetchPixabayLatest(page = 1, per_page = 15, order_by = "latest") {
    const response = await fetchPixabay(`https://pixabay.com/api/?image_type=photo&page=${page}`)
    return response.json();
}

async function searchPixabay(query = 'mountains', page = 1) {
    let response = await fetchPixabay(`https://pixabay.com/api/?q=${query}&image_type=photo&page=${page}`)
    return response.json();
}

async function fetchPixabay(url) {
    url = url + `&key=${PIXABAY_API_KEY}`;
    let response = new Promise((resolve, reject) => {
        const response = fetch(url, {
            method: 'get'
        });
        if(response.error) {
            reject(response);
        }
        resolve(response);
    });
    return response;
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