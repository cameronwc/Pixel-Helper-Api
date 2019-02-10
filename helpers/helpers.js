Shuffle = (o) => {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

exports.bundlePictures = (unsplash, pexels) => {
    let bundle = [];
    unsplash.forEach(photo => bundle.push(photo));
    pexels.forEach(photo => bundle.push(photo));
    return Shuffle(bundle);
}


exports.formatUnsplashData = (photo) => {
    if(photo.errors){
        return photo;
    }
    return {
        id: photo.id,
        width: photo.width,
        height: photo.height,
        urls: photo.urls,
        display_url: photo.urls.regular,
        links: photo.links,
        download_link: photo.links.download_location,
        source: 'unsplash'
    }
}

exports.formatPexelData = (photo) => {
    if(photo.error) {
        return photo;
    }
    return {
        id: photo.id,
        width: photo.width,
        height: photo.height,
        urls: photo.src,
        display_url: photo.src.medium,
        download_link: photo.src.original,
        source: 'pexels'
    }
}