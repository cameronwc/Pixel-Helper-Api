require('es6-promise').polyfill();
require('isomorphic-fetch');

const UNSPLASH_ID_KEY = "ee4740ee5561a46a4cb8473af34b3bf3094027d7708adadfe649d1b1cf9b2888";
const PEXEL_API_KEY = "563492ad6f91700001000001236d15ff366e4209ad3303f9267c781c";

exports.fetchPictures = async function (req, res) {
    let unsplashResult = await fetchUnsplashLatest(2);
    let pexelResult = await fetchPexelLatest(2);
    let pictures = {
        unsplash: unsplashResult,
        pexel: pexelResult
    }
    return res.json(pictures);
}

exports.fetchUnsplashPicture = async function (req, res) {
    const unsplashResult = await fetchUnsplashPhoto(req.params.id);
    return res.json(unsplashResult);
}

exports.fetchPexelPicture = async function (req, res) {
    const pexelResult = await fetchPexelPhoto(req.params.id);
    return res.json(pexelResult);
}

exports.searchPicture = async function (req, res) {
    const unsplashResult = await searchUnsplash('mountains');
    const pexelResult = await searchPexels('mountains');
    let pictures = {
        unsplash: unsplashResult,
        pexel: pexelResult
    }
    return res.json(pictures);
}

// Unsplash

async function fetchUnsplashLatest(page=1, per_page=15, order_by="latest") {
    const response = await fetchUnsplash(`https://api.unsplash.com/photos?page=${page}&per_page=${per_page}&order_by=${order_by}`);
    return await response.json();
}

async function fetchUnsplashPhoto(id) {
    const response = await fetchUnsplash(`https://api.unsplash.com/photos/${id}`);
    return await response.json();
}

async function searchUnsplash(query='mountains', page=1) {
    const response = await fetchUnsplash(`https://api.unsplash.com/search/photos?page=${page}&query=${query}`);
    return await response.json();
}

async function fetchUnsplash(url) {
    const response = await fetch(url, {
        method: 'get',
        headers: new Headers({
            'Authorization': `Client-ID ${UNSPLASH_ID_KEY}`
        })
    });
    return await response;
}

// Pexels
async function fetchPexelLatest(per_page=15, page=1) {
    const response = await fetchPexels(`https://api.pexels.com/v1/curated?per_page=${per_page}&page=${page}`);
    return await response.json();
}

async function fetchPexelPhoto(id) {
    const response = await fetchPexels(`https://api.pexels.com/v1/photos/${id}`);
    return await response.json();
}

async function searchPexels(query='mountains', per_page=15, page=1) {
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