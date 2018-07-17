const PazzlePiece = require("./PazzlePiece");

let originalCanvas;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const w = canvas.width, h = canvas.height;

class Puzzle {
    constructor() {

    }
    static originalImage (_img) {
        const _canvas = document.createElement("canvas");
        const _ctx = _canvas.getContext("2d");
        _canvas.width = _img.clientWidth;
        _canvas.height = _img.clientHeight;
        originalCanvas = _canvas;
    }
    static init (_img) {
        this.originalImage(_img);
        /* ctx.drawImage(img, 0, 0, w, h);
        let imagedata = ctx.getImageData(0, 0, w, h); */
    }
}

module.exports = Puzzle;