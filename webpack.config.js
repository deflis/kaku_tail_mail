const GasPlugin = require('gas-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: './src/index.ts',
  devtool: false,

  output: {
    //  出力ファイルのディレクトリ名
    path: path.join(__dirname, 'build'),
    // 出力ファイル名
    filename: 'index.js'
  },

  module: {
    rules: [{
        test: /\.(js|ts)$/,
        use: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.txt$/,
        use: {
          loader: 'raw-loader',
        }
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.html',
      '.txt'
    ]
  },

  plugins: [
    new GasPlugin(),
  ],
};