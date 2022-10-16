const path = require('path');
//目前只到webpack v3.0.2拆分css用 視情況看是否使用
const ExtractTextPlugin = require('extract-text-webpack-plugin');  //直接拆css檔案的
const extractCSS = new ExtractTextPlugin('css/[name].css'); //直接拆css檔案的

console.log("=>",path.resolve(__dirname, 'dist'));

module.exports = {
    //mode: process.env.NODE_EVN, 如果有在pakage.json中使用
    context:  path.resolve(__dirname, 'src'),
    entry:{
        index: './js/index.js',
        about: './js/about.js',
    }, //改絕對路徑

    //設定進入點
    output: {
    //設定輸出點
        path: path.resolve(__dirname, 'dist'), //可以改名字
        filename: './js/[name].js' //預設會產生dist資料夾
    //path.resolve輸出相對路徑變絕對路徑
  },
  devServer:{
    //run dev 只起服務且再記憶體被後編譯處裡，不產生實體檔案，最後再做run start 或 run build
    compress:true,
    port:3000,
    stats:{
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  },
  module: {
    rules: [
      { //此是為了搬移html
        test: /\.html$/i,
        use: [{
            loader: 'file-loader',
            options:{
                name: '[path][name].[ext]'
            }
        }]
      },
      {
        test: /\.css$/i,
        // use:['style-loader','css-loader'] 內嵌在js內
        use: extractCSS.extract(['css-loader']) //另存出
      },
      {
        test: /\.(sass|scss)$/i,
        use: extractCSS.extract({
          use:['css-loader','postcss-loader','sass-loader']
        }) //要拆分的寫法
        // use: ['style-loader','css-loader','postcss-loader','sass-loader'] 內嵌在js內
      },
      {
        test: /\.(js)$/i,
        use: 'babel-loader'
      }
    ],
  },
  plugins:[
    extractCSS,
  ]
};