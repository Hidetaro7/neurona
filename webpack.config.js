module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // メインのJS
  entry: {
    main: "./src/js/main.js",
    puzzle: "./src/js/puzzle.js",
  },
  // 出力ファイル
  output: {
    path: "/public/js",
    filename: './public/js/[name].bundle.js',
    publicPath: ""
  }
}

 
// https://github.com/tyoshikawa1106/react-ejs-template/blob/master/webpack.config.js