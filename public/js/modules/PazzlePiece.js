

module.exports = class PazzlePiece {
    constructor () {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
    }
    drawImage (_canvas, _x, _y, _w, _h) {
        this.canvas.width = _w;
        this.canvas.height = _h;
        this.ctx.drawImage(_canvas, _x, _y, _w, _h);
    }
    canvas () {
        return this.canvas;
    }
}