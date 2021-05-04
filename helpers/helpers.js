const shuffle = (o) => {
	for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

exports.bundlePictures = (unsplash, pexels, pixabay) => {
    let bundle = [];
    unsplash.forEach(photo => bundle.push(photo));
    if(!pexels.error) {
        pexels.forEach(photo => bundle.push(photo));
    }
    pixabay.forEach(photo => bundle.push(photo));
    return shuffle(bundle);
}

exports.formatPixabayData = (photo) => {
    if(photo.errors){
        return photo;
    }
    let alt = null;
    if(photo.tags) {
        alt = photo.tags.charAt(0).toUpperCase() + photo.tags.slice(1);
    }
    return {
        id: photo.id,
        width: photo.imageWidth,
        height: photo.imageHeight,
        display_url: photo.largeImageURL,
        download_link: photo.largeImageURL,
        alt_text: alt,
        source: 'Pixabay'
    }
}

exports.formatUnsplashData = (photo) => {
    if(photo.errors){
        return photo;
    }
    let alt = photo.description = null;
    if(photo.description){
        alt = photo.description.charAt(0).toUpperCase() + photo.description.slice(1);
    }
    return {
        id: photo.id,
        width: photo.width,
        height: photo.height,
        urls: photo.urls,
        display_url: photo.urls.regular,
        links: photo.links,
        download_link: photo.links.download_location,
        alt_text: alt,
        source: 'unsplash'
    }
}

exports.formatPexelData = (photo) => {
    if(photo.error) {
        return photo;
    }
    const url_array = photo.url.split("/");
    const alt_fragment = url_array[url_array.length - 2].split("-");
    alt_fragment.pop()
    const lowercase_alt = alt_fragment.join(" ");
    const alt = lowercase_alt.charAt(0).toUpperCase() + lowercase_alt.slice(1);
    return {
        id: photo.id,
        width: photo.width,
        height: photo.height,
        urls: photo.src,
        display_url: photo.src.medium,
        download_link: photo.src.original,
        alt_text: alt,
        source: 'pexels'
    }
}