const Puzzle = require("./modules/PazzleParts");

const imageLoader = (_path) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = _path;
        img.onload = () => {
            resolve(img);
        }
        img.onerror = () => {
            reject("エラーが発生しました")
        }
    })
}

(() => {
    imageLoader("./img/jacket-2nd.jpg").then((_img) => {
        //Puzzle.originalImage = _img;
        Puzzle.init(_img);
    })
})()