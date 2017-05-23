const HtmlScreenshotReporter = require(
  'protractor-jasmine2-screenshot-reporter')
const path = require('path')

const reporter = new HtmlScreenshotReporter({
  dest: path.join(__dirname, 'tmp'),
  filename: 'report.html'
});

exports.config = {
  framework: 'jasmine',
  capabilities:{
    'browserName': 'chrome'
  },
  directConnect: true,
  specs: ['*.test.js'],
  onPrepare: function () {
    const path = require('path')
    const app = require('../../app/app')
    const http = require('http')
    const server = http.createServer(app)

    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    jasmine.getEnv().addReporter(reporter);
  },
  beforeLaunch: function() {
    return new Promise(function(resolve){
      reporter.beforeLaunch(resolve);
    });
  },
  afterLaunch: function(exitCode) {
    return new Promise(function(resolve){
      reporter.afterLaunch(resolve.bind(this, exitCode));
    });
  }
}
