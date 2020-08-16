//accepts url, creates new image, adds eventlistener to image that listens for a 'load' event and returns the image. Then we assign the image's src to the 'url' we passed in at the top.
function loadImage(url) {

    return new Promise(res => {

        const image = new Image();

        image.addEventListener('load', () => {
            res(image);//load event is fired when image is downloaded and ready for display.
        });
        
        image.src = url;

    })//end of promise
}

const canvasMain = document.getElementById('screen'); //access the canvas with id of screen
const context = canvasMain.getContext('2d'); //access the api that we will use to draw with to the canvas.

context.fillRect(0,0,50,50);

loadImage('/assets/images/marioBrosTileSet.png')
    .then(image=> {
        const sprites = //we will kinda mock up an api to make mapping the sprites much more convinient than the way we are doing it below in context.drawImage(...).

        context.drawImage(image,//drawImage() is polymorphic, it does many different things depending on the number of args and type of args
            0, 0, 16, 16, //subset coordinates that target "WHAT" part of the image you want to render. You pass the image in as 1st arg. (in this case, it's image).
            32, 32, //coordinates of "WHERE" you want to render the subset on the canvas.
            16, 16); //width and height of the subset.
    })