class SpriteSheet {
    constructor(image, width, height) {
        // const {image, width, height} = this;
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map(); //save the buffer that we draw in a map
    }

    //this define method is actually native JS
    define(name, x, y) { //creating a buffer where we keep the tile/subset derived from the big image so we don't have to draw from the big image every time.
        const buffer = document.createElement('canvas'); //programatically making a canvas element just like jsx behind the scenes.
        buffer.width = this.width;
        buffer.height = this.height;
        
        //now drawing the subset to the canvas, just like we did below in context.drawImage(..)
        buffer.
            getContext('2d')
            .drawImage(
                this.image,
                x * this.width,
                y* this.height,
                this.width,
                this.height,
                0,
                0,this.width,
                this.height
            );

        this.tiles.set(name, buffer);//add the buffer to the new map instantiated in the constructor above by using the "tiles" name.

    }// end of define()

    draw(name, context, x, y) { //lastly we want to draw it
        const buffer = this.tiles.get(name);
        context.drawImage(buffer, x, y);
    }

    //custom convinience method version of "draw" so that we don't have to write "* 16" everytime we draw/render tile to screen.
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height); //must state the size(in this case it's 16) since the draw method doesn't take tile sizes as an argument like drawImage() does.
    }

}// *******end of SpriteSheet class

export default SpriteSheet;