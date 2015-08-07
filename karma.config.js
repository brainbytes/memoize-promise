var path = require('path');

module.exports = function(config) {
  return config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: ['test/spec/**/*.js'],
    plugins: [
      require('karma-webpack'),
      require('karma-phantomjs-launcher'),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-ie-launcher'),
      require('karma-safari-launcher')
    ],
    exclude: ['node_modules/'],
    preprocessors: {
      './test/**/*.js': ['webpack']
    },
    webpack: {
      resolve: {
        extensions: ['', '.js', '.json'],
        root: __dirname,
        modulesDirectories: ['', 'src', 'node_modules']
      },
      module: {
        loaders: [
          {
            test: /\.json$/,
            loaders: ['json-loader']
          }
        ]
      }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.DEBUG,
    autoWatch: true,
    browsers: win ? ['PhantomJS', 'Chrome', 'IE', 'Firefox'] : ['PhantomJS', 'Chrome', 'Safari', 'Firefox'],
    singleRun: true
  });
};

var win = /^win/.test(process.platform);
