var webpack = require('webpack');
var path = require('path');

// Webpack Config
var webpackConfig = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor':    './src/vendor.ts',
    'app':       './src/main.ts',
  },

  output: {
    path: './dist',
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'vendor', 'polyfills'], minChunks: Infinity }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unsafe : false
      }
    })
  ],

  module: {
    loaders: [
      // .ts files for TypeScript
      { test: /\.ts$/, loaders: [
          '@angularclass/hmr-loader',
          'awesome-typescript-loader', 
          'angular2-template-loader'
        ] 
      },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.html$/, loader: 'raw-loader',
        exclude: ['src/index.html']
      }
    ]
  }

};

// Our Webpack Defaults
var defaultConfig = {
  devtool: 'cheap-module-eval-source-map',
  cache: true,
  debug: true,
  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', '@ngrx'),
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
        ]
      }
    ],
    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', '@angular', 'bundles')
    ]
  },

  resolve: {
    root: [ path.join(__dirname, 'src') ],
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules']
  },

  node: {
    global: 1,
    crypto: 'empty',
    module: 0,
    Buffer: 0,
    clearImmediate: 0,
    setImmediate: 0
  },
}

var webpackMerge = require('webpack-merge');
module.exports = webpackMerge(defaultConfig, webpackConfig);
