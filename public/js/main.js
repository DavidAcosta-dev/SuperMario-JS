import SpriteSheet from './SpriteSheet/SpriteSheet.js'; //not using webpack, so must include ".js" at the end.
import {loadImage, loadLevel} from './Loaders/Loaders.js';

function drawBackground(background, context, sprites) {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
        //let's draw the sky all over a large area to make the sky
        for(let x = x1; x < x2; x++) {
            for(let y = y1; y < y2; y++) {
                sprites.drawTile(background.tile, context, x, y)
            }
        }
    });
}

const canvasMain = document.getElementById('screen'); //access the canvas with id of screen
const contextMain = canvasMain.getContext('2d'); //access the api that we will use to draw with to the canvas.

loadImage('/assets/images/marioBrosTileSet.png')
    .then(image=> {
        const sprites = new SpriteSheet(image, 16, 16); //SpriteSheet('passimagehere', width, height)  we will kinda mock up an api to make mapping the sprites much more convinient than the way we are doing it below in context.drawImage(...). We are using the SpriteSheet class we made above.
        sprites.define('ground', 0, 0); //sprites.define('namethesprite', coordinateX, coordinateY)   here we are defining subset of sprite using define
        sprites.define('sky', 3, 23);

        //basically fetches/imports the json that we will use to draw the tiles.
        loadLevel('1-1')
            .then(level => {
                console.log(level);
                level.backgrounds.forEach(background => {
                    drawBackground(background, contextMain, sprites);
                });
  
            })
            .catch(err => {
                console.log(err);
            })

                /* Legacy way of drawing. */
        // contextMain.drawImage(image,//drawImage() is polymorphic, it does many different things depending on the number of args and type of args
        //     0, 0, //subset coordinates that target "WHAT" part of the image you want to render. You pass the image in as 1st arg. (in this case, it's image).
        //     16, 16,
        //     32, 32, //coordinates of "WHERE" you want to render the subset on the canvas.
        //     16, 16); //width and height of the subset.

    })