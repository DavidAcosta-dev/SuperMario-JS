//accepts url, creates new image, adds eventlistener to image that listens for a 'load' event and returns the image. Then we assign the image's src to the 'url' we passed in at the top.
export function loadImage(url) {

    return new Promise(res => {

        const image = new Image();

        image.addEventListener('load', () => {
            res(image);//load event is fired when image is downloaded and ready for display.
        });
        
        image.src = url;
    })//end of promise
    
}

export function loadLevel(name) {
    return fetch(`/levels/${name}.json`)
        .then(res => res.json());
}

