const path = require('path');
const constants = require('./constants');
const multipage = require('./multipage.config');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const miniCss = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


const buildType = process.env.BUILD_TYPE ? process.env.BUILD_TYPE : constants.modes.dev;

const result = {}

const htmlPlugins = multipage.pages.map(page => {
  return new HtmlWebpackPlugin({
    inject: true,
    template: page.template,
    filename: page.page,
    chunks: [...page.chunks]
  })
})

result.plugins = [
  new CleanWebpackPlugin(),
 
  new miniCss({
    filename: 'styles/[name].css',
  }),
  ...htmlPlugins
]

result.resolve = {
  alias: {
    images: path.resolve(__dirname, 'src/assets/'),
  },
},
  result.module = {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)?$/,
        type: 'asset/resource',
       
      },
      {
        test: /\.(s*)css$/, use: [
          miniCss.loader,

          'css-loader'
        ]
      },
    ]
  }

result.optimization = {
  splitChunks: {
    chunks: "all",
  }
}

if (buildType === constants.modes.prod) {
  result.optimization = {
    ...result.optimization,
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}



module.exports = result